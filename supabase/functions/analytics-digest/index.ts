import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DigestMetrics {
  period: { start: string; end: string };
  visitors: {
    total: number;
    uniqueCountries: number;
    topCountries: Array<{ country: string; count: number }>;
    topPages: Array<{ page: string; count: number }>;
    deviceBreakdown: { desktop: number; mobile: number; tablet: number };
    avgTimeOnPage: number;
  };
  webVitals: {
    lcp: { avg: number; rating: string };
    fid: { avg: number; rating: string };
    cls: { avg: number; rating: string };
    fcp: { avg: number; rating: string };
    ttfb: { avg: number; rating: string };
    overallScore: number;
  };
  submissions: {
    contact: number;
    quote: number;
    onboarding: number;
  };
  trends: {
    visitorsChange: number;
    submissionsChange: number;
  };
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Analytics digest function called");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse request body for manual trigger or scheduled run
    let forceRun = false;
    let testEmail: string | null = null;
    
    if (req.method === "POST") {
      try {
        const body = await req.json();
        forceRun = body.forceRun || false;
        testEmail = body.testEmail || null;
      } catch {
        // No body or invalid JSON, continue with defaults
      }
    }

    // Get digest configuration
    const { data: config, error: configError } = await supabase
      .from("analytics_digest_config")
      .select("*")
      .single();

    if (configError) {
      console.error("Error fetching config:", configError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch digest configuration" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Determine recipients
    const recipients = testEmail ? [testEmail] : config.recipient_emails;

    if (!forceRun && !config.is_enabled) {
      return new Response(
        JSON.stringify({ message: "Digest is disabled", sent: false }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (recipients.length === 0) {
      return new Response(
        JSON.stringify({ message: "No recipients configured", sent: false }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Calculate period (last 7 days)
    const periodEnd = new Date();
    const periodStart = new Date();
    periodStart.setDate(periodStart.getDate() - 7);

    // Previous period for trend comparison
    const prevPeriodEnd = new Date(periodStart);
    const prevPeriodStart = new Date(periodStart);
    prevPeriodStart.setDate(prevPeriodStart.getDate() - 7);

    // Fetch visitor data
    const { data: visitors, error: visitorsError } = await supabase
      .from("visitor_metadata")
      .select("*")
      .gte("visit_timestamp", periodStart.toISOString())
      .lte("visit_timestamp", periodEnd.toISOString());

    if (visitorsError) {
      console.error("Error fetching visitors:", visitorsError);
    }

    // Fetch previous period visitors for trend
    const { data: prevVisitors } = await supabase
      .from("visitor_metadata")
      .select("id", { count: "exact" })
      .gte("visit_timestamp", prevPeriodStart.toISOString())
      .lt("visit_timestamp", periodStart.toISOString());

    // Fetch Web Vitals
    const { data: webVitals, error: vitalsError } = await supabase
      .from("edge_function_metrics")
      .select("*")
      .eq("function_name", "web-vitals")
      .gte("request_timestamp", periodStart.toISOString())
      .lte("request_timestamp", periodEnd.toISOString());

    if (vitalsError) {
      console.error("Error fetching web vitals:", vitalsError);
    }

    // Fetch form submissions
    const { count: contactCount } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .gte("created_at", periodStart.toISOString())
      .lte("created_at", periodEnd.toISOString());

    const { count: quoteCount } = await supabase
      .from("quote_requests")
      .select("*", { count: "exact", head: true })
      .gte("created_at", periodStart.toISOString())
      .lte("created_at", periodEnd.toISOString());

    const { count: onboardingCount } = await supabase
      .from("onboarding_submissions")
      .select("*", { count: "exact", head: true })
      .gte("created_at", periodStart.toISOString())
      .lte("created_at", periodEnd.toISOString());

    // Previous period submissions for trend
    const { count: prevContactCount } = await supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .gte("created_at", prevPeriodStart.toISOString())
      .lt("created_at", periodStart.toISOString());

    const { count: prevQuoteCount } = await supabase
      .from("quote_requests")
      .select("*", { count: "exact", head: true })
      .gte("created_at", prevPeriodStart.toISOString())
      .lt("created_at", periodStart.toISOString());

    const { count: prevOnboardingCount } = await supabase
      .from("onboarding_submissions")
      .select("*", { count: "exact", head: true })
      .gte("created_at", prevPeriodStart.toISOString())
      .lt("created_at", periodStart.toISOString());

    // Process metrics
    const metrics = processMetrics(
      visitors || [],
      prevVisitors?.length || 0,
      webVitals || [],
      {
        contact: contactCount || 0,
        quote: quoteCount || 0,
        onboarding: onboardingCount || 0,
      },
      {
        contact: prevContactCount || 0,
        quote: prevQuoteCount || 0,
        onboarding: prevOnboardingCount || 0,
      },
      periodStart,
      periodEnd
    );

    // Generate and send email
    const emailHtml = generateDigestEmail(metrics);
    const subject = `ƷBI Weekly Analytics Digest - ${formatDate(periodStart)} to ${formatDate(periodEnd)}`;

    const emailResponse = await resend.emails.send({
      from: "ƷBI Analytics <analytics@notifications.3bi.io>",
      to: recipients,
      subject,
      html: emailHtml,
    });

    console.log("Digest email sent:", emailResponse);

    // Record in history
    await supabase.from("analytics_digest_history").insert({
      recipient_emails: recipients,
      period_start: periodStart.toISOString(),
      period_end: periodEnd.toISOString(),
      metrics: metrics as unknown as Record<string, unknown>,
      status: "sent",
    });

    // Update last_sent_at if not a test
    if (!testEmail) {
      await supabase
        .from("analytics_digest_config")
        .update({ last_sent_at: new Date().toISOString() })
        .eq("id", config.id);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Digest sent successfully",
        recipients: recipients.length,
        metrics: metrics
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error: unknown) {
    console.error("Error in analytics digest:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

function processMetrics(
  visitors: Array<Record<string, unknown>>,
  prevVisitorCount: number,
  webVitals: Array<Record<string, unknown>>,
  submissions: { contact: number; quote: number; onboarding: number },
  prevSubmissions: { contact: number; quote: number; onboarding: number },
  periodStart: Date,
  periodEnd: Date
): DigestMetrics {
  // Count visitors and unique countries
  const countries = new Map<string, number>();
  const pages = new Map<string, number>();
  const devices = { desktop: 0, mobile: 0, tablet: 0 };
  let totalTimeOnPage = 0;
  let timeOnPageCount = 0;

  visitors.forEach((v) => {
    const country = (v.country as string) || "Unknown";
    countries.set(country, (countries.get(country) || 0) + 1);

    const page = (v.page_url as string) || "/";
    const pagePath = page.replace(/https?:\/\/[^\/]+/, "").split("?")[0] || "/";
    pages.set(pagePath, (pages.get(pagePath) || 0) + 1);

    const deviceType = ((v.device_type as string) || "desktop").toLowerCase();
    if (deviceType.includes("mobile")) devices.mobile++;
    else if (deviceType.includes("tablet")) devices.tablet++;
    else devices.desktop++;

    if (v.time_on_page && typeof v.time_on_page === "number") {
      totalTimeOnPage += v.time_on_page;
      timeOnPageCount++;
    }
  });

  // Process Web Vitals
  const vitalsAverages = { lcp: [] as number[], fid: [] as number[], cls: [] as number[], fcp: [] as number[], ttfb: [] as number[] };
  
  webVitals.forEach((v) => {
    const metadata = v.metadata as Record<string, unknown> | null;
    if (metadata?.type === "web-vitals") {
      if (typeof metadata.lcp === "number") vitalsAverages.lcp.push(metadata.lcp);
      if (typeof metadata.fid === "number") vitalsAverages.fid.push(metadata.fid);
      if (typeof metadata.cls === "number") vitalsAverages.cls.push(metadata.cls);
      if (typeof metadata.fcp === "number") vitalsAverages.fcp.push(metadata.fcp);
      if (typeof metadata.ttfb === "number") vitalsAverages.ttfb.push(metadata.ttfb);
    }
  });

  const avg = (arr: number[]) => arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
  
  const lcpAvg = avg(vitalsAverages.lcp);
  const fidAvg = avg(vitalsAverages.fid);
  const clsAvg = avg(vitalsAverages.cls);
  const fcpAvg = avg(vitalsAverages.fcp);
  const ttfbAvg = avg(vitalsAverages.ttfb);

  // Calculate overall score (0-100)
  const lcpScore = lcpAvg <= 2500 ? 100 : lcpAvg <= 4000 ? 50 : 0;
  const fidScore = fidAvg <= 100 ? 100 : fidAvg <= 300 ? 50 : 0;
  const clsScore = clsAvg <= 0.1 ? 100 : clsAvg <= 0.25 ? 50 : 0;
  const overallScore = Math.round((lcpScore * 0.25 + fidScore * 0.25 + clsScore * 0.25 + 25) * (webVitals.length > 0 ? 1 : 0));

  // Calculate trends
  const currentTotal = submissions.contact + submissions.quote + submissions.onboarding;
  const prevTotal = prevSubmissions.contact + prevSubmissions.quote + prevSubmissions.onboarding;
  
  const visitorsChange = prevVisitorCount > 0 
    ? Math.round(((visitors.length - prevVisitorCount) / prevVisitorCount) * 100) 
    : 0;
  
  const submissionsChange = prevTotal > 0 
    ? Math.round(((currentTotal - prevTotal) / prevTotal) * 100) 
    : 0;

  return {
    period: { start: periodStart.toISOString(), end: periodEnd.toISOString() },
    visitors: {
      total: visitors.length,
      uniqueCountries: countries.size,
      topCountries: Array.from(countries.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([country, count]) => ({ country, count })),
      topPages: Array.from(pages.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([page, count]) => ({ page, count })),
      deviceBreakdown: devices,
      avgTimeOnPage: timeOnPageCount > 0 ? Math.round(totalTimeOnPage / timeOnPageCount) : 0,
    },
    webVitals: {
      lcp: { avg: Math.round(lcpAvg), rating: lcpAvg <= 2500 ? "good" : lcpAvg <= 4000 ? "needs-improvement" : "poor" },
      fid: { avg: Math.round(fidAvg), rating: fidAvg <= 100 ? "good" : fidAvg <= 300 ? "needs-improvement" : "poor" },
      cls: { avg: parseFloat(clsAvg.toFixed(3)), rating: clsAvg <= 0.1 ? "good" : clsAvg <= 0.25 ? "needs-improvement" : "poor" },
      fcp: { avg: Math.round(fcpAvg), rating: fcpAvg <= 1800 ? "good" : fcpAvg <= 3000 ? "needs-improvement" : "poor" },
      ttfb: { avg: Math.round(ttfbAvg), rating: ttfbAvg <= 800 ? "good" : ttfbAvg <= 1800 ? "needs-improvement" : "poor" },
      overallScore,
    },
    submissions: submissions,
    trends: { visitorsChange, submissionsChange },
  };
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getRatingColor(rating: string): string {
  switch (rating) {
    case "good": return "#10B981";
    case "needs-improvement": return "#F59E0B";
    case "poor": return "#EF4444";
    default: return "#6B7280";
  }
}

function getTrendIcon(change: number): string {
  if (change > 0) return "📈";
  if (change < 0) return "📉";
  return "➡️";
}

function generateDigestEmail(metrics: DigestMetrics): string {
  const { visitors, webVitals, submissions, trends, period } = metrics;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ƷBI Weekly Analytics Digest</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0A1628; color: #E2E8F0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="color: #E85D2A; font-size: 28px; margin: 0 0 8px 0;">ƷBI Analytics Digest</h1>
      <p style="color: #94A3B8; font-size: 14px; margin: 0;">
        ${formatDate(new Date(period.start))} - ${formatDate(new Date(period.end))}
      </p>
    </div>

    <!-- Key Metrics -->
    <div style="background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #334155;">
      <h2 style="color: #F8FAFC; font-size: 18px; margin: 0 0 20px 0;">📊 Weekly Overview</h2>
      
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
        <div style="background: #0F172A; border-radius: 8px; padding: 16px; text-align: center;">
          <div style="font-size: 32px; font-weight: bold; color: #E85D2A;">${visitors.total.toLocaleString()}</div>
          <div style="color: #94A3B8; font-size: 12px;">Total Visitors</div>
          <div style="font-size: 11px; color: ${trends.visitorsChange >= 0 ? '#10B981' : '#EF4444'};">
            ${getTrendIcon(trends.visitorsChange)} ${trends.visitorsChange >= 0 ? '+' : ''}${trends.visitorsChange}% vs last week
          </div>
        </div>
        
        <div style="background: #0F172A; border-radius: 8px; padding: 16px; text-align: center;">
          <div style="font-size: 32px; font-weight: bold; color: #3B82F6;">${visitors.uniqueCountries}</div>
          <div style="color: #94A3B8; font-size: 12px;">Countries</div>
        </div>
        
        <div style="background: #0F172A; border-radius: 8px; padding: 16px; text-align: center;">
          <div style="font-size: 32px; font-weight: bold; color: #8B5CF6;">${submissions.contact + submissions.quote + submissions.onboarding}</div>
          <div style="color: #94A3B8; font-size: 12px;">Form Submissions</div>
          <div style="font-size: 11px; color: ${trends.submissionsChange >= 0 ? '#10B981' : '#EF4444'};">
            ${getTrendIcon(trends.submissionsChange)} ${trends.submissionsChange >= 0 ? '+' : ''}${trends.submissionsChange}% vs last week
          </div>
        </div>
        
        <div style="background: #0F172A; border-radius: 8px; padding: 16px; text-align: center;">
          <div style="font-size: 32px; font-weight: bold; color: #10B981;">${webVitals.overallScore}</div>
          <div style="color: #94A3B8; font-size: 12px;">Performance Score</div>
        </div>
      </div>
    </div>

    <!-- Top Pages -->
    <div style="background: #1E293B; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #334155;">
      <h2 style="color: #F8FAFC; font-size: 18px; margin: 0 0 16px 0;">📄 Top Pages</h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${visitors.topPages.map((p, i) => `
        <tr style="border-bottom: 1px solid #334155;">
          <td style="padding: 8px 0; color: #94A3B8;">${i + 1}.</td>
          <td style="padding: 8px 0; color: #E2E8F0;">${p.page || '/'}</td>
          <td style="padding: 8px 0; color: #E85D2A; text-align: right; font-weight: 600;">${p.count}</td>
        </tr>
        `).join('')}
      </table>
    </div>

    <!-- Device Breakdown -->
    <div style="background: #1E293B; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #334155;">
      <h2 style="color: #F8FAFC; font-size: 18px; margin: 0 0 16px 0;">📱 Devices</h2>
      <div style="display: flex; gap: 12px;">
        <div style="flex: 1; background: #0F172A; border-radius: 8px; padding: 12px; text-align: center;">
          <div style="font-size: 20px; font-weight: bold; color: #3B82F6;">${visitors.deviceBreakdown.desktop}</div>
          <div style="color: #94A3B8; font-size: 11px;">Desktop</div>
        </div>
        <div style="flex: 1; background: #0F172A; border-radius: 8px; padding: 12px; text-align: center;">
          <div style="font-size: 20px; font-weight: bold; color: #10B981;">${visitors.deviceBreakdown.mobile}</div>
          <div style="color: #94A3B8; font-size: 11px;">Mobile</div>
        </div>
        <div style="flex: 1; background: #0F172A; border-radius: 8px; padding: 12px; text-align: center;">
          <div style="font-size: 20px; font-weight: bold; color: #8B5CF6;">${visitors.deviceBreakdown.tablet}</div>
          <div style="color: #94A3B8; font-size: 11px;">Tablet</div>
        </div>
      </div>
    </div>

    <!-- Web Vitals -->
    <div style="background: #1E293B; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #334155;">
      <h2 style="color: #F8FAFC; font-size: 18px; margin: 0 0 16px 0;">⚡ Core Web Vitals</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #334155;">
          <td style="padding: 10px 0; color: #E2E8F0;">LCP (Largest Contentful Paint)</td>
          <td style="padding: 10px 0; text-align: right;">
            <span style="color: ${getRatingColor(webVitals.lcp.rating)}; font-weight: 600;">${webVitals.lcp.avg}ms</span>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #334155;">
          <td style="padding: 10px 0; color: #E2E8F0;">FID (First Input Delay)</td>
          <td style="padding: 10px 0; text-align: right;">
            <span style="color: ${getRatingColor(webVitals.fid.rating)}; font-weight: 600;">${webVitals.fid.avg}ms</span>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #334155;">
          <td style="padding: 10px 0; color: #E2E8F0;">CLS (Cumulative Layout Shift)</td>
          <td style="padding: 10px 0; text-align: right;">
            <span style="color: ${getRatingColor(webVitals.cls.rating)}; font-weight: 600;">${webVitals.cls.avg}</span>
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #334155;">
          <td style="padding: 10px 0; color: #E2E8F0;">FCP (First Contentful Paint)</td>
          <td style="padding: 10px 0; text-align: right;">
            <span style="color: ${getRatingColor(webVitals.fcp.rating)}; font-weight: 600;">${webVitals.fcp.avg}ms</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #E2E8F0;">TTFB (Time to First Byte)</td>
          <td style="padding: 10px 0; text-align: right;">
            <span style="color: ${getRatingColor(webVitals.ttfb.rating)}; font-weight: 600;">${webVitals.ttfb.avg}ms</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Form Submissions -->
    <div style="background: #1E293B; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #334155;">
      <h2 style="color: #F8FAFC; font-size: 18px; margin: 0 0 16px 0;">📝 Form Submissions</h2>
      <div style="display: flex; gap: 12px;">
        <div style="flex: 1; background: #0F172A; border-radius: 8px; padding: 12px; text-align: center;">
          <div style="font-size: 20px; font-weight: bold; color: #E85D2A;">${submissions.contact}</div>
          <div style="color: #94A3B8; font-size: 11px;">Contact</div>
        </div>
        <div style="flex: 1; background: #0F172A; border-radius: 8px; padding: 12px; text-align: center;">
          <div style="font-size: 20px; font-weight: bold; color: #3B82F6;">${submissions.quote}</div>
          <div style="color: #94A3B8; font-size: 11px;">Quote</div>
        </div>
        <div style="flex: 1; background: #0F172A; border-radius: 8px; padding: 12px; text-align: center;">
          <div style="font-size: 20px; font-weight: bold; color: #10B981;">${submissions.onboarding}</div>
          <div style="color: #94A3B8; font-size: 11px;">Onboarding</div>
        </div>
      </div>
    </div>

    <!-- Top Countries -->
    ${visitors.topCountries.length > 0 ? `
    <div style="background: #1E293B; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #334155;">
      <h2 style="color: #F8FAFC; font-size: 18px; margin: 0 0 16px 0;">🌍 Top Countries</h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${visitors.topCountries.map((c, i) => `
        <tr style="border-bottom: 1px solid #334155;">
          <td style="padding: 8px 0; color: #94A3B8;">${i + 1}.</td>
          <td style="padding: 8px 0; color: #E2E8F0;">${c.country}</td>
          <td style="padding: 8px 0; color: #E85D2A; text-align: right; font-weight: 600;">${c.count}</td>
        </tr>
        `).join('')}
      </table>
    </div>
    ` : ''}

    <!-- Footer -->
    <div style="text-align: center; padding-top: 20px; border-top: 1px solid #334155;">
      <p style="color: #64748B; font-size: 12px; margin: 0 0 8px 0;">
        This digest was automatically generated by ƷBI Analytics.
      </p>
      <p style="color: #64748B; font-size: 12px; margin: 0;">
        <a href="https://3bi.io/admin?tab=analytics" style="color: #E85D2A; text-decoration: none;">View Full Dashboard →</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

serve(handler);

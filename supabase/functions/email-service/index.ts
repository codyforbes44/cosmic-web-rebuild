import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Brand configuration - centralized styling
const BRAND = {
  name: "ƷBI",
  email: "support@3bi.io",
  domain: "3bi.io",
  adminDashboard: "https://3bi.io/admin?tab=overview",
  colors: {
    primary: "#E85D2A",
    background: "#0A1628",
    cardBg: "#1E293B",
    darkBg: "#0F172A",
    text: "#E2E8F0",
    muted: "#94A3B8",
    mutedDark: "#64748B",
    success: "#10B981",
  },
};

// Email template types
type TemplateType = 
  | 'contact-confirmation'
  | 'contact-admin'
  | 'quote-confirmation'
  | 'quote-admin'
  | 'onboarding-confirmation'
  | 'onboarding-admin'
  | 'newsletter'
  | 'notification'
  | 'welcome';

interface EmailRequest {
  to: string | string[];
  from?: string;
  subject: string;
  html?: string;
  text?: string;
  template?: TemplateType;
  variables?: Record<string, any>;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Email service function called");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    const emailRequest: EmailRequest = await req.json();
    console.log("Email request received:", { 
      to: emailRequest.to, 
      subject: emailRequest.subject, 
      template: emailRequest.template 
    });

    if (!emailRequest.to || !emailRequest.subject) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: to, subject" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const from = emailRequest.from || `${BRAND.name} <noreply@notifications.3bi.io>`;

    let html = emailRequest.html;
    let text = emailRequest.text;

    if (emailRequest.template && !html && !text) {
      const templateContent = generateTemplate(emailRequest.template, emailRequest.variables || {});
      html = templateContent.html;
      text = templateContent.text;
    }

    if (!html && !text) {
      return new Response(
        JSON.stringify({ error: "Either html, text, or template must be provided" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const emailResponse = await resend.emails.send({
      from,
      to: Array.isArray(emailRequest.to) ? emailRequest.to : [emailRequest.to],
      subject: emailRequest.subject,
      html,
      text,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in email service:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.name === 'ValidationError' ? 'Invalid email format or missing required fields' : 'Internal server error'
      }),
      {
        status: error.name === 'ValidationError' ? 400 : 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

// ============================================
// UNIFIED EMAIL TEMPLATE SYSTEM
// ============================================

// Base wrapper for all emails
function wrapInLayout(content: string, showFooter = true): string {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: ${BRAND.colors.background}; border-radius: 12px; overflow: hidden;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, ${BRAND.colors.primary} 0%, #C74A1D 100%); padding: 30px 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;">${BRAND.name}</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0; font-size: 14px;">Recruitment Marketing Excellence</p>
      </div>
      
      <!-- Content -->
      <div style="padding: 30px 25px; color: ${BRAND.colors.text};">
        ${content}
      </div>
      
      ${showFooter ? `
      <!-- Footer -->
      <div style="background: ${BRAND.colors.darkBg}; padding: 25px; text-align: center; border-top: 1px solid ${BRAND.colors.cardBg};">
        <p style="color: ${BRAND.colors.mutedDark}; margin: 0 0 10px 0; font-size: 12px;">
          © ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.
        </p>
        <p style="color: ${BRAND.colors.mutedDark}; margin: 0; font-size: 12px;">
          <a href="https://${BRAND.domain}" style="color: ${BRAND.colors.primary}; text-decoration: none;">${BRAND.domain}</a> · 
          <a href="mailto:${BRAND.email}" style="color: ${BRAND.colors.primary}; text-decoration: none;">${BRAND.email}</a>
        </p>
      </div>
      ` : ''}
    </div>
  `;
}

// Card component for sections
function card(title: string, content: string): string {
  return `
    <div style="background: ${BRAND.colors.cardBg}; padding: 20px; border-radius: 8px; margin: 20px 0;">
      ${title ? `<h3 style="color: ${BRAND.colors.primary}; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">${title}</h3>` : ''}
      ${content}
    </div>
  `;
}

// Info row component
function infoRow(label: string, value: string, isLink = false, linkType = 'mailto'): string {
  const valueHtml = isLink 
    ? `<a href="${linkType}:${value}" style="color: ${BRAND.colors.primary}; text-decoration: none;">${value}</a>`
    : value;
  return `<p style="margin: 8px 0;"><strong style="color: ${BRAND.colors.muted};">${label}:</strong> ${valueHtml}</p>`;
}

// Badge component
function badge(text: string, color = BRAND.colors.primary): string {
  return `<span style="background: ${color}; color: white; padding: 3px 10px; border-radius: 4px; font-size: 13px;">${text}</span>`;
}

// CTA Button component
function ctaButton(text: string, url: string): string {
  return `
    <a href="${url}" style="display: inline-block; background: linear-gradient(135deg, ${BRAND.colors.primary} 0%, #C74A1D 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; box-shadow: 0 4px 14px rgba(232, 93, 42, 0.3);">
      ${text}
    </a>
  `;
}

// Generate template based on type
function generateTemplate(template: TemplateType, vars: Record<string, any>): { html: string; text: string } {
  const timestamp = new Date().toLocaleString();
  
  const templates: Record<TemplateType, { html: string; text: string }> = {
    // ============================================
    // CONTACT FORM TEMPLATES
    // ============================================
    'contact-confirmation': {
      html: wrapInLayout(`
        <h2 style="color: ${BRAND.colors.text}; margin: 0 0 15px 0;">Thank You for Reaching Out!</h2>
        <p style="color: ${BRAND.colors.muted}; line-height: 1.6;">Dear ${vars.name || 'Valued Contact'},</p>
        <p style="color: ${BRAND.colors.muted}; line-height: 1.6;">We've received your message and our team will get back to you within 24 hours.</p>
        
        ${vars.message ? card('Your Message', `
          <div style="background: ${BRAND.colors.darkBg}; padding: 15px; border-radius: 6px; white-space: pre-wrap; color: ${BRAND.colors.text}; font-size: 14px;">${vars.message}</div>
        `) : ''}
        
        <p style="color: ${BRAND.colors.muted}; line-height: 1.6;">In the meantime, feel free to explore our services or reach out directly at <a href="mailto:${BRAND.email}" style="color: ${BRAND.colors.primary};">${BRAND.email}</a></p>
        
        <p style="color: ${BRAND.colors.muted}; margin-top: 25px;">Best regards,<br><strong style="color: ${BRAND.colors.text};">The ${BRAND.name} Team</strong></p>
      `),
      text: `Thank You for Reaching Out!

Dear ${vars.name || 'Valued Contact'},

We've received your message and our team will get back to you within 24 hours.

${vars.message ? `Your Message:\n${vars.message}\n` : ''}

Best regards,
The ${BRAND.name} Team`
    },

    'contact-admin': {
      html: wrapInLayout(`
        <h2 style="color: ${BRAND.colors.text}; margin: 0 0 20px 0;">📬 New Contact Form Submission</h2>
        
        ${card('Contact Details', `
          ${infoRow('Name', vars.name || 'Not provided')}
          ${infoRow('Email', vars.email || 'Not provided', true)}
          ${infoRow('Subject', vars.subject || 'No subject')}
        `)}
        
        ${card('Message', `
          <div style="background: ${BRAND.colors.darkBg}; padding: 15px; border-radius: 6px; white-space: pre-wrap; color: ${BRAND.colors.text}; font-size: 14px;">${vars.message || 'No message provided'}</div>
        `)}
        
        <p style="font-size: 12px; color: ${BRAND.colors.mutedDark};">Received: ${timestamp}</p>
        ${ctaButton('View in Admin Dashboard', BRAND.adminDashboard)}
      `),
      text: `New Contact Form Submission

Name: ${vars.name}
Email: ${vars.email}
Subject: ${vars.subject}
Message: ${vars.message}

Received: ${timestamp}
View in Admin: ${BRAND.adminDashboard}`
    },

    // ============================================
    // QUOTE REQUEST TEMPLATES
    // ============================================
    'quote-confirmation': {
      html: wrapInLayout(`
        <h2 style="color: ${BRAND.colors.text}; margin: 0 0 15px 0;">Quote Request Received!</h2>
        <p style="color: ${BRAND.colors.muted}; line-height: 1.6;">Dear ${vars.full_name || vars.name || 'Valued Client'},</p>
        <p style="color: ${BRAND.colors.muted}; line-height: 1.6;">Thank you for your interest in our services. We've received your quote request and will provide a detailed proposal within 1-2 business days.</p>
        
        ${card('Request Summary', `
          ${infoRow('Service', vars.service_type || 'Not specified')}
          ${infoRow('Company', vars.company_name || 'Not specified')}
          ${vars.budget ? infoRow('Budget', vars.budget) : ''}
          ${vars.timeline ? infoRow('Timeline', vars.timeline) : ''}
        `)}
        
        <p style="color: ${BRAND.colors.muted}; line-height: 1.6;">Questions? Contact us at <a href="mailto:${BRAND.email}" style="color: ${BRAND.colors.primary};">${BRAND.email}</a></p>
        
        <p style="color: ${BRAND.colors.muted}; margin-top: 25px;">Best regards,<br><strong style="color: ${BRAND.colors.text};">The ${BRAND.name} Team</strong></p>
      `),
      text: `Quote Request Received!

Dear ${vars.full_name || vars.name || 'Valued Client'},

Thank you for your interest. We've received your quote request and will provide a detailed proposal within 1-2 business days.

Request Summary:
- Service: ${vars.service_type}
- Company: ${vars.company_name}
${vars.budget ? `- Budget: ${vars.budget}` : ''}
${vars.timeline ? `- Timeline: ${vars.timeline}` : ''}

Best regards,
The ${BRAND.name} Team`
    },

    'quote-admin': {
      html: wrapInLayout(`
        <h2 style="color: ${BRAND.colors.text}; margin: 0 0 20px 0;">🎯 New Quote Request</h2>
        
        ${card('Contact Information', `
          ${infoRow('Name', vars.full_name || vars.name || 'Not provided')}
          ${infoRow('Company', vars.company_name || 'Not provided')}
          ${infoRow('Email', vars.email || 'Not provided', true)}
          ${vars.phone ? infoRow('Phone', vars.phone, true, 'tel') : ''}
        `)}
        
        ${card('Project Details', `
          <p style="margin: 8px 0;"><strong style="color: ${BRAND.colors.muted};">Service Type:</strong> ${badge(vars.service_type || 'Not specified')}</p>
          ${vars.budget ? `<p style="margin: 8px 0;"><strong style="color: ${BRAND.colors.muted};">Budget:</strong> ${badge(vars.budget, BRAND.colors.success)}</p>` : ''}
          ${vars.timeline ? infoRow('Timeline', vars.timeline) : ''}
          ${vars.project_description ? `
            <div style="margin-top: 15px;">
              <strong style="color: ${BRAND.colors.muted};">Project Description:</strong>
              <div style="background: ${BRAND.colors.darkBg}; padding: 15px; border-radius: 6px; margin-top: 8px; white-space: pre-wrap; color: ${BRAND.colors.text}; font-size: 14px;">${vars.project_description}</div>
            </div>
          ` : ''}
        `)}
        
        <p style="font-size: 12px; color: ${BRAND.colors.mutedDark};">Received: ${timestamp}</p>
        ${ctaButton('View in Admin Dashboard', BRAND.adminDashboard)}
      `),
      text: `New Quote Request

Contact:
- Name: ${vars.full_name || vars.name}
- Company: ${vars.company_name}
- Email: ${vars.email}
${vars.phone ? `- Phone: ${vars.phone}` : ''}

Project:
- Service: ${vars.service_type}
${vars.budget ? `- Budget: ${vars.budget}` : ''}
${vars.timeline ? `- Timeline: ${vars.timeline}` : ''}
${vars.project_description ? `- Description: ${vars.project_description}` : ''}

Received: ${timestamp}
View in Admin: ${BRAND.adminDashboard}`
    },

    // ============================================
    // ONBOARDING TEMPLATES
    // ============================================
    'onboarding-confirmation': {
      html: wrapInLayout(`
        <h2 style="color: ${BRAND.colors.text}; margin: 0 0 15px 0;">Welcome to ${BRAND.name}! 🎉</h2>
        <p style="color: ${BRAND.colors.muted}; line-height: 1.6;">Dear ${vars.first_name || vars.name || 'Valued Partner'},</p>
        <p style="color: ${BRAND.colors.muted}; line-height: 1.6;">Thank you for completing your onboarding! We're thrilled to have <strong style="color: ${BRAND.colors.text};">${vars.company_name || 'your company'}</strong> join us.</p>
        
        ${card("What's Next?", `
          <ul style="color: ${BRAND.colors.muted}; padding-left: 20px; margin: 0; line-height: 1.8;">
            <li>Our team will review your information within 24 hours</li>
            <li>We'll reach out via ${vars.preferred_contact || 'your preferred contact method'}</li>
            <li>We'll discuss your goals and create a tailored strategy</li>
          </ul>
        `)}
        
        ${card('Your Submission Summary', `
          ${infoRow('Company', vars.company_name || 'Not specified')}
          ${infoRow('Industry', vars.industry || 'Not specified')}
          ${infoRow('Timeline', vars.timeline || 'Not specified')}
          ${vars.primary_goals && vars.primary_goals.length > 0 ? `
            <p style="margin: 8px 0;"><strong style="color: ${BRAND.colors.muted};">Goals:</strong> ${vars.primary_goals.join(', ')}</p>
          ` : ''}
        `)}
        
        <p style="color: ${BRAND.colors.muted}; line-height: 1.6;">Questions? Reach us at <a href="mailto:${BRAND.email}" style="color: ${BRAND.colors.primary};">${BRAND.email}</a></p>
        
        <p style="color: ${BRAND.colors.muted}; margin-top: 25px;">Best regards,<br><strong style="color: ${BRAND.colors.text};">The ${BRAND.name} Team</strong></p>
      `),
      text: `Welcome to ${BRAND.name}!

Dear ${vars.first_name || vars.name || 'Valued Partner'},

Thank you for completing your onboarding! We're thrilled to have ${vars.company_name || 'your company'} join us.

What's Next?
- Our team will review your information within 24 hours
- We'll reach out via ${vars.preferred_contact || 'your preferred contact method'}
- We'll discuss your goals and create a tailored strategy

Your Submission:
- Company: ${vars.company_name}
- Industry: ${vars.industry}
- Timeline: ${vars.timeline}
${vars.primary_goals ? `- Goals: ${vars.primary_goals.join(', ')}` : ''}

Best regards,
The ${BRAND.name} Team`
    },

    'onboarding-admin': {
      html: wrapInLayout(`
        <h2 style="color: ${BRAND.colors.text}; margin: 0 0 20px 0;">🎉 New Client Onboarding</h2>
        
        ${card('Contact Information', `
          ${infoRow('Name', `${vars.first_name || ''} ${vars.last_name || ''}`.trim() || vars.name || 'Not provided')}
          ${infoRow('Email', vars.email || 'Not provided', true)}
          ${vars.phone ? infoRow('Phone', vars.phone, true, 'tel') : ''}
          ${infoRow('Preferred Contact', vars.preferred_contact || 'Not specified')}
          ${vars.communication_frequency ? infoRow('Contact Frequency', vars.communication_frequency) : ''}
        `)}
        
        ${card('Company Details', `
          ${infoRow('Company', vars.company_name || 'Not provided')}
          <p style="margin: 8px 0;"><strong style="color: ${BRAND.colors.muted};">Industry:</strong> ${badge(vars.industry || 'Not specified')}</p>
          ${infoRow('Company Size', vars.company_size || 'Not specified')}
          ${vars.website ? `<p style="margin: 8px 0;"><strong style="color: ${BRAND.colors.muted};">Website:</strong> <a href="${vars.website}" style="color: ${BRAND.colors.primary};">${vars.website}</a></p>` : ''}
        `)}
        
        ${card('Project Requirements', `
          <p style="margin: 8px 0;"><strong style="color: ${BRAND.colors.muted};">Budget:</strong> ${badge(vars.budget || 'Not specified', BRAND.colors.success)}</p>
          ${infoRow('Timeline', vars.timeline || 'Not specified')}
          ${vars.primary_goals && vars.primary_goals.length > 0 ? `
            <div style="margin-top: 15px;">
              <strong style="color: ${BRAND.colors.muted};">Primary Goals:</strong>
              <ul style="margin: 8px 0; padding-left: 20px;">
                ${vars.primary_goals.map((goal: string) => `<li style="color: ${BRAND.colors.text}; margin: 5px 0;">${goal}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        `)}
        
        <p style="font-size: 12px; color: ${BRAND.colors.mutedDark};">Received: ${timestamp}</p>
        ${ctaButton('View in Admin Dashboard', BRAND.adminDashboard)}
      `),
      text: `New Client Onboarding

Contact:
- Name: ${vars.first_name || ''} ${vars.last_name || ''}
- Email: ${vars.email}
${vars.phone ? `- Phone: ${vars.phone}` : ''}
- Preferred Contact: ${vars.preferred_contact}

Company:
- Company: ${vars.company_name}
- Industry: ${vars.industry}
- Size: ${vars.company_size}
${vars.website ? `- Website: ${vars.website}` : ''}

Requirements:
- Budget: ${vars.budget}
- Timeline: ${vars.timeline}
${vars.primary_goals ? `- Goals: ${vars.primary_goals.join(', ')}` : ''}

Received: ${timestamp}
View in Admin: ${BRAND.adminDashboard}`
    },

    // ============================================
    // GENERAL TEMPLATES
    // ============================================
    'newsletter': {
      html: wrapInLayout(`
        <h2 style="color: ${BRAND.colors.text}; margin: 0 0 15px 0;">Welcome to Our Newsletter!</h2>
        <p style="color: ${BRAND.colors.muted}; line-height: 1.6;">Dear ${vars.name || 'Subscriber'},</p>
        <p style="color: ${BRAND.colors.muted}; line-height: 1.6;">Thank you for subscribing! You'll now receive updates about:</p>
        
        ${card('', `
          <ul style="color: ${BRAND.colors.muted}; padding-left: 20px; margin: 0; line-height: 1.8;">
            <li>Latest recruitment marketing trends</li>
            <li>Industry insights and best practices</li>
            <li>New features and services</li>
            <li>Exclusive offers and content</li>
          </ul>
        `)}
        
        <p style="color: ${BRAND.colors.muted}; line-height: 1.6;">We're excited to share valuable content with you!</p>
        
        <p style="font-size: 12px; color: ${BRAND.colors.mutedDark}; margin-top: 30px;">
          <a href="${vars.unsubscribeUrl || '#'}" style="color: ${BRAND.colors.mutedDark};">Unsubscribe</a>
        </p>
      `),
      text: `Welcome to Our Newsletter!

Dear ${vars.name || 'Subscriber'},

Thank you for subscribing! You'll receive updates about:
- Latest recruitment marketing trends
- Industry insights and best practices
- New features and services
- Exclusive offers and content

Unsubscribe: ${vars.unsubscribeUrl || 'Contact us to unsubscribe'}`
    },

    'notification': {
      html: wrapInLayout(`
        <h2 style="color: ${BRAND.colors.text}; margin: 0 0 15px 0;">Notification</h2>
        <p style="color: ${BRAND.colors.muted}; line-height: 1.6;">${vars.message || 'You have a new notification.'}</p>
        ${vars.actionUrl ? ctaButton(vars.actionText || 'View Details', vars.actionUrl) : ''}
        <p style="font-size: 12px; color: ${BRAND.colors.mutedDark}; margin-top: 20px;">
          ${vars.timestamp ? `Sent: ${new Date(vars.timestamp).toLocaleString()}` : ''}
        </p>
      `),
      text: `Notification

${vars.message || 'You have a new notification.'}

${vars.actionUrl ? `${vars.actionText || 'View Details'}: ${vars.actionUrl}` : ''}
${vars.timestamp ? `Sent: ${new Date(vars.timestamp).toLocaleString()}` : ''}`
    },

    'welcome': {
      html: wrapInLayout(`
        <h2 style="color: ${BRAND.colors.text}; margin: 0 0 15px 0;">Welcome to ${BRAND.name}!</h2>
        <p style="color: ${BRAND.colors.muted}; line-height: 1.6;">Dear ${vars.name || 'New User'},</p>
        <p style="color: ${BRAND.colors.muted}; line-height: 1.6;">Welcome to ${BRAND.name} – your partner in recruitment marketing excellence!</p>
        
        ${card("Here's what you can expect", `
          <ul style="color: ${BRAND.colors.muted}; padding-left: 20px; margin: 0; line-height: 1.8;">
            <li>Professional recruitment marketing services</li>
            <li>Cost-effective candidate acquisition</li>
            <li>Data-driven insights and analytics</li>
            <li>Dedicated support from our team</li>
          </ul>
        `)}
        
        ${vars.dashboardUrl ? ctaButton('Access Your Dashboard', vars.dashboardUrl) : ''}
        
        <p style="color: ${BRAND.colors.muted}; line-height: 1.6;">If you have any questions, our support team is here to help.</p>
        <p style="color: ${BRAND.colors.muted}; margin-top: 25px;">Best regards,<br><strong style="color: ${BRAND.colors.text};">The ${BRAND.name} Team</strong></p>
      `),
      text: `Welcome to ${BRAND.name}!

Dear ${vars.name || 'New User'},

Welcome to ${BRAND.name} – your partner in recruitment marketing excellence!

Here's what you can expect:
- Professional recruitment marketing services
- Cost-effective candidate acquisition
- Data-driven insights and analytics
- Dedicated support from our team

${vars.dashboardUrl ? `Access Your Dashboard: ${vars.dashboardUrl}` : ''}

Best regards,
The ${BRAND.name} Team`
    },
  };

  // Backwards compatibility: map old template names to new ones
  const templateMapping: Record<string, TemplateType> = {
    'contact': 'contact-confirmation',
  };

  const mappedTemplate = templateMapping[template] || template;
  return templates[mappedTemplate as TemplateType] || templates.notification;
}

serve(handler);
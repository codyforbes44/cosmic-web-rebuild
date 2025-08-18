import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string | string[];
  from?: string;
  subject: string;
  html?: string;
  text?: string;
  template?: 'contact' | 'newsletter' | 'notification' | 'welcome';
  variables?: Record<string, any>;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Email service function called");

  // Handle CORS preflight requests
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
    console.log("Email request received:", { ...emailRequest, html: emailRequest.html ? '[HTML_CONTENT]' : undefined });

    // Validate required fields
    if (!emailRequest.to || !emailRequest.subject) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: to, subject" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Set default from address
    const from = emailRequest.from || "ZBI <noreply@yourdomain.com>";

    let html = emailRequest.html;
    let text = emailRequest.text;

    // Generate content from template if specified
    if (emailRequest.template && !html && !text) {
      const templateContent = generateTemplate(emailRequest.template, emailRequest.variables || {});
      html = templateContent.html;
      text = templateContent.text;
    }

    // Ensure we have content
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
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
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

// Email template generator
function generateTemplate(template: string, variables: Record<string, any>) {
  const templates = {
    contact: {
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #E85D2A; margin-bottom: 20px;">Thank You for Contacting Us!</h1>
          <p>Dear ${variables.name || 'Valued Contact'},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          ${variables.message ? `
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <strong>Your Message:</strong><br>
              ${variables.message}
            </div>
          ` : ''}
          <p>Our team typically responds within 24 hours during business days.</p>
          <p>Best regards,<br>The ZBI Team</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #666;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      `,
      text: `Thank You for Contacting Us!

Dear ${variables.name || 'Valued Contact'},

We have received your message and will get back to you as soon as possible.
${variables.message ? `\nYour Message:\n${variables.message}\n` : ''}
Our team typically responds within 24 hours during business days.

Best regards,
The ZBI Team

This is an automated response. Please do not reply to this email.`
    },
    newsletter: {
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #E85D2A; margin-bottom: 20px;">Welcome to Our Newsletter!</h1>
          <p>Dear ${variables.name || 'Subscriber'},</p>
          <p>Thank you for subscribing to our newsletter. You'll now receive updates about:</p>
          <ul>
            <li>Latest recruitment marketing trends</li>
            <li>Industry insights and best practices</li>
            <li>New features and services</li>
            <li>Exclusive offers and content</li>
          </ul>
          <p>We're excited to share valuable content with you!</p>
          <a href="${variables.unsubscribeUrl || '#'}" style="font-size: 12px; color: #666;">Unsubscribe</a>
        </div>
      `,
      text: `Welcome to Our Newsletter!

Dear ${variables.name || 'Subscriber'},

Thank you for subscribing to our newsletter. You'll now receive updates about:
- Latest recruitment marketing trends
- Industry insights and best practices  
- New features and services
- Exclusive offers and content

We're excited to share valuable content with you!

Unsubscribe: ${variables.unsubscribeUrl || 'Contact us to unsubscribe'}`
    },
    notification: {
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #E85D2A;">Notification</h2>
          <p>${variables.message || 'You have a new notification.'}</p>
          ${variables.actionUrl ? `
            <a href="${variables.actionUrl}" style="background: #E85D2A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
              ${variables.actionText || 'View Details'}
            </a>
          ` : ''}
          <p style="font-size: 12px; color: #666; margin-top: 30px;">
            ${variables.timestamp ? `Sent: ${new Date(variables.timestamp).toLocaleString()}` : ''}
          </p>
        </div>
      `,
      text: `Notification

${variables.message || 'You have a new notification.'}

${variables.actionUrl ? `${variables.actionText || 'View Details'}: ${variables.actionUrl}` : ''}

${variables.timestamp ? `Sent: ${new Date(variables.timestamp).toLocaleString()}` : ''}`
    },
    welcome: {
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #E85D2A; margin-bottom: 20px;">Welcome to ZBI!</h1>
          <p>Dear ${variables.name || 'New User'},</p>
          <p>Welcome to ZBI - your partner in recruitment marketing excellence!</p>
          <p>We're thrilled to have you on board. Here's what you can expect:</p>
          <ul>
            <li>Professional recruitment marketing services</li>
            <li>Cost-effective candidate acquisition</li>
            <li>Data-driven insights and analytics</li>
            <li>Dedicated support from our team</li>
          </ul>
          <p>Ready to get started? Explore our platform and discover how we can help you find qualified candidates faster.</p>
          ${variables.dashboardUrl ? `
            <a href="${variables.dashboardUrl}" style="background: #E85D2A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">
              Access Your Dashboard
            </a>
          ` : ''}
          <p>If you have any questions, our support team is here to help.</p>
          <p>Best regards,<br>The ZBI Team</p>
        </div>
      `,
      text: `Welcome to ZBI!

Dear ${variables.name || 'New User'},

Welcome to ZBI - your partner in recruitment marketing excellence!

We're thrilled to have you on board. Here's what you can expect:
- Professional recruitment marketing services
- Cost-effective candidate acquisition  
- Data-driven insights and analytics
- Dedicated support from our team

Ready to get started? Explore our platform and discover how we can help you find qualified candidates faster.

${variables.dashboardUrl ? `Access Your Dashboard: ${variables.dashboardUrl}` : ''}

If you have any questions, our support team is here to help.

Best regards,
The ZBI Team`
    }
  };

  return templates[template as keyof typeof templates] || templates.notification;
}

serve(handler);
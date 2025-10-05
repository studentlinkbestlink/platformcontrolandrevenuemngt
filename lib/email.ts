import { Resend } from 'resend';
import { config } from './config';

// Initialize Resend
const resend = new Resend(config.email.apiKey);

export interface EmailTemplate {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

// Email templates
export const emailTemplates = {
  welcome: (name: string, role: string) => ({
    subject: `Welcome to ${config.app.name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #ff6b35;">Welcome to ${config.app.name}!</h1>
        <p>Hi ${name},</p>
        <p>Welcome to our platform! Your account has been created with the <strong>${role}</strong> role.</p>
        <p>You can now access your dashboard and start managing your ${role} activities.</p>
        <a href="${config.app.url}/dashboard" style="background-color: #ff6b35; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Access Dashboard</a>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Best regards,<br>The ${config.app.name} Team</p>
      </div>
    `,
    text: `Welcome to ${config.app.name}! Hi ${name}, Welcome to our platform! Your account has been created with the ${role} role. You can now access your dashboard at ${config.app.url}/dashboard`
  }),

  orderConfirmation: (orderNumber: string, customerName: string, total: number) => ({
    subject: `Order Confirmation - ${orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #ff6b35;">Order Confirmed!</h1>
        <p>Hi ${customerName},</p>
        <p>Thank you for your order! Your order <strong>${orderNumber}</strong> has been confirmed.</p>
        <p><strong>Total Amount:</strong> $${total.toFixed(2)}</p>
        <p>We'll send you tracking information once your order ships.</p>
        <a href="${config.app.url}/orders/${orderNumber}" style="background-color: #ff6b35; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Order</a>
        <p>Thank you for choosing us!</p>
        <p>Best regards,<br>The ${config.app.name} Team</p>
      </div>
    `,
    text: `Order Confirmed! Hi ${customerName}, Thank you for your order! Your order ${orderNumber} has been confirmed. Total Amount: $${total.toFixed(2)}. View your order at ${config.app.url}/orders/${orderNumber}`
  }),

  payoutNotification: (vendorName: string, amount: number, payoutId: string) => ({
    subject: `Payout Processed - $${amount.toFixed(2)}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #10b981;">Payout Processed!</h1>
        <p>Hi ${vendorName},</p>
        <p>Great news! Your payout of <strong>$${amount.toFixed(2)}</strong> has been processed successfully.</p>
        <p><strong>Payout ID:</strong> ${payoutId}</p>
        <p>The funds should appear in your account within 1-3 business days.</p>
        <a href="${config.app.url}/payments" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Payments</a>
        <p>Thank you for being part of our platform!</p>
        <p>Best regards,<br>The ${config.app.name} Team</p>
      </div>
    `,
    text: `Payout Processed! Hi ${vendorName}, Great news! Your payout of $${amount.toFixed(2)} has been processed successfully. Payout ID: ${payoutId}. View your payments at ${config.app.url}/payments`
  }),
};

// Email sending functions
export const sendEmail = async (template: EmailTemplate) => {
  try {
    const result = await resend.emails.send({
      from: config.email.from,
      to: template.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });

    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export const sendWelcomeEmail = async (email: string, name: string, role: string) => {
  const template = emailTemplates.welcome(name, role);
  return sendEmail({
    to: email,
    ...template,
  });
};

export const sendOrderConfirmation = async (
  email: string,
  orderNumber: string,
  customerName: string,
  total: number
) => {
  const template = emailTemplates.orderConfirmation(orderNumber, customerName, total);
  return sendEmail({
    to: email,
    ...template,
  });
};

export const sendPayoutNotification = async (
  email: string,
  vendorName: string,
  amount: number,
  payoutId: string
) => {
  const template = emailTemplates.payoutNotification(vendorName, amount, payoutId);
  return sendEmail({
    to: email,
    ...template,
  });
};


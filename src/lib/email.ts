export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log(`[Email Simulation Mode] To: ${options.to} | Subject: ${options.subject}`);
    return true;
  }

  try {
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort) || 587,
      secure: Number(smtpPort) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Authority SunTech Solar Energy" <${smtpUser}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

export function getWelcomeEmailHTML(email: string): string {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #0F172A; color: #FFFFFF; padding: 40px; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #10B981; margin: 0; font-size: 28px;">AUTHORITY SUNTECH</h1>
        <p style="color: #F59E0B; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; margin-top: 4px;">Smart Renewable Energy</p>
      </div>

      <h2 style="color: #FFFFFF; font-size: 20px;">Welcome to Authority SunTech!</h2>
      <p style="color: #94A3B8; font-size: 14px; line-height: 1.6;">
        Thank you for subscribing to Authority SunTech Clean Energy Updates.
      </p>

      <div style="background-color: #1E293B; padding: 20px; border-radius: 12px; margin: 20px 0;">
        <p style="color: #E2E8F0; font-size: 14px; margin: 0 0 10px 0;">You will now receive updates about:</p>
        <ul style="color: #34D399; font-size: 14px; margin: 0; padding-left: 20px; line-height: 1.8;">
          <li>New Solar Products & Innovations</li>
          <li>Exclusive Subscriber Promotions & Discounts</li>
          <li>Energy Saving & Solar ROI Tips</li>
          <li>Turn-key Commercial & Residential Installations</li>
        </ul>
      </div>

      <p style="color: #64748B; font-size: 12px; text-align: center; margin-top: 30px;">
        © 2026 Authority SunTech Solar Energy Solutions. Taiwo Road, Ilorin, Kwara State, Nigeria.<br/>
        Phone: 07016091727 / +234 706 398 7545
      </p>
    </div>
  `;
}

export function getProductNotificationEmailHTML(product: {
  name: string;
  description: string;
  price: string;
  image: string;
  link: string;
}): string {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #0F172A; color: #FFFFFF; padding: 40px; border-radius: 16px;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #10B981; margin: 0; font-size: 28px;">AUTHORITY SUNTECH</h1>
        <p style="color: #F59E0B; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; margin-top: 4px;">New Solar Arrival</p>
      </div>

      <div style="background-color: #1E293B; padding: 24px; border-radius: 16px; border: 1px solid #334155; text-align: center;">
        <img src="${product.image}" alt="${product.name}" style="max-width: 100%; height: 200px; object-fit: contain; border-radius: 12px; margin-bottom: 16px;" />
        <h2 style="color: #FFFFFF; font-size: 22px; margin: 0 0 8px 0;">${product.name}</h2>
        <p style="color: #94A3B8; font-size: 14px; line-height: 1.5; margin-bottom: 16px;">${product.description}</p>
        <p style="color: #F59E0B; font-size: 24px; font-weight: bold; font-family: monospace; margin-bottom: 20px;">${product.price}</p>
        <a href="${product.link}" style="display: inline-block; background-color: #10B981; color: #FFFFFF; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: bold; font-size: 14px;">
          Shop Now
        </a>
      </div>

      <p style="color: #64748B; font-size: 12px; text-align: center; margin-top: 30px;">
        © 2026 Authority SunTech Solar Energy Solutions. Taiwo Road, Ilorin, Kwara State, Nigeria.<br/>
        Phone: 07016091727 / +234 706 398 7545
      </p>
    </div>
  `;
}

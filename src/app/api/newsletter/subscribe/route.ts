import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Subscriber from '@/models/Subscriber';
import { sendEmail, getWelcomeEmailHTML } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email address is required' }, { status: 400 });
    }

    await connectToDatabase();

    const normalizedEmail = email.toLowerCase().trim();
    let subscriber = await Subscriber.findOne({ email: normalizedEmail });

    if (subscriber) {
      if (!subscriber.active) {
        subscriber.active = true;
        await subscriber.save();
      }
    } else {
      subscriber = await Subscriber.create({ email: normalizedEmail });
    }

    await sendEmail({
      to: normalizedEmail,
      subject: 'Welcome to Authority SunTech!',
      html: getWelcomeEmailHTML(normalizedEmail),
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to Authority SunTech newsletter! Check your inbox for confirmation.',
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

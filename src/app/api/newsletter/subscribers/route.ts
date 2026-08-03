import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Subscriber from '@/models/Subscriber';
import { sendEmail, getProductNotificationEmailHTML } from '@/lib/email';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const subscribers = await Subscriber.find({ active: true }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: subscribers.length, subscribers });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { action, subscriberId, product } = await req.json();
    await connectToDatabase();

    if (action === 'delete') {
      await Subscriber.findByIdAndDelete(subscriberId);
      return NextResponse.json({ success: true, message: 'Subscriber deleted' });
    }

    if (action === 'broadcast_product' && product) {
      const activeSubscribers = await Subscriber.find({ active: true });
      const emailHtml = getProductNotificationEmailHTML({
        name: product.name,
        description: product.shortDescription || product.description,
        price: new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(product.discountPrice || product.price),
        image: product.images[0] || '',
        link: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/products/${product._id}`,
      });

      let sentCount = 0;
      for (const sub of activeSubscribers) {
        const sent = await sendEmail({
          to: sub.email,
          subject: `New Arrival at Authority SunTech: ${product.name}`,
          html: emailHtml,
        });
        if (sent) sentCount++;
      }

      return NextResponse.json({
        success: true,
        message: `Product announcement sent to ${sentCount} subscribers!`,
      });
    }

    return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

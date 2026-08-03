import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectToDatabase } from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';

export async function POST(req: Request) {
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY || 'sk_test_suntech_demo_key';
    const bodyText = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    if (signature && secretKey && !secretKey.includes('demo')) {
      const hash = crypto
        .createHmac('sha512', secretKey)
        .update(bodyText)
        .digest('hex');

      if (hash !== signature) {
        return NextResponse.json({ success: false, message: 'Invalid Paystack Signature' }, { status: 401 });
      }
    }

    const event = JSON.parse(bodyText);

    if (event.event === 'charge.success') {
      const data = event.data;
      const reference = data.reference;

      await connectToDatabase();

      const existingOrder = await Order.findOne({ paystackRef: reference });

      if (existingOrder) {
        if (existingOrder.paymentStatus !== 'completed') {
          existingOrder.paymentStatus = 'completed';
          existingOrder.orderStatus = 'processing';
          await existingOrder.save();

          for (const item of existingOrder.items) {
            if (item.product) {
              await Product.findByIdAndUpdate(item.product, {
                $inc: { stockQuantity: -item.quantity },
              });
            }
          }
        }
      }

      return NextResponse.json({ success: true, message: 'Webhook event processed' });
    }

    return NextResponse.json({ success: true, message: 'Event ignored' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

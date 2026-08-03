import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const email = searchParams.get('email');

    const query: any = {};
    if (userId) query.user = userId;
    if (email) query['shippingAddress.email'] = email;

    const orders = await Order.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: orders.length, orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const orderNumber = 'AST-' + Math.floor(100000 + Math.random() * 900000);

    const newOrder = await Order.create({
      ...body,
      orderNumber,
      paymentStatus: body.paymentStatus || 'completed',
      orderStatus: 'processing',
    });

    for (const item of body.items) {
      if (item.product) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stockQuantity: -item.quantity },
        });
      }
    }

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

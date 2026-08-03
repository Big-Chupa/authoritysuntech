import { NextResponse } from 'next/server';
import { initializePaystackTransaction } from '@/lib/paystack';

export async function POST(req: Request) {
  try {
    const { email, amount, metadata } = await req.json();

    if (!email || !amount) {
      return NextResponse.json({ success: false, message: 'Email and amount are required' }, { status: 400 });
    }

    const reference = 'AST-' + Math.floor(100000 + Math.random() * 900000);

    const result = await initializePaystackTransaction({
      email,
      amount,
      reference,
      metadata,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

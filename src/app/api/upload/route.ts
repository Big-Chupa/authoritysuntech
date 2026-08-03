import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ success: false, message: 'Image data is required' }, { status: 400 });
    }

    const secureUrl = await uploadToCloudinary(image);

    return NextResponse.json({
      success: true,
      url: secureUrl,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

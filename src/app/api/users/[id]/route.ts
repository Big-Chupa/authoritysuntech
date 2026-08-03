import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { newPassword, role } = await req.json();
    await connectToDatabase();

    const updateFields: any = {};
    if (newPassword) {
      updateFields.password = await hashPassword(newPassword);
    }
    if (role) {
      updateFields.role = role;
    }

    const updatedUser = await User.findByIdAndUpdate(params.id, updateFields, { new: true }).select('-password');

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    await User.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: 'User account deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

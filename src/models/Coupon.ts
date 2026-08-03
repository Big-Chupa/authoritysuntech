import mongoose, { Schema, Document } from 'mongoose';

export interface ICouponDoc extends Document {
  code: string;
  discountPercent: number;
  active: boolean;
  expiryDate?: Date;
}

const CouponSchema = new Schema<ICouponDoc>(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    discountPercent: { type: Number, required: true },
    active: { type: Boolean, default: true },
    expiryDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Coupon || mongoose.model<ICouponDoc>('Coupon', CouponSchema);

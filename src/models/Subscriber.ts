import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriberDoc extends Document {
  email: string;
  active: boolean;
  subscribedAt: Date;
}

const SubscriberSchema = new Schema<ISubscriberDoc>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    active: { type: Boolean, default: true },
    subscribedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Subscriber || mongoose.model<ISubscriberDoc>('Subscriber', SubscriberSchema);

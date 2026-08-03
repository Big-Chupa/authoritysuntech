import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonialDoc extends Document {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  solarSystemInstalled: string;
}

const TestimonialSchema = new Schema<ITestimonialDoc>(
  {
    name: { type: String, required: true },
    role: { type: String, default: 'Homeowner' },
    company: { type: String, default: '' },
    content: { type: String, required: true },
    avatar: { type: String, required: true },
    rating: { type: Number, default: 5 },
    solarSystemInstalled: { type: String, default: '10kVA Hybrid System' },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonialDoc>('Testimonial', TestimonialSchema);

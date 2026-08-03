import mongoose, { Schema, Document } from 'mongoose';

export interface ICategoryDoc extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

const CategorySchema = new Schema<ICategoryDoc>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model<ICategoryDoc>('Category', CategorySchema);

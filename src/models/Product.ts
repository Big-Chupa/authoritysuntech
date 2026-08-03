import mongoose, { Schema, Document } from 'mongoose';

export interface IProductDoc extends Document {
  name: string;
  slug: string;
  category: string;
  brand: string;
  price: number;
  discountPrice?: number;
  shortDescription: string;
  description: string;
  specifications: Record<string, string>;
  images: string[];
  stockQuantity: number;
  inStock: boolean;
  sku: string;
  weight?: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  tags: string[];
  warranty: string;
  rating: number;
  reviewCount: number;
}

const ProductSchema = new Schema<IProductDoc>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true, index: true },
    brand: { type: String, required: true, default: 'Authority SunTech' },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    specifications: { type: Map, of: String, default: {} },
    images: [{ type: String, required: true }],
    stockQuantity: { type: Number, required: true, default: 10 },
    inStock: { type: Boolean, default: true },
    sku: { type: String, required: true, unique: true },
    weight: { type: String, default: '15kg' },
    isFeatured: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    tags: [{ type: String }],
    warranty: { type: String, default: '5 Years' },
    rating: { type: Number, default: 5 },
    reviewCount: { type: Number, default: 12 },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProductDoc>('Product', ProductSchema);

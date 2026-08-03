export interface IProduct {
  _id: string;
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
  createdAt?: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'superadmin';
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
  };
  createdAt?: string;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface IOrder {
  _id: string;
  orderNumber: string;
  user?: {
    name: string;
    email: string;
    phone: string;
  };
  items: {
    product: string | IProduct;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  totalAmount: number;
  discountAmount: number;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    orderNotes?: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paystackRef?: string;
  createdAt: string;
}

export interface ITestimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  solarSystemInstalled: string;
}

export interface ICoupon {
  _id: string;
  code: string;
  discountPercent: number;
  active: boolean;
  expiryDate?: string;
}

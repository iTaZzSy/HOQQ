import { Schema, model, Document } from 'mongoose';

// Interface for a single price variant
export interface IVariant {
  size: string;
  price: number;
}

// Interface for the Menu Item document
export interface IMenuItem extends Document {
  name: string;
  description: string;
  category: string;
  price?: number; // For items with a single price
  image?: string;
  variants?: IVariant[]; // For items with variable prices
}

const variantSchema = new Schema<IVariant>({
  size: { type: String, required: true },
  price: { type: Number, required: true },
}, { _id: false });

const menuItemSchema = new Schema<IMenuItem>({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true, index: true },
  price: { type: Number, required: false },
  image: { type: String, required: false },
  variants: { type: [variantSchema], required: false },
}, {
  timestamps: true
});

// Add a custom validator manually if needed, or rely on service logic.
// For now, removing the problematic schema option to fix build.
menuItemSchema.pre('validate', function(next: any) {
    if (this.price == null && (!this.variants || this.variants.length === 0)) {
        next(new Error('A menu item must have either a single price or at least one price variant.'));
    } else {
        next();
    }
});

const MenuItem = model<IMenuItem>('MenuItem', menuItemSchema);

export default MenuItem;

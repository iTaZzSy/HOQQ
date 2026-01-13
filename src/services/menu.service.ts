import { z } from 'zod';
import MenuItem, { IMenuItem } from '../models/menu.model';

// Zod schema for a variant
const variantSchema = z.object({
    size: z.string().min(1),
    price: z.number().positive(),
});

// Base Zod object schema
const baseMenuItemSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    category: z.string().min(1),
    price: z.number().positive().optional(),
    image: z.string().nullable().optional(),
    variants: z.array(variantSchema).optional(),
});

// Schema for creating (includes validation logic)
export const createMenuItemSchema = baseMenuItemSchema.refine(data => data.price != null || (data.variants != null && data.variants.length > 0), {
    message: 'A menu item must have either a single price or at least one price variant.',
    path: ["price"],
});

// Schema for updating (all fields optional, no refine check needed for partial updates typically, 
// or you can add specific logic if you want to ensure data consistency on update too, but strictly partial is safer for simple patches)
export const updateMenuItemSchema = baseMenuItemSchema.partial();

export type CreateMenuItemInput = z.infer<typeof createMenuItemSchema>;
export type UpdateMenuItemInput = z.infer<typeof updateMenuItemSchema>;


// --- Service Functions ---

export const createMenuItem = async (input: CreateMenuItemInput): Promise<IMenuItem> => {
    const menuItem = new MenuItem(input);
    await menuItem.save();
    return menuItem;
};

export const getMenuItems = async (filter: { category?: string } = {}): Promise<IMenuItem[]> => {
    if (filter.category) {
        return MenuItem.find({ category: filter.category });
    }
    return MenuItem.find();
};

export const getMenuItemById = async (id: string): Promise<IMenuItem | null> => {
    return MenuItem.findById(id);
};

export const updateMenuItem = async (id: string, payload: UpdateMenuItemInput): Promise<IMenuItem | null> => {
    return MenuItem.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteMenuItem = async (id: string): Promise<IMenuItem | null> => {
    return MenuItem.findByIdAndDelete(id);
};

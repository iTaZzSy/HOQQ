import { z } from 'zod';
import MenuItem, { IMenuItem } from '../models/menu.model';

const variantSchema = z.object({
    size: z.string().min(1, "Boyut seçimi zorunludur"),
    price: z.number().positive("Fiyat 0'dan büyük olmalıdır"),
});

const baseMenuItemSchema = z.object({
    name: z.string().min(1, "Ürün adı zorunludur"),
    description: z.string().min(1, "Açıklama zorunludur"),
    category: z.string().min(1, "Kategori zorunludur"),
    price: z.number().positive("Fiyat 0'dan büyük olmalıdır").optional(),
    image: z.string().nullable().optional(),
    variants: z.array(variantSchema).optional(),
});

export const createMenuItemSchema = baseMenuItemSchema.refine(data => data.price != null || (data.variants != null && data.variants.length > 0), {
    message: 'Ürün fiyatı veya en az bir varyant girilmelidir.',
    path: ["price"],
});

export const updateMenuItemSchema = baseMenuItemSchema.partial();

export type CreateMenuItemInput = z.infer<typeof createMenuItemSchema>;
export type UpdateMenuItemInput = z.infer<typeof updateMenuItemSchema>;

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
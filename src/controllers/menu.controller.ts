import { Request, Response } from 'express';
import { z } from 'zod';
import * as MenuService from '../services/menu.service';

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}

export const createMenuItem = async (req: Request, res: Response) => {
    try {
        const multerReq = req as MulterRequest;
        
        // Prepare data from body (which might be strings due to FormData) and file
        const rawData = {
            ...req.body,
            // Convert price to number if it comes as string from FormData
            price: req.body.price ? Number(req.body.price) : undefined,
            image: multerReq.file ? `/uploads/${multerReq.file.filename}` : undefined
        };

        const validationResult = MenuService.createMenuItemSchema.safeParse(rawData);
        if (!validationResult.success) {
            return res.status(400).json({ errors: validationResult.error.flatten().fieldErrors });
        }
        const menuItem = await MenuService.createMenuItem(validationResult.data);
        return res.status(201).json(menuItem);
    } catch (error) {
        console.error("Error creating menu item:", error);
        // Handle unique name error
        if (error instanceof Error && 'code' in error && (error as any).code === 11000) {
            return res.status(409).json({ message: "A menu item with this name already exists." });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMenuItems = async (req: Request, res: Response) => {
    try {
        const category = req.query.category as string | undefined;
        const menuItems = await MenuService.getMenuItems({ category });
        return res.status(200).json(menuItems);
    } catch (error) {
        console.error("Error getting menu items:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMenuItemById = async (req: Request, res: Response) => {
    try {
        const menuItem = await MenuService.getMenuItemById(req.params.id as string);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        return res.status(200).json(menuItem);
    } catch (error) {
        console.error("Error getting menu item by id:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateMenuItem = async (req: Request, res: Response) => {
    try {
        const multerReq = req as MulterRequest;
        
        const rawData = {
            ...req.body,
            price: req.body.price ? Number(req.body.price) : undefined,
        };

        // Handle Image Update logic
        if (multerReq.file) {
            // New file uploaded
            rawData.image = `/uploads/${multerReq.file.filename}`;
        } else if (req.body.removeImage === 'true') {
            // Explicit removal requested
            rawData.image = null; 
        }

        const validationResult = MenuService.updateMenuItemSchema.safeParse(rawData);
        if (!validationResult.success) {
            return res.status(400).json({ errors: validationResult.error.flatten().fieldErrors });
        }
        
        // Mongoose update - if image is null, we need to $unset it or set it to null
        // safeParse might strip nulls if optional, let's ensure it's handled.
        // Actually, findByIdAndUpdate with { new: true } handles null updates if passed.
        
        const menuItem = await MenuService.updateMenuItem(req.params.id as string, validationResult.data);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        return res.status(200).json(menuItem);
    } catch (error) {
        console.error("Error updating menu item:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteMenuItem = async (req: Request, res: Response) => {
    try {
        const menuItem = await MenuService.deleteMenuItem(req.params.id as string);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        return res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        console.error("Error deleting menu item:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

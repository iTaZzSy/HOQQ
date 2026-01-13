import { Router } from 'express';
import * as MenuController from '../controllers/menu.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

const router = Router();

// Route to get all menu items (can filter by category) - PUBLIC
router.get('/', MenuController.getMenuItems);

// Route to create a new menu item - PROTECTED
router.post('/', authenticateToken, upload.single('image'), MenuController.createMenuItem);

// Route to get a single menu item by ID - PUBLIC
router.get('/:id', MenuController.getMenuItemById);

// Route to update a menu item - PROTECTED
router.patch('/:id', authenticateToken, upload.single('image'), MenuController.updateMenuItem);

// Route to delete a menu item - PROTECTED
router.delete('/:id', authenticateToken, MenuController.deleteMenuItem);

export default router;

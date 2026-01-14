import express from 'express';
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem, getMenuItemById } from '../controllers/menu.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

const router = express.Router();

router.get('/', getMenuItems);

router.post('/', authenticateToken, upload.single('image'), createMenuItem);

router.get('/:id', getMenuItemById);

router.patch('/:id', authenticateToken, upload.single('image'), updateMenuItem);

router.delete('/:id', authenticateToken, deleteMenuItem);

export default router;

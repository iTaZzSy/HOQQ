import express from 'express';
import { createReservation, getReservations, updateReservation, deleteReservation } from '../controllers/reservation.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', authenticateToken, getReservations);

router.post('/', createReservation);

router.put('/:id', authenticateToken, updateReservation);

router.delete('/:id', authenticateToken, deleteReservation);

export default router;

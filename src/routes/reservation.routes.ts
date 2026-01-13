import { Router } from 'express';
import * as ReservationController from '../controllers/reservation.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Route to get all reservations - PROTECTED (Admin only)
router.get('/', authenticateToken, ReservationController.getReservations);

// Route to create a new reservation - PUBLIC (Customers)
router.post('/', ReservationController.createReservation);

// Route to update a reservation - PROTECTED
router.patch('/:id', authenticateToken, ReservationController.updateReservation);

// Route to delete a reservation - PROTECTED
router.delete('/:id', authenticateToken, ReservationController.deleteReservation);

export default router;

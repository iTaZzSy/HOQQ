import { Request, Response } from 'express';
import { z } from 'zod';
import * as ReservationService from '../services/reservation.service';

export const createReservation = async (req: Request, res: Response) => {
  try {
    // 1. Validate input
    const validationResult = ReservationService.reservationValidationSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.error.flatten().fieldErrors });
    }

    // 2. Call the service to create the reservation
    const newReservation = await ReservationService.createReservation(validationResult.data);

    // 3. Send the response
    return res.status(201).json({ message: "Reservation created successfully", reservation: newReservation });

  } catch (error) {
    console.error("Error creating reservation:", error);

    // Check if the error is a Zod validation error
    if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.flatten().fieldErrors });
    }

    // Check for the custom "Time slot unavailable" error from the service
    if (error instanceof Error && error.message === "Time slot unavailable") {
      return res.status(400).json({ message: error.message });
    }

    // Generic internal server error
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await ReservationService.getReservations();
    return res.status(200).json(reservations);
  } catch (error) {
    console.error("Error getting reservations:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateReservation = async (req: Request, res: Response) => {
    try {
        const validationResult = ReservationService.updateReservationSchema.safeParse(req.body);
                if (!validationResult.success) {
                    return res.status(400).json({ errors: validationResult.error.flatten().fieldErrors });
                }
                const updatedReservation = await ReservationService.updateReservation(req.params.id as string, validationResult.data);
                if (!updatedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        return res.status(200).json({ message: "Reservation updated successfully", reservation: updatedReservation });

    } catch (error) {
        console.error("Error updating reservation:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteReservation = async (req: Request, res: Response) => {

    try {

        const deletedReservation = await ReservationService.deleteReservation(req.params.id as string);

        if (!deletedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }

        return res.status(200).json({ message: "Reservation deleted successfully" });
    } catch (error) {
        console.error("Error deleting reservation:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

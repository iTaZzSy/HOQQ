import { Request, Response } from 'express';
import { z } from 'zod';
import * as ReservationService from '../services/reservation.service';

export const createReservation = async (req: Request, res: Response) => {
  try {
    const validationResult = ReservationService.reservationValidationSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.error.flatten().fieldErrors });
    }

    const newReservation = await ReservationService.createReservation(validationResult.data);

    return res.status(201).json({ message: "Rezervasyon başarıyla oluşturuldu", reservation: newReservation });

  } catch (error) {
    console.error("Error creating reservation:", error);

    if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.flatten().fieldErrors });
    }

    if (error instanceof Error && error.message === "Seçilen zaman dilimi müsait değil") {
      return res.status(400).json({ message: "Seçilen zaman dilimi müsait değil" });
    }

    return res.status(500).json({ message: "Sunucu hatası" });
  }
};

export const getReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await ReservationService.getReservations();
    return res.status(200).json(reservations);
  } catch (error) {
    console.error("Error getting reservations:", error);
    return res.status(500).json({ message: "Sunucu hatası" });
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
            return res.status(404).json({ message: "Rezervasyon bulunamadı" });
        }

        return res.status(200).json({ message: "Rezervasyon başarıyla güncellendi", reservation: updatedReservation });

    } catch (error) {
        console.error("Error updating reservation:", error);
        return res.status(500).json({ message: "Sunucu hatası" });
    }
};

export const deleteReservation = async (req: Request, res: Response) => {

    try {

        const deletedReservation = await ReservationService.deleteReservation(req.params.id as string);

        if (!deletedReservation) {
            return res.status(404).json({ message: "Rezervasyon bulunamadı" });
        }

        return res.status(200).json({ message: "Rezervasyon başarıyla silindi" });
    } catch (error) {
        console.error("Error deleting reservation:", error);
        return res.status(500).json({ message: "Sunucu hatası" });
    }
};
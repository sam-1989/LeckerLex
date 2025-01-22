import { Guest } from "../models/guestSchema.js";

// Controller-Funktion, um einen Gastbesuch zu speichern

export const addGuestVisit = async (req, res) =>{
    try {
        const ipAddress = req.ip;  // IP-Adresse des Gastes
        const userAgent = req.headers["user-agent"]; // Browser-Informationen

        const newGuest = await Guest.create({
            ipAddress,
            userAgent,
        });
        res.status(201).json({
            success: true,
            message: "Guest visit recorded successfully",
            data: newGuest,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to record guest visit",
            error: error.message,
        });
    }
};

// Controller-Funktion, um die Anzahl der Gäste anzuzeigen

export const getGuestCount = async (req, res) => {
    try {
        const guestCount = await Guest.countDocuments();
        res.status(200).json({
            success: true,
            count: guestCount,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch guest count",
            error: error.message,
        });
    }
}; 
import { Schema, model } from "mongoose";

const guestSchema = new Schema(
    {
        ipAddress: {
            /* speichert die IP-Adresse des Gastes */
            type: String,
            required: true,
        },
        userAgent: {
            /* speichert den Browser-oder Gerätetyp des Gastes */
            type: String,
        },
        visitedAt: {
            /* Zeitstempel, wann der Gast die Seite besucht hat */
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true}  // erstellt automatisch "createdAt" und "updatedAt"
);

export const Guest = model("Guest", guestSchema);
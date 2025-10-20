import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

//into db

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
    res.setHeader("Access-Control-Allow-Methods", "PUT, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-api-key");

    // Handle preflight (OPTIONS) request
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method === "PUT") {
        try {
            const {
                name,
                email,
                phone,
                location,
                quote,
                energyConsumption,
                bill,
                apiKey,
            } = req.body;

            if (!apiKey) {
                return res.status(400).json({ error: "Missing API key" });
            }
            const client = await prisma.client.findUnique({
                where: { apiKey },
            });

            if (!client) {
                return res.status(403).json({ error: "Invalid API key" });
            }
            console.log(client.id);

            const newLead = await prisma.lead.create({
                data: {
                    name,
                    email,
                    phone,
                    location,
                    quote: Number(quote),
                    energyConsumption: Number(energyConsumption),
                    bill: bill,
                    clientId: client.id,
                },
            });

            console.log(newLead);

            return res.status(200).json({ success: true, data: newLead });
        } catch (error) {
            console.error("❌ Error inserting into DB:", error);
            return res.status(500).json({ error: "Database error" });
        }
    } else {
        return res.status(405).json({ error: "Method not allowed" });
    }
}

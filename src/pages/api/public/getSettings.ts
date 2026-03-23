import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "https://widget.solariq.app/");
    res.setHeader("Access-Control-Allow-Methods", "PUT, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-api-key");

    try {
        //check authentication
        const apiKey = req.query.apiKey as string;

        if (!apiKey) {
            return res.status(400).json({ error: "Missing API key" });
        }

        const settings = await prisma.client.findUnique({
            where: { apiKey: apiKey },
            select: {
                logo: true,
                backgroundColor: true,
                progresColor: true,
                progresShadowColor: true,
                textColor: true,
                LightTextColor: true,
                showAvgLine: true,
            },
        });

        return res.status(200).json(settings);
    } catch (err) {
        console.error("Error fetching settings:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}

// client db -> css 1 2 3 4 5, region

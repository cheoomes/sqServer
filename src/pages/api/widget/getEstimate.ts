import { getIrradiance } from "../../services/irradiance";
import type { NextApiRequest, NextApiResponse } from "next";

// annually / (local peak sun hours * 365) -> kw system

// divide by pannel watage, $2.50 - $4 per watt

const performanceRatio = 0.8;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // CORS headers
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight (OPTIONS) request
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    //error lng name
    if (req.method === "POST") {
        const { anualNeed, lng, lat } = req.body;
        const irradiance = await getIrradiance(lat, lng);

        res.status(200).json({ irradiance });
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }

    console.log("📩 API called:", res.status);
}

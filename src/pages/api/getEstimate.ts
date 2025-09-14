import { getIrradiance } from "../services/irradiance";
import type { NextApiRequest, NextApiResponse } from "next";

// annually / (local peak sun hours * 365) -> kw system

// divide by pannel watage, $2.50 - $4 per watt

const performanceRatio = 0.8;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const { anualNeed, lon, lat } = req.body;
        const irradiance = await getIrradiance(lat, lon);

        res.status(200).json({ irradiance });
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

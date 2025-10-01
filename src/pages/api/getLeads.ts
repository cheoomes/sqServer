import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { clientId } = req.query;

        if (!clientId || Array.isArray(clientId)) {
            return res.status(400).json({ message: "clientId is required" });
        }

        const leads = await prisma.lead.findMany({
            where: { clientId: Number(clientId) },
        });

        return res.status(200).json(leads);
    } catch (error) {
        console.error("Error fetching leads:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

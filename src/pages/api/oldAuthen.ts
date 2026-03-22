import { NextApiRequest, NextApiResponse } from "next";
//needs to be like this?
import * as cookie from "cookie";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.auth;

    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: number;
        };

        if (req.method === "GET") {
            const client = await prisma.client.findUnique({
                where: { id: decoded.id },
                select: {
                    logoUrl: true,
                    backgroundColor: true,
                    progresColor: true,
                    progresShadowColor: true,
                    textColor: true,
                    LightTextColor: true,
                    showAvgLine: true,
                },
            });

            if (!client)
                return res.status(404).json({ message: "Client not found" });

            return res.status(200).json(client);
        }
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

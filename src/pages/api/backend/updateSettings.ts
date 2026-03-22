import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/authentication";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "PUT") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        //authorization
        const user = verifyAuth(req);
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const settings = req.body;

        console.log(settings);

        const u = await prisma.client.update({
            where: { id: user.id },
            data: {
                logo: settings.logo,
                backgroundColor: settings.backgroundColor,
                progresColor: settings.progresColor,
                progresShadowColor: settings.progresShadowColor,
                textColor: settings.textColor,
                LightTextColor: settings.LightTextColor,
                showAvgLine: settings.showAvgLine,
            },
        });

        return res
            .status(200)
            .json({ message: "Settings updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error saving settings" });
    }
}

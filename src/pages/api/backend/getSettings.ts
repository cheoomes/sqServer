import { verifyAuth } from "@/lib/authentication";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

//allow cred's on request
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "GET")
        return res.status(405).json({ error: "Method not allowed" });

    //authorization
    const user = verifyAuth(req);
    if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const settings = await prisma.client.findUnique({
        where: { id: user.id },
        select: {
            // id: true,
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
}

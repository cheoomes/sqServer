import type { NextApiRequest, NextApiResponse } from "next";
import { verifyAuth } from "../../../lib/authentication";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const decoded = verifyAuth(req);

        console.log("\nauthenticated :)\n");

        return res.status(200).json({
            message: "Authenticated",
            user: decoded,
        });
    } catch (err: any) {
        return res.status(401).json({ message: err.message });
    }
}

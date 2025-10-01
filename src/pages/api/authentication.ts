import { NextApiRequest, NextApiResponse } from "next";
//needs to be like this?
import * as cookie from "cookie";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.auth;

    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        return res.status(200).json({
            message: "Authenticated",
            user: decoded,
        });
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

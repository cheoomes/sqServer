import { prisma } from "../../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import * as cookie from "cookie";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { email, password } = req.body;

    const client = await prisma.client.findUnique({ where: { email } });
    if (!client) {
        return res.status(401).json({ message: "Email not found" });
    }

    const valid = await bcrypt.compare(password, client.password);
    if (!valid) {
        return res.status(401).json({ message: "Wrong password" });
    }

    //sets authentication.
    const token = jwt.sign({ id: client.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
    });

    res.setHeader(
        "Set-Cookie",
        cookie.serialize("auth", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        })
    );

    return res.status(200).json({ success: true });
}

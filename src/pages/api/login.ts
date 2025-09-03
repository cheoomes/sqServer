import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

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

    //proof of login token
    const token = jwt.sign({ id: client.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
    });
    console.log(token);
    return res.status(200).json({ token });
}

import * as cookie from "cookie";
import jwt from "jsonwebtoken";

interface DecodedToken {
    id: number;
    iat: number;
    exp: number;
}

export default function verifyAuth(req: { headers: { cookie?: string } }) {
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.auth;

    if (!token) {
        throw new Error("Not authenticated");
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!,
        ) as DecodedToken;
        return decoded;
    } catch {
        throw new Error("Invalid or expired token");
    }
}

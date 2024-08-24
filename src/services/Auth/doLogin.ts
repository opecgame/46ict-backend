import { Response } from "express";
import { sign } from "jsonwebtoken";

export default function doLogin(res: Response, keyId: number) {
    const iss = process.env.JWT_ISS;
    const secret = process.env.JWT_SECRET ?? "AONA";
    const duration = process.env.JWT_DURATION_MS
        ? Number(process.env.JWT_DURATION_MS)
        : 604800000;
    const cookieName = process.env.COOKIE_NAME ?? "aona_token";

    const token = sign(
        {
            iss,
            sub: keyId,
            exp: Math.floor((Date.now() + duration) / 1000),
            iat: Math.floor(Date.now() / 1000),
        },
        secret
    );

    res.cookie(cookieName, token, {
        sameSite: "none",
        httpOnly: true,
        secure: true,
        maxAge: duration,
        path: "/",
    });

    return token
}
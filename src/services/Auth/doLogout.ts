import { Response } from "express";

export function doLogout(res: Response) {
    const cookieName = process.env.COOKIE_NAME ?? "aona_token";

    res.clearCookie(cookieName, {
        sameSite: "none",
        httpOnly: true,
        secure: true,
        path: "/"
    });
}
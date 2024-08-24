import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import doResponse from "../services/Response/doResponse";

export default function userMiddleware() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const cookieName = process.env.COOKIE_NAME ?? "aona_token";
        const secret = process.env.JWT_SECRET ?? "AONA";

        function reject() {
            return doResponse(res.status(401), {
                success: false,
                message: "Unauthorized",
            });
        }

        const token = req.cookies[cookieName] || req.headers.authorization;

        if (!token) {
            return reject();
        }

        let authId: number | null = null;

        try {
            const payload = verify(token, secret);
            if (!payload) {
                return reject();
            }
            authId = payload.sub as any as number;
        } catch (e) {
            return reject();
        }

        let user = await req.app.prisma.users.findFirst({
            where: {
                id: authId,
            },
        });

        // @ts-ignore
        req.user = user;

        next();
    };
}
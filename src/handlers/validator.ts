import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import doResponse from "../services/Response/doResponse";

export default function handleValidationResult(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    doResponse(res.status(400), {
        success: false,
        data: {
            errors: errors.array(),
        },
        message: errors
            .array()
            .map((e) => e.msg)
            .join(", "),
    });
}

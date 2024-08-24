import { Response } from "express";
import { MyResponseParam } from "../../interfaces/response.interface";

export default function doResponse(
    res: Response,
    {
        success = true,
        message = "ดำเนินการเรียบร้อย",
        data = undefined,
    }: MyResponseParam
) {
    return res.json({
        success,
        message,
        data,
    });
}
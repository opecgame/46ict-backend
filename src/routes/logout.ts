import { Router } from "express";
import doResponse from "../services/Response/doResponse";
import { doLogout } from "../services/Auth/doLogout";
import userMiddleware from "../middlewares/user";

const router = Router();

router.post("/", userMiddleware(), (req, res) => {
    doLogout(res);

    doResponse(res.status(200), {
        message: "ออกจากระบบเรียบร้อย",
    });
});

export default router;



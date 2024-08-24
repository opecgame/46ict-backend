import { Router } from "express";
import doResponse from "../services/Response/doResponse";
import doLogin from "../services/Auth/doLogin";
import { PostUserDto } from "../validations/user.dto";
import handleValidationResult from "../handlers/validator";
import userMiddleware from "../middlewares/user";

const router = Router();

router.get("/", userMiddleware(),(req, res) => {
    // @ts-ignore
    let temp = req.user;
    delete temp.password;
    doResponse(res.status(200), {
        success: true,
        // @ts-ignore
        data: temp,
    });
});


router.post("/", userMiddleware(),(req, res) => {
    // @ts-ignore
    let temp = req.user;
    delete temp.password;
    doResponse(res.status(200), {
        success: true,
        // @ts-ignore
        data: temp,
    });
});


export default router;

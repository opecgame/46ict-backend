import { Router } from "express";
import doResponse from "../../services/Response/doResponse";
import { PaginationQuery, PaginationOptionalQuery } from "../../validations/pagination.dto";
import { compareSync } from "bcrypt";
import handleValidationResult from "../../handlers/validator";
import userAdminMiddleware from "../../middlewares/admin";

const router = Router();



router.get("/", userAdminMiddleware(),(req, res) => {
    // @ts-ignore
    let temp = req.user;
    delete temp.password;
    doResponse(res.status(200), {
        success: true,
        // @ts-ignore
        data: temp,
    });
});


router.post("/", userAdminMiddleware(),(req, res) => {
    doResponse(res.status(200), {
        success: true,
        // @ts-ignore
        data: req.user,
    });
});




export default router;

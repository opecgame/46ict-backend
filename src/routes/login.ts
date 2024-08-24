import { Router } from "express";
import doResponse from "../services/Response/doResponse";
import doLogin from "../services/Auth/doLogin";
import { PostUserDto } from "../validations/user.dto";
import handleValidationResult from "../handlers/validator";
import { compareSync, hash } from "bcrypt";

const router = Router();

router.get("/", (req, res) => {
    doResponse(res.status(405), {
        success: false,
        message: "Method Not Allowed. Please use POST method instead.",
        data: {},
    });
});

// login
router.post("/", ...PostUserDto, handleValidationResult, async (req, res) => {
    const finduser = await req.app.prisma.users.findUnique({
        where: {
            username: req.body.username,
        },
    });

    if (!finduser) return doResponse(res.status(400), {
        success: false,
        message: "ชื่อผู้ใช้ หรือ รหัสผ่าน กรุณาลองใหม่อีกครั้ง",
    });


    console.log(req.body.password, finduser.password)
    let checkPassword = compareSync(req.body.password, finduser.password);
    
    if (!checkPassword) return doResponse(res.status(400), {
        success: false,
        message: "ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง",
    });

    let token = doLogin(res, finduser.id);

    doResponse(res, {
        success: true,
        message: `ยินดีต้อนรับ ${finduser.prefix}${finduser.firstname} ${finduser.lastname}!`,
        data: {
            token: token,
        }
    });
});


// forgot password
router.post("/forgot", async (req, res) => {
    const finduser = await req.app.prisma.users.findUnique({
        where: {
            username: req.body.username,
        },
    });

    if (!finduser) return doResponse(res.status(400), {
        success: false,
        message: "ไม่พบชื่อผู้ใช้นี้ในระบบ",
    });

    let otp = Math.floor(100000 + Math.random() * 900000).toString();
    await req.app.prisma.users.update({
        where: {
            id: finduser.id,
        },
        data: {
            otp,
            otpSendAt: new Date(),
        },
    });

    // Send OTP to user
    // await sendOTP(finduser.phone_number, otp);

    doResponse(res, {
        success: true,
        message: `ส่งรหัส OTP ไปยัง ${finduser.phone_number} เรียบร้อยแล้ว`,
    });
});


// forgot password
router.post("/forgotVerify", async (req, res) => {
    const finduser = await req.app.prisma.users.findUnique({
        where: {
            username: req.body.username,
        },
    });

    if (!finduser) return doResponse(res.status(400), {
        success: false,
        message: "ไม่พบชื่อผู้ใช้นี้ในระบบ",
    });

    if (finduser.otp !== req.body.otp) return doResponse(res.status(400), {
        success: false,
        message: "รหัส OTP ไม่ถูกต้อง",
    });

    // update new pass
    let password = await hash(req.body.password, 10);
    await req.app.prisma.users.update({
        where: {
            id: finduser.id,
        },
        data: {
            password,
        },
    });

    doResponse(res, {
        success: true,
        message: `เปลี่ยนรหัสผ่านใหม่เรียบร้อยแล้ว`,
    });
});



export default router;

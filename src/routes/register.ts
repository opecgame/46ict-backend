import { Router } from "express";
import doResponse from "../services/Response/doResponse";
import doLogin from "../services/Auth/doLogin";
import { PostUserRegistedDto } from "../validations/user.dto";
import handleValidationResult from "../handlers/validator";
import { compareSync, hash } from "bcrypt";
import axios from "axios";

const router = Router();

router.get("/", (req, res) => {
    doResponse(res.status(405), {
        success: false,
        message: "Method Not Allowed. Please use POST method instead.",
        data: {},
    });
});

// login
router.post("/", ...PostUserRegistedDto, handleValidationResult, async (req, res) => {
    const finduser = await req.app.prisma.users.findUnique({
        where: {
            username: req.body.username,
        },
    });

    if (finduser) return doResponse(res.status(400), {
        success: false,
        message: "ชื่อผู้ใช้นี้มีอยู่ในระบบแล้ว",
    });

    let hashPassword = await hash(req.body.password, 12);

    // Send OTP to user
    let otp = Math.floor(100000 + Math.random() * 900000).toString()
    await sendOTP(req.body.phone_number, otp);
    let user = await req.app.prisma.users.create({
        data: {
            username: req.body.username,
            password: hashPassword,
            prefix: req.body.prefix,
            firstname: req.body.firstname,
            lastname: req.body.lastname,

            phone_number: req.body.phone_number,
            otp,
            isVerified: false,
            otpSendAt: new Date(),

            isAdmin: false,
        },
    });

    // create token and response
    let token = doLogin(res, user.id);
    
    doResponse(res, {
        success: true,
        message: `สมัครสมาชิกเรียบร้อยแล้ว`,
        data: {
            token: token,
        }
    });

});


router.post("/resendOTP", handleValidationResult, async (req, res) => {

    let user = await req.app.prisma.users.findUnique({
        where: {
            username: req.body.username,
        },
    });

    if (!user) return doResponse(res.status(400), {
        success: false,
        message: "ไม่พบผู้ใช้นี้ในระบบ",
    });

    // CheckDateTime ถ้ามีการส่ง OTP มากกว่า 1 ครั้งใน 1 นาที
    let now = new Date();
    let diff = Math.abs(now.getTime() - user.otpSendAt.getTime());
    let minutes = Math.floor(diff / 60000);
    if (minutes < 1) return doResponse(res.status(400), {
        success: false,
        message: "กรุณารอ 1 นาทีก่อนส่ง OTP อีกครั้ง",
    });

    // Update OTP and OTP Send At
    let otp = Math.floor(100000 + Math.random() * 900000).toString();
    await req.app.prisma.users.update({
        where: {
            id: user.id,
        },
        data: {
            otp: otp,
            otpSendAt: now,
        },
    });

    // Send OTP to user
    await sendOTP(user.phone_number, otp);


    doResponse(res, {
        success: true,
        message: `ส่ง OTP ใหม่เรียบร้อยแล้ว`,
        data: {
        }
    });

});


// validate otp after register
router.post("/validateOTP", handleValidationResult, async (req, res) => {

    let user = await req.app.prisma.users.findUnique({
        where: {
            username: req.body.username,
        },
    });

    if (!user) return doResponse(res.status(400), {
        success: false,
        message: "ไม่พบผู้ใช้นี้ในระบบ",
    });

    if (user.otp !== req.body.otp) return doResponse(res.status(400), {
        success: false,
        message: "รหัส OTP ไม่ถูกต้อง",
    });

    await req.app.prisma.users.update({
        where: {
            id: user.id,
        },
        data: {
            isVerified: true
        },
    });

    // create token and response
    let token = doLogin(res, user.id);
    
    doResponse(res, {
        success: true,
        message: `ยืนยัน OTP เรียบร้อยแล้ว`,
        data: {
        }
    });

});


async function sendOTP(phone_number: string, otp: string) {
    if (!phone_number.match(/^0[0-9]{9}$/)) {
        throw new Error("Invalid phone_number format");
    }

    phone_number = phone_number.replace(/^0/, "66");

    console.log(`Send OTP to ${phone_number}: ${otp}`);
    let check = await axios.post(process.env.SMS_API ?? "", {
        "phone": phone_number,
        "password": "",
        "sender": "AONA",
        "msg": `[MUSICSHOP] OTP ของคุณคือ ${otp}`
    }, {
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "OpecZBot/1.0 (t0NpwQ$epY^puRoh&j6s64&r*^0zMV269G0EW*mH$LNMuI9W50)"
        }
    })

    return check.data;
}


export default router;

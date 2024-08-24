import { body } from "express-validator";

export const PostUserDto = [
    body("username")
        .isString()
        .withMessage("ชื่อผู้ใช้ต้องเป็นตัวอักษร")

        .isLength({
            max: 255,
        })
        .withMessage(
            "ชื่อผู้ใช้ต้องมีความยาวน้อยกว่า 255 ตัวอักษร"
        ),
    body("password")
        .isString()
        .withMessage("รหัสผ่านต้องเป็นตัวอักษร")

        .isLength({
            max: 255,
        })
        .withMessage(
            "รหัสผ่านต้องมีความยาวน้อยกว่า 255 ตัวอักษร"
        ),
];

export const PostUserRegistedDto = [
    body("username")
        .isString()
        .withMessage("ชื่อผู้ใช้ต้องเป็นตัวอักษร")

        .isLength({
            max: 255,
        })
        .withMessage(
            "ชื่อผู้ใช้ต้องมีความยาวน้อยกว่า 255 ตัวอักษร"
        ),
    body("password")
        .isString()
        .withMessage("รหัสผ่านต้องเป็นตัวอักษร")

        .isLength({
            max: 255,
        })
        .withMessage(
            "รหัสผ่านต้องมีความยาวน้อยกว่า 255 ตัวอักษร"
        ),
    body("prefix")
        .isString()
        .withMessage("คำนำหน้าต้องเป็นตัวอักษร")

        .isLength({
            max: 255,
        })
        .withMessage(
            "คำนำหน้าต้องมีความยาวน้อยกว่า 255 ตัวอักษร"
        ),
    body("firstname")
        .isString()
        .withMessage("ชื่อจริงต้องเป็นตัวอักษร")

        .isLength({
            max: 255,
        })
        .withMessage(
            "ชื่อจริงต้องมีความยาวน้อยกว่า 255 ตัวอักษร"
        ),
    body("lastname")
        .isString()
        .withMessage("นามสกุลต้องเป็นตัวอักษร")

        .isLength({
            max: 255,
        })
        .withMessage(
            "นามสกุลต้องมีความยาวน้อยกว่า 255 ตัวอักษร"
        ),
    body("phone_number")
        .isString()
        .withMessage("เบอร์โทรศัพท์ต้องเป็นตัวอักษร")

        .isLength({
            max: 10,
        })
        .withMessage(
            "เบอร์โทรศัพท์ต้องมีความยาวน้อยกว่า 10 ตัวอักษร"
        )

        .isMobilePhone("th-TH")
        .withMessage("เบอร์โทรศัพท์ไม่ถูกต้อง"),

];



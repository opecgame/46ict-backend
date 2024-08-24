import { body } from "express-validator";

export const PostProductDto = [
    body("name")
        .isString()
        .withMessage("ชื่อสินค้าต้องเป็นตัวอักษร")

        .isLength({
            max: 255,
        })
        .withMessage(
            "ชื่อสินค้าต้องมีความยาวน้อยกว่า 255 ตัวอักษร"
        ),
    body("description")
        .isString()
        .withMessage("รายละเอียดต้องเป็นตัวอักษร")

        .isLength({
            max: 255,
        })
        .withMessage(
            "รายละเอียดต้องมีความยาวน้อยกว่า 255 ตัวอักษร"
        ),
        // price image stock
    body("price")
        .isNumeric()
        .withMessage("ราคาต้องเป็นตัวเลข"),

    body("stock")
        .isNumeric()
        .withMessage("สต๊อคต้องเป็นตัวเลข"),

    body("image")
        .isString()
        .withMessage("รูปภาพต้องเป็นตัวอักษร")
        
        .isLength({
            max: 255,
        })
        .withMessage(
            "ชื่อสินค้าต้องมีความยาวน้อยกว่า 255 ตัวอักษร"
        ),
];
import { query } from "express-validator";

export const PaginationQuery = [
    query("limit")
        .notEmpty()
        .withMessage("โปรดแนบ limit ใน query")

        .isNumeric()
        .withMessage("limit ต้องเป็นตัวเลข")

        .custom((val) => Number(val) >= 1 && Number(val) <= 1000)
        .withMessage("limit จะต้องมากกว่า 1 และไม่น้อยกว่า 1000"),

    query("page")
        .notEmpty()
        .withMessage("โปรดแนบ page ใน query")

        .isNumeric()
        .withMessage("page ต้องเป็นตัวเลข")

        .custom((val) => Number(val) >= 0)
        .withMessage("page จะต้องไม่น้อยกว่า 0"),
];

export const PaginationOptionalQuery = [
    query("limit")
        .optional()

        .isNumeric()
        .withMessage("limit ต้องเป็นตัวเลข")

        .custom((val) => Number(val) >= 1 && Number(val) <= 1000)
        .withMessage("limit จะต้องมากกว่า 1 และไม่น้อยกว่า 1000"),

    query("page")
        .optional()

        .isNumeric()
        .withMessage("page ต้องเป็นตัวเลข")

        .custom((val) => Number(val) >= 0)
        .withMessage("page จะต้องไม่น้อยกว่า 0"),
];
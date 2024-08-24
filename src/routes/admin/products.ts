import { Router } from "express";
import doResponse from "../../services/Response/doResponse";
import { PaginationQuery, PaginationOptionalQuery } from "../../validations/pagination.dto";
import { compareSync } from "bcrypt";
import handleValidationResult from "../../handlers/validator";
import userAdminMiddleware from "../../middlewares/admin";
import { PostProductDto } from "../../validations/products.dto";

const router = Router();



router.get("/", userAdminMiddleware(), ...PaginationQuery, handleValidationResult, async (req, res) => {
    
    const { limit, page, order_by, where } = req.query;

    const _order_by = queryToJSON(order_by, []);
    const _where = queryToJSON(where, {});

    const whereQuery: any = {};

    if (_where.id) {
        if (!isNaN(Number(_where.id))) {
            whereQuery.id = Number(_where.id);
        }
    }

    if (_where.search) {
        whereQuery.OR = [
            {
                name: { contains: _where.search.trim() },
            },
            {
                description: { contains: _where.search.trim() },
            },
            {
                price: { contains: _where.search.trim() },
            },
        ];
    }


    const [products, total] = await Promise.all([
        req.app.prisma.products.findMany({
            where: whereQuery,
            orderBy: _order_by,
            ...getPaginationOptions(limit, page),
        }),
        req.app.prisma.products.count({
            where: whereQuery,
        }),
    ]);


    doResponse(res, {
        success: true,
        data: {
            data: products,
            total,
        },
    });
});

// Create Update Patch
router.post("/",  userAdminMiddleware(), ...PostProductDto, handleValidationResult, async (req, res) => {
    const { name, description, price, stock, image, category } = req.body;

    // if (!name || !description || !price || !stock || !image || !category) {
    //     return doResponse(res.status(400), {
    //         success: false,
    //         message: "กรุณากรอกข้อมูลให้ครบถ้วน",
    //     });
    // }

    const product = await req.app.prisma.products.create({
        data: {
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            image,
        },
    });

    doResponse(res, {
        success: true,
        message: "เพิ่มสินค้าเรียบร้อย",
        data: product,
    });
});

router.get("/:id", userAdminMiddleware(), async (req, res) => {
    // get product by id
    const product = await req.app.prisma.products.findUnique({
        where: {
            id: Number(req.params.id),
        },
    });

    if (!product) {
        return doResponse(res.status(404), {
            success: false,
            message: "ไม่พบข้อมูลสินค้า",
        });
    }

    doResponse(res, {
        success: true,
        data: product,
    });
});

router.patch("/:id", userAdminMiddleware(), ...PostProductDto, handleValidationResult, async (req, res) => {
    const { name, description, price, stock, image } = req.body;

    const product = await req.app.prisma.products.findUnique({
        where: {
            id: Number(req.params.id),
        },
    });

    if (!product) {
        return doResponse(res.status(404), {
            success: false,
            message: "ไม่พบข้อมูลสินค้า",
        });
    }

    const updateProduct = await req.app.prisma.products.update({
        where: {
            id: Number(req.params.id),
        },
        data: {
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            image,
        },
    });

    doResponse(res, {
        success: true,
        message: "แก้ไขสินค้าเรียบร้อย",
        data: updateProduct,
    });
});




router.delete("/:id", userAdminMiddleware(), handleValidationResult, async (req, res) => {

    const product = await req.app.prisma.products.findUnique({
        where: {
            id: Number(req.params.id),
        },
    });

    if (!product) {
        return doResponse(res.status(404), {
            success: false,
            message: "ไม่พบข้อมูลสินค้า",
        });
    }

    const updateProduct = await req.app.prisma.products.delete({
        where: {
            id: Number(req.params.id),
        }
    });

    doResponse(res, {
        success: true,
        message: "ลบสินค้าเรียบร้อย",
        // data: updateProduct,
    });
});



export default router;


function queryToJSON(query: any, defaultValue = {}): any {
    let _query = defaultValue;
    try {
        _query = JSON.parse(query);
    } catch (e) {}
    return _query;
}

function getPaginationOptions(limit: any, page: any): any {
    return {
        skip: Number(limit) * Number(page),
        take: Number(limit)
    }
}
import { Router } from "express";
import doResponse from "../services/Response/doResponse";
import doLogin from "../services/Auth/doLogin";
import { PostUserDto } from "../validations/user.dto";
import handleValidationResult from "../handlers/validator";
import userMiddleware from "../middlewares/user";
import { PaginationQuery } from "../validations/pagination.dto";

const router = Router();

router.get("/", ...PaginationQuery, handleValidationResult, async (req, res) => {
    
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


router.get("/:id", async (req, res) => {
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
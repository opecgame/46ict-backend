
import { Router } from "express";
import doResponse from "../../services/Response/doResponse";
import { PaginationQuery, PaginationOptionalQuery } from "../../validations/pagination.dto";
import { compareSync, hash } from "bcrypt";
import {Mutex} from 'async-mutex';
const mutex = new Mutex();
const router = Router();


// router.get(
//     "/",
//     userAdminMiddleware(),
//     ...PaginationQuery,
//     handleValidationResult,
//     async (req, res) => {
//         const { limit, page, order_by, where } = req.query;

//         const _order_by = queryToJSON(order_by, []);
//         const _where = queryToJSON(where, {});

//         const whereQuery: any = {};

//         if (_where.id) {
//             if (!isNaN(Number(_where.id))) {
//                 whereQuery.id = Number(_where.id);
//             }
//         }
//         if (_where.firstNameOrLastName) {
//             whereQuery.OR = [];
//             (_where.firstNameOrLastName.trim().split(" ")).forEach((a:any) => {
//                 whereQuery.OR.push({
//                     firstName: { contains: a },
//                 })
//                 whereQuery.OR.push({
//                     lastName: { contains: a },
//                 })
//             });
//         }

//         if (_where.search) {
//             whereQuery.OR = [
//                 {
//                     firstName: { contains: _where.search.trim() },
//                 },
//                 {
//                     lastName: { contains: _where.search.trim() },
//                 }
//             ];
//         }

//         const [admins, total] = await Promise.all([
//             req.app.prisma.admins.findMany({
//                 where: whereQuery,
//                 orderBy: _order_by,
//                 ...getPaginationOptions(limit, page),
//             }),
//             req.app.prisma.admins.count({
//                 where: whereQuery,
//             }),
//         ]);


//         doResponse(res, {
//             success: true,
//             data: {
//                 data: admins,
//                 total,
//             },
//         });
//     }
// );



// router.get(
//     "/:id",
//     userAdminMiddleware(),
//     ...PaginationQuery,
//     handleValidationResult,
//     async (req, res) => {
//         let adminFind = await req.app.prisma.admins.findFirst({
//             where: {
//                 id: Number(req.params.id)
//             },
//         })

//         if (!adminFind) return doResponse(res.status(404), {
//             success: false,
//             message: "ไม่พบข้อมูลแอดมิน"
//         });

//         doResponse(res, {
//             success: true,
//             data: adminFind,
//         });
//     }
// );




// router.patch(
//     "/:id",
//     userAdminMiddleware(),
//     ...PostAdminDataDto,
//     handleValidationResult,
//     async (req, res) => {
//         let adminFind = await req.app.prisma.admins.findFirst({
//             where: {
//                 id: Number(req.params.id)
//             },
//         })

//         if (!adminFind) return doResponse(res.status(404), {
//             success: false,
//             message: "ไม่พบข้อมูลแอดมิน"
//         });

//         let newPassword = null;
//         if (req.body.password) {
//             newPassword = await hash(req.body.password, 12);
//         }

//         let adminUpdate = await req.app.prisma.admins.update({
//             where: {
//                 id: Number(req.params.id)
//             },
//             data: {
//                 prefix: req.body.prefix,
//                 firstName: req.body.firstName,
//                 lastName: req.body.lastName,
//                 password: newPassword ? newPassword : adminFind.password
//             }
//         })

//         doResponse(res, {
//             success: true,
//             message: "อัพเดตข้อมูลแอดมินสำเร็จ",
//             data: adminUpdate,
//         });
//     }
// );


// router.delete(
//     "/:id",
//     userAdminMiddleware(),
//     async (req, res) => {
//         let adminFind = await req.app.prisma.admins.findFirst({
//             where: {
//                 id: Number(req.params.id)
//             },
//         })

//         if (!adminFind) return doResponse(res.status(404), {
//             success: false,
//             message: "ไม่พบข้อมูลแอดมิน"
//         });

//         let isLastAdmin = await req.app.prisma.admins.count();

//         if (isLastAdmin === 1) return doResponse(res.status(400), {
//             success: false,
//             message: "ไม่สามารถลบแอดมินได้เนื่องจากเป็นแอดมินคนสุดท้าย"
//         });

//         let adminDelete = await req.app.prisma.admins.delete({
//             where: {
//                 id: Number(req.params.id)
//             }
//         })

//         doResponse(res, {
//             success: true,
//             data: adminDelete,
//         });
//     }
// );


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
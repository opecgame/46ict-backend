import { Router } from "express";
import adminsController from "./admins";
import productsController from "./products";
import atMeController from "./@me";

const router = Router();

router.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/plain").send(
        [
            `This is "ADMIN ${process.env.SERVICE_NAME}" service for Phuket Wittayalai School`,
            "Developed by AONA (Software House) for Phuket Wittayalai School",
        ].join("\n\n")
    );
});

router.use("/admins", adminsController);
router.use("/products", productsController);
router.use("/@me", atMeController);


export default router;

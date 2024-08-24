import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/plain").send(
        [
            `This is "${process.env.SERVICE_NAME}" service for 46ICT Team Phuket Wittayalai School`,
            "Developed by OpecZ for 46ICT Team Phuket Wittayalai School",
        ].join("\n\n")
    );
});

export default router;

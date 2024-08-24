import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors"
import fileUpload from "express-fileupload"
import Logger from "./libs/Logger";
import { PrismaClient } from "@prisma/client";
const app = express();

app.isListening = false;
app.log = new Logger(process.env.SERVICE_NAME ?? "App");
app.prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors()
);
app.use(fileUpload({
    limits: { fileSize: 100 * 1024 * 1024 }
}))

app.options("*",
    cors({
        origin: process.env.CORS_ORIGINS?.split(","),
        credentials: process.env.CORS_CREDENTIALS === "1",
        methods: process.env.CORS_METHODS?.split(","),
        allowedHeaders: process.env.CORS_ALLOW_HEADERS?.split(","),
    })
);

app.use((req, res, next) => {
    res.set({
        'X-Powered-By': ['OpecZ', 'AONA Co., Ltd.'],
        'X-Service': [`${process.env.SERVICE_NAME}`],
        'Server': 'AONA Co., Ltd.'
    })
    next()
});

export default app;

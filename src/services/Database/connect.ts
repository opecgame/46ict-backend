import { Application } from "express";

export default async function connectDatabase(app: Application) {
    const startConnect = Date.now();
    app.log.info("Starting connect to database...");
    await app.prisma.$connect();
    app.log.success(`Connected to database in ${Date.now() - startConnect}ms`);
}
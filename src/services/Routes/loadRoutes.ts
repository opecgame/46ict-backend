import { Application } from "express";
import { readdirSync } from "fs";
import { join } from "path";
import doResponse from "../Response/doResponse";

const ROUTES_PATH = join(__dirname, "../../routes");
const INDEX_PREFIX = "__index__";

export default function loadRoutes(app: Application) {
    const files = readdirSync(ROUTES_PATH);

    for (const file of files) {
        const fullPath = join(__dirname, `../../routes/${file}`);
        const router = require(fullPath).default;
        let path;
        if (file.startsWith(INDEX_PREFIX)) {
            path = "/";
        } else {
            path = `/${file.split(".").at(0)}`;
        }
        app.use(path, router);
        app.log.info(`Loaded ${path}`)
    }

    app.use((req, res) => {
        doResponse(res.status(404), {
            success: false,
            message: "Not found"
        });
    })
}
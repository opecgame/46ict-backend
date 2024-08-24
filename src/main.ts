import dotenv from "dotenv";
dotenv.config();

// Init express extends interfaces
import "./interfaces/express.interface";

import app from "./app";
import loadRoutes from "./services/Routes/loadRoutes";
import connectDatabase from "./services/Database/connect";

async function bootstrap() {
    loadRoutes(app);
    await connectDatabase(app);
    app.listen(process.env.SERVER_PORT, () => {
        app.log.success(`Server started on port ${process.env.SERVER_PORT}!`);
    })
}




process.on('unhandledRejection', (reason: any, p) => {
    console.log('\n=== unhandled Rejection ==='.toUpperCase())
    console.log('Promise: ', p , 'Reason: ', reason.stack ? reason.stack : reason);
    console.log('=== unhandled Rejection ==='.toUpperCase())
});
process.on("uncaughtException", (err, origin) => {
    console.log('\n=== uncaught Exception ==='.toUpperCase())
    console.log('Origin: ', origin, 'Exception: ', err.stack ? err.stack : err)
    console.log('=== uncaught Exception ==='.toUpperCase())
});
process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('\n=== uncaught Exception Monitor ==='.toUpperCase())
    console.log('Origin: ', origin, 'Exception: ', err.stack ? err.stack : err)
    console.log('=== uncaught Exception Monitor ==='.toUpperCase())
});
process.on('beforeExit', (code) => {
    console.log('\n=== before Exit ==='.toUpperCase())
    console.log('Code: ', code);
    console.log('=== before Exit ==='.toUpperCase())
});
process.on('exit', (code) => {
    console.log('\n=== exit ==='.toUpperCase())
    console.log('Code: ', code)
    console.log('=== exit ==='.toUpperCase())
});
process.on('multipleResolves', (type, promise, reason) => {
    console.log('\n=== multiple Resolves ==='.toUpperCase())
    console.log(type, promise, reason)
    console.log('=== multiple Resolves ==='.toUpperCase())
});

bootstrap();

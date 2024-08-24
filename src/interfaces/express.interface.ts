import { PrismaClient } from "@prisma/client";
import Logger from "../libs/Logger";

export {}

declare global {
    namespace Express {
        export interface Application {
            isListening: boolean;
            log: Logger;
            prisma: PrismaClient;
        }
        export interface Request {
            
        }
    }
}
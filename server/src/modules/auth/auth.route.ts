import express from "express";
import { processRequestBody } from "zod-express-middleware";
import { loginSchema } from "./auth.schema";
import { loginHandler } from "./auth.controller";
import tryCatchHandler from "../../utils/try-catch";


const router = express.Router();

router.post("/login", processRequestBody(loginSchema.body), tryCatchHandler(loginHandler));

export default router;
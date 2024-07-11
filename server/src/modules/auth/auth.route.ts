import express from "express";
import { processRequestBody } from "zod-express-middleware";
import { loginSchema, registerSchema } from "./auth.schema";
import * as auth from "./auth.controller";
import tryCatchHandler from "../../utils/try-catch";
import validateZod from "../../middlewares/validate-zod";


const router = express.Router();

router.post("/login", validateZod(loginSchema.body), tryCatchHandler(auth.loginHandler));
router.post("/register", validateZod(registerSchema.body), tryCatchHandler(auth.registerHandler));

export default router;
import express from "express";
import { processRequestBody } from "zod-express-middleware";


const router = express.Router();

//router.post("/login", processRequestBody(loginSchema.body), loginHandler);

export default router;
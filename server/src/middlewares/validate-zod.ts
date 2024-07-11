import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { UnprocessableEntity } from "../exceptions/unprocessable-entity";

const validateZod = (schema: any) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            return next(new UnprocessableEntity("Validation error", error));
        }
};

export default validateZod;
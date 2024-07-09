import { Request, Response } from "express";
import { LoginBody } from "./auth.schema";
import { findUserByEmail } from "../users/users.service";
import { comparePassword, signJwt } from "./auth.utils";
import { UnauthorizedException } from "../../exceptions/unauthorized";

export const loginHandler = async (req: Request<{}, {}, LoginBody>, res: Response) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user || await comparePassword(password, user.password)) {
        throw new UnauthorizedException("Invalid email or password")
    }

    const token = signJwt(user);

    return res.success("Login successful", { token });
}
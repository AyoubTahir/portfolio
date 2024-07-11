import { Request, Response } from "express";
import { LoginBody, RegisterBody } from "./auth.schema";
import { createUser, findUserByEmail } from "../users/users.service";
import { buildTokens, comparePassword, hashPassword, setTokensToCookie } from "./auth.utils";
import { UnauthorizedException } from "../../exceptions/unauthorized";
import { ConflictException } from "../../exceptions/conflict";
import { excludeFields } from "../../utils/helpers";

export const loginHandler = async (req: Request<{}, {}, LoginBody>, res: Response) => {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user || !await comparePassword(password, user.password)) {
        throw new UnauthorizedException("Invalid email or password")
    }

    const {accessToken, refreshToken} = buildTokens({id: user.id, tokenVersion: user.tokenVersion})

    setTokensToCookie(res, accessToken, refreshToken)

    return res.success("Login successful", excludeFields(user, "password"));
}

export const registerHandler = async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    const { fname, lname, email, password } = req.body;

    const user = await findUserByEmail(email);

    if (user) {
        throw new ConflictException("Email already exists");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await createUser({
        name: `${fname} ${lname}`,
        password: hashedPassword,
        email,
        tokenVersion: null,
    });

    return res.success("User Registered successfully", excludeFields(newUser, "password"));
}
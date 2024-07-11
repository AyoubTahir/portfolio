import { User } from "./users.model";
import type { User as IUser } from '@prisma/client'

export async function findUserByEmail(email: string) {
    return User.findUnique({where: {email: email}});
}

export async function createUser(user: Omit<IUser, 'id'|'createdAt'|'updatedAt'> ) {
    return User.create({data: user});
}
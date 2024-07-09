import { User } from "./users.model";

export async function findUserByEmail(email: string) {
    return User.findUnique({where: {email: email}});
}
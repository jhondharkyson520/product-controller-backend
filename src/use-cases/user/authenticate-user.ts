import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../repositories/user/user-repository";

dotenv.config();

export class AuthenticateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);
        if(!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            throw new Error('Password incorrect');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );

        return {user, token}
    }
}

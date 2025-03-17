import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
import { UserRepository } from '../../repositories/user/user-repository';

dotenv.config();

export class UpdateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string, name: string, email: string, password: string) {
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            const updatedUser = await this.userRepository.update(id, {name, email, password: hashPassword});
            return updatedUser;
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            throw new Error("Error to update user.");
        }
    }
}

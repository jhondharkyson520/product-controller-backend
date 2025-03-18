import { UserRepository } from '../../repositories/user/user-repository';

export class DeleteUser {
    constructor(private userRepository: UserRepository) {}

    async execute(id: string) {
        try {
            const deletedUser = await this.userRepository.delete(id);
            if (!deletedUser) {
                throw new Error("User not found.");
            }
            return deletedUser;
        } catch (error: any) {
            console.error("Erro ao deletar o usuário:", error);
            if (error.code === 'P2025') {
                return null;
            }
            throw new Error("Error delete user.");
        }
    }
}

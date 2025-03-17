import { UserRepository } from '../../repositories/user/user-repository';

export class GetAllUsers {
    constructor(private userRepository: UserRepository) {}

    async execute() {        
        const user = await this.userRepository.findAll();
        return {user};
    }
}

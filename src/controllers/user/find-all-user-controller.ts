import { Request, Response } from 'express';
import { PrismaUserRepository } from '../../repositories/user/prisma-user-repository';
import { FindAllUsers } from '../../use-cases/user/find-all-users';

const userRepository = new PrismaUserRepository
const createUser = new FindAllUsers(userRepository);

export const findAllUsersController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {user} =  await createUser.execute();

        return res.status(200).json({
            sucess: 'Users list',
            user
        });
    } catch(error) {
        console.error(error);        
        return res.status(500).json({error: 'Internal Server Error'});        
    }
}

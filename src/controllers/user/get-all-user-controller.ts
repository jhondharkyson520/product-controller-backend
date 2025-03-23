import { Request, Response } from 'express';
import { PrismaUserRepository } from '../../repositories/user/prisma-user-repository';
import { GetAllUsers } from '../../use-cases/user/get-all-users';

const userRepository = new PrismaUserRepository;
const findAllUsers = new GetAllUsers(userRepository);

export const getAllUsersController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {user} =  await findAllUsers.execute();

        return res.status(200).json({
            sucess: 'Users list',
            user
        });
    } catch(error) {
        //console.error(error);        
        return res.status(500).json({error: 'Internal Server Error'});        
    }
}

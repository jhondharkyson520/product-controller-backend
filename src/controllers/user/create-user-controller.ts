
import { Request, Response } from 'express';
import { PrismaUserRepository } from '../../repositories/user/prisma-user-repository';
import { CreateUser } from '../../use-cases/user/create-user';

const userRepository = new PrismaUserRepository
const createUser = new CreateUser(userRepository);

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {name, email, password} = req.body;
        const {user, token} =  await createUser.execute(name, email, password);

        return res.status(201).json({
            sucess: 'User created',
            user: {id: user.id, name: user.name, email: user.email},
            token
        });
    } catch(error) {
        console.error(error);        
        return res.status(500).json({error: 'Internal Server Error'});        
    }
}

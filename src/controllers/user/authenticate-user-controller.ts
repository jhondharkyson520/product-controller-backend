import { PrismaUserRepository } from "../../repositories/user/prisma-user-repository"; 
import { AuthenticateUser } from "../../use-cases/user/authenticate-user";
import { Request, Response } from 'express';

const userRepository = new PrismaUserRepository();
const authenticateUser = new AuthenticateUser(userRepository);

export const authenticateUserController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {email, password} = req.body;
        const {user, token} =  await authenticateUser.execute(email, password);

        if(!user) {
            return res.status(401).json({error: 'Invalid credentials'});
        }

        return res.status(200).json({
            sucess: 'User authenticated',
            user: {id: user.id, name: user.name, email: user.email},
            token
        });
    } catch(error) {
        console.error(error);           
        return res.status(500).json({error: 'Internal Server Error'});        
    }
}

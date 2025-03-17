
import { Request, Response } from 'express';
import { PrismaUserRepository } from '../../repositories/user/prisma-user-repository';
import { UpdateUser } from '../../use-cases/user/update-user';

const userRepository = new PrismaUserRepository
const updateUser = new UpdateUser(userRepository);

export const updateUserController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {id} = req.params;
        const {name, email, password} = req.body;
        const user = await updateUser.execute(id, name, email, password);

        if (user) {
            return res.status(200).json({ 
                message: 'User update successfully', 
                user
            });
        }
        return res.status(404).json({ error: 'User not found' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

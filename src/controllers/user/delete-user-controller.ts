
import { Request, Response } from 'express';
import { PrismaUserRepository } from '../../repositories/user/prisma-user-repository';
import { DeleteUser } from '../../use-cases/user/delete-user';

const userRepository = new PrismaUserRepository
const deleteUser = new DeleteUser(userRepository);

export const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {id} = req.params;
        const deletedUser = await deleteUser.execute(id);

        if (deletedUser) {
            return res.status(200).json({ 
                message: 'User deleted successfully', 
                deletedUser
            });
        }
        return res.status(404).json({ error: 'User not found' });
    } catch (error: any) {
        console.error(error);
        if(error.message === 'Error delete user.'){
            return res.status(500).json({ error: 'Error deleting user' });
        } else if(error.message === 'User not found.') {
            return res.status(500).json({ error: 'User not found.' });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

import { Request, Response, Router } from "express";
import { createUserController } from "../controllers/user/create-user-controller";
import { authenticateUserController } from "../controllers/user/authenticate-user-controller";
import authenticateToken  from "../middlewares/authorization-routes";
import { getAllUsersController } from "../controllers/user/get-all-user-controller";
import { updateUserController } from "../controllers/user/update-user-controller";
import { deleteUserController } from "../controllers/user/delete-user-controller";

const routesUser = Router();
routesUser.post('/create', async (req, res) => {
    await createUserController(req, res);
});
routesUser.post('/login', async (req, res) => {
    await authenticateUserController(req, res);
});
routesUser.get('/all-users', authenticateToken, async (req, res) => {
  await getAllUsersController(req, res);
});
routesUser.put('/update/:id', authenticateToken, async (req, res) => {
  await updateUserController(req, res);
});
routesUser.delete('/delete/:id', authenticateToken, async (req, res) => {
  await deleteUserController(req, res);
});
routesUser.get('/hello', authenticateToken, (req: Request, res: Response) => {
    
  res.status(200).json({ message: 'Hello world' });
});
export default routesUser;

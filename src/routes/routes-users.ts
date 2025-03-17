import { Request, Response, Router } from "express";
import { createUserController } from "../controllers/user/create-user-controller";
import { authenticateUserController } from "../controllers/user/authenticate-user-controller";
import authenticateToken  from "../middlewares/authorization-routes";
import { findAllUsersController } from "../controllers/user/find-all-user-controller";

const routesUser = Router();
routesUser.post('/create', async (req, res) => {
    await createUserController(req, res);
});
routesUser.post('/login', async (req, res) => {
    await authenticateUserController(req, res);
});
routesUser.get('/all-users', authenticateToken, async (req, res) => {
  await findAllUsersController(req, res);
});
routesUser.get('/hello', authenticateToken, (req: Request, res: Response) => {
    
  res.status(200).json({ message: 'Hello world' });
});
export default routesUser;

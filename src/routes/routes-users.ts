import { Router } from "express";
import { createUserController } from "../controllers/user/create-user-controller";

const routesUser = Router();
routesUser.post('/create', async (req, res) => {
    await createUserController(req, res);
});

export default routesUser;

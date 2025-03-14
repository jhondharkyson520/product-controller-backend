import { Router } from "express";
import { createUserController } from "../controllers/user/create-user-controller";

const routes = Router();
routes.post('/create', createUserController);

export default routes;

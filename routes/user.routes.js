import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/userAuth.controller.js";

const userRouter = Router();

userRouter.post('/sign-up', signUp);

userRouter.post('/sign-in', signIn);

userRouter.post('/sign-out', signOut);

export default userRouter;
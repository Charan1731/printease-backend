import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/userAuth.controller.js";
import userMiddleware from "../middlewares/userMiddleware.js";

const userRouter = Router();

userRouter.post('/sign-up', signUp);

userRouter.post('/sign-in', signIn);

userRouter.post('/sign-out', signOut);

userRouter.get('/sample',userMiddleware, (req,res) => {
    res.json({message:"User Authenticated"})
});

export default userRouter;
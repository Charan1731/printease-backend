import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/userAuth.controller.js";
import userMiddleware from "../middlewares/userMiddleware.js";

const userRouter = Router();

userRouter.post('/sign-up', signUp);

userRouter.post('/sign-in', signIn);

userRouter.post('/sign-out', signOut);

userRouter.get('/sample',userMiddleware, (req,res) => {
    try{
        res.json({message:"User Authenticated", user: req.user})
    }catch(error){
        res.status(500).json({message:"Internal Server Error", error: error.message})
    }
});

export default userRouter;
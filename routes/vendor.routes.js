import { Router } from "express";
import { vendorSignIn, vendorSignOut, vendorSignUp } from "../controllers/vendorAuth.controller.js";
import vendorMiddleware from "../middlewares/vendorMiddleware.js";

const vendorRouter = Router();

vendorRouter.post('/sign-in', vendorSignIn);

vendorRouter.post('/sign-up', vendorSignUp);

vendorRouter.post('/sign-out', vendorSignOut);

vendorRouter.get('/sample',vendorMiddleware, (req,res) => {
    res.json({message:"Vendor Authenticated"})
});

export default vendorRouter;
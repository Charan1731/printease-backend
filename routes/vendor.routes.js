import { Router } from "express";
import { vendorSignIn, vendorSignOut, vendorSignUp } from "../controllers/vendorAuth.controller.js";

const vendorRouter = Router();

vendorRouter.post('/sign-in', vendorSignIn);

vendorRouter.post('/sign-up', vendorSignUp);

vendorRouter.post('/sign-out', vendorSignOut);

export default vendorRouter;
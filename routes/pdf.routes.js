import { Router } from "express";
import userMiddleware from "../middlewares/userMiddleware.js";
import { upload } from "../config/s3config.js";
import { getPDFById, getPDFs, uploadPDF } from "../controllers/pdf.controller.js";
import vendorMiddleware from "../middlewares/vendorMiddleware.js";

const pdfRouter = Router()

pdfRouter.post('/upload',userMiddleware,upload.single('pdf'),uploadPDF)

pdfRouter.get('/',vendorMiddleware,getPDFs)

pdfRouter.get('/:id',vendorMiddleware, getPDFById)

// pdfRouter.delete("/:id",vendorMiddleware,deletePDF)

export default pdfRouter
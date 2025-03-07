import { Router } from "express";
import userMiddleware from "../middlewares/userMiddleware.js";
import { upload } from "../config/s3config.js";
import { getPDFById, getUserPDFs, uploadPDF, vendorPDFs, updateStatus } from "../controllers/pdf.controller.js";
import vendorMiddleware from "../middlewares/vendorMiddleware.js";

const pdfRouter = Router()

pdfRouter.post('/upload',userMiddleware,upload.single('pdf'),uploadPDF)

pdfRouter.get('/',vendorMiddleware,vendorPDFs)

pdfRouter.get('/:id',userMiddleware, getUserPDFs)

pdfRouter.get('/:id',vendorMiddleware, getPDFById)

pdfRouter.put("/:id",vendorMiddleware,updateStatus)

// pdfRouter.delete("/:id",vendorMiddleware,deletePDF) 67c984a163fd166cff405986

export default pdfRouter
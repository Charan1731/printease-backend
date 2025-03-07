import PDF from '../models/pdfSchema.js';
import { z } from 'zod';
import countPages from '../utils/pages.js';

const pdfValidation = z.object({
    filename: z.string(),
    s3_url: z.string().url(),
    fileSize: z.number().optional(),
    mimeType: z.string().optional(),
    uploadedBy: z.string(),
    status: z.enum(['pending', 'processing', 'completed', 'failed']).optional()
});

export const uploadPDF = async (req, res) => {
    try {

        console.log(req.file)

        if(!req.file){
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const pages = await countPages(req.file.location);

        const newPDF = new PDF({
            filename: req.file.originalname,
            s3_url: req.file.location,
            fileSize: req.file.size,
            mimeType: req.file.mimetype,
            uploadedBy: req.user._id,
            pages:pages,
            status: 'pending'
        })

        console.log("Saving to database", newPDF)

        const saved = await newPDF.save();

        console.log("Saved sucessfully", saved)

        res.status(201).json({
            success: true,
            message: "PDF uploaded successfully!",
            data: saved
        });
        
    } catch (error) {
        console.log("Upload error: ", error)
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

export const vendorPDFs = async (req,res) => {
    try {

        const pdfs = await PDF.find({})

        res.status(200).json({
            success: true,
            data: pdfs
        })
        
    } catch (error) {
        console.log('Fetch error: ', error)
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

export const getUserPDFs = async (req,res) => {
    try {

        const pdfs = await PDF.find({
            uploadedBy: req.user._id
        })

        res.status(200).json({
            success: true,
            data: pdfs
        })
        
    } catch (error) {
        console.log('Fetch error: ', error)
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

export const getPDFById = async (req,res) => {
    try {

        const pdf = await PDF.find({
            _id: req.params.id,
        })

        console.log(pdf)

        if(!pdf){
            return res.status(400).json({
                success:false,
                message: "PDF not found"
            })
        }

        res.status(200).json({
            success: true,
            data: pdf
        })
        
    } catch (error) {
        console.log("Fetch error", error)
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

export const updateStatus = async (req, res) => {
    try {

        const id = req.params.id;

        const updatedPDF = await PDF.findByIdAndUpdate(id, {
            status: req.body.status
        }, {
            new: true
        })

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data: updatedPDF
        })
        
    } catch (error) {
        console.log("Update error", error)
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}
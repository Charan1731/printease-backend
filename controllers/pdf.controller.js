import PDF from '../models/pdfSchema.js';
import { z } from 'zod';

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

        console.log("mimetype : ", req.body.mimeType)

        const newPDF = new PDF({
            filename: req.file.originalname,
            s3_url: req.file.location,
            fileSize: req.file.size,
            mimeType: req.body.mimeType,
            uploadedBy: req.user._id,
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

export const getPDFs = async (req,res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const pdfs = await PDF.find({uploadedBy: req.user._id})
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)

        const total = await PDF.countDocuments({uploadedBy: req.user._id});

        res.status(200).json({
            success: true,
            data: {
                pdfs,
                totalPages: Math.ceil(total / limit),
                currentPage: page,
                totalItems: total
            }
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
            uploadedBy:req.user._id
        })

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
import mongoose from "mongoose"


const pdfSchema = new mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    s3_url:{
        type:String,
        required:true
    },
    fileSize:{
        type:Number
    },
    mimeType:{
        type:String,
        required: true
    },
    printType:{
        type:String,
        enum:['Black&White','Color','Lamination',]
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending'
    }
},{
    timestamps:true
})

// pdfSchema.pre('save', function(next){
//     if(!this.cost){

//     }
// })

const PDF = mongoose.model("PDF",pdfSchema)

export default PDF
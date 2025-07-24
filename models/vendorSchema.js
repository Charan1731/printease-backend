import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        default:'vendor',
        enum:['vendor']
    }
},{
    timestamps:true
})

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
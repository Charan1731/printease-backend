import jwt from "jsonwebtoken"

const userAuth = (req,res,next) => {
    try {
        
    } catch (error) {
       res.status(401).json({message:error.message})
    }
}
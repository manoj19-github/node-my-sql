import { NextFunction ,Request,Response} from "express";
import Models from "../../models"
const isEmailDuplicate=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const Admin=Models.Users
        const admin=await Admin.findOne({where:{email:req.body.email}})
        if(!!admin) return res.status(401).json({error:true,message:"sorry email is duplicate"})
        return next()

    }catch(err){
        console.log("errors in isEmailDuplicate : ",err)
        res.status(500).json({
            errors:true,
            message:"something went wrong"
        })
    }

    
}
export default isEmailDuplicate
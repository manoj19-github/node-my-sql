import {NextFunction, Request,Response} from "express"
import { validationResult } from "express-validator"
const checkValidator=(req:Request,res:Response,next:NextFunction)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
        return res.status(422).json({
            errors:true,
            message:errors.array()
        })
    return next()
}
export default checkValidator
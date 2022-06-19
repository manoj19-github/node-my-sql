import {Request,Response,ErrorRequestHandler} from "express"
import models from "../../models"
import generateString from "../../utils/generateString"
import bcrypt from "bcryptjs"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import jwtConfig from "../../config/jwt.config"
class AuthController{
    async signUpRequest(req:Request,res:Response){
        try{
            const UserModel=models.Users
            const errors=validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors:true,
                    message:errors.array()
                })
            }
            const genId:string=generateString()
            const newUser=new UserModel({
                id:genId,
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            const isUserCreated=await newUser.save()
            if(!!isUserCreated) return res.status(200).json({
                erros:false,
                message:"User signd up successfully "
            })

        }catch(errors){
            console.log("errors in signup controller : ",errors)
            return res.status(400).json({
                errors:true,
                message:errors
                
            })
        }


    }
    async signInRequest(req:Request,res:Response){
        try{
            const UserModel=models.Users
            const {email,password}=req.body;
            const isUser=await UserModel.findOne({where:{email:email}})
            console.log("isUser : ",isUser)
            if(!isUser) return res.status(404)
            .json({errors:true,message:"User not found !!"})
            console.log("password checker : ",password)
            console.log("password checker 2: ",isUser.password)
            console.log("jwtsecret : ",process.env.JWT_SECRET_KEY)
            const isPasswordValid=await bcrypt.compare(password,isUser.password as string)
            if(!isPasswordValid) return res.status(404).json({errors:true,message:"wrong credentials"})
            const userToken=await jwt.sign({id:isUser.id,email:isUser.email},process.env.JWT_SECRET_KEY as string,{expiresIn:"1d"})
            res.cookie("accessToken",userToken,{
                maxAge:1000*60*60*24, //1 days
                httpOnly:true
              })
            return res.status(200).json({
                errors:false,
                message:"signin successfully completed"
            })
        }catch(err){
            console.log("error in login contrl : ",err)
            return res.status(500).json({
                errors:true,
                message:"internal server error"
                
            })

        }
    }

}
const authController=new AuthController()
export default authController
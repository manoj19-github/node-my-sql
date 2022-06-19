import {Request,Response} from "express"
class PostController{
    async createPostRequest(req:Request,res:Response){
        const {title,desc,category,subject}=req.body
        
    }
}
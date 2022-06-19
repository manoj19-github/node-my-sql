import express,{Request,Response,Application} from "express" 
import morgan from 'morgan'
import * as  dotenv from "dotenv"
import helmet from "helmet"
import cors from  "cors"
import db from "./src/app/models"
import cookieParser from "cookie-parser"
import authRouter from "./src/routes/authRoutes"

dotenv.config()
class Server{
    private app:Application;
    private PORT:number;
    constructor(){
        
        this.app=express()
        
        this.PORT=!!process.env.PORT?+process.env.PORT:4000;
        this.middlewares();
        this.routes();
        this.listen();
    }
    private middlewares():void{
        this.app.use(express.json({limit:"1000mb"}))
        this.app.use(express.urlencoded({extended:true,limit:"1000mb"}))
        this.app.use(morgan("dev"))
        this.app.use(cors({ credentials: true, origin: true }));
        this.app.use(helmet())
        this.app.use(cookieParser())
        const PORT=process.env.port??4000;
        this.app.get('/', (_req: Request, res: Response) => {
        	res.send('<h1>Backend Server is Running ...</h1>');
        });

    }
    private routes():void{
        this.app.use("/app",authRouter)
        this.app.get('*', (_, res:Response) => res.status(404).json({ message: '404' }));

    }
    private listen():void{
        this.app.listen(this.PORT,()=>{
            db.sequelize.sync()
            console.log(`server is listening on port : ${this.PORT} `)
            console.log("dotenv",process.env.JWT_SECRET_KEY)
        })

    }
}

(()=>{
    const server= new Server()
})()

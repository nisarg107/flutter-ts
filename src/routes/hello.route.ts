import {Router,Request,Response} from "express";

const helloRouter = Router()

helloRouter.get("/",(req:Request,res:Response)=>{
    res.json({ "data": "Server is live" })
});

export default helloRouter
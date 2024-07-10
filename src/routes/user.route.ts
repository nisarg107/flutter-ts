import { Router } from "express";
import { getUserController,createUserController,deletedUserController,updateUserController } from "../controllers/user.controller";

const userRouter = Router()

userRouter.get("/:userId",getUserController)
userRouter.post("/",createUserController)
userRouter.delete("/:userId",deletedUserController)
userRouter.put("/",updateUserController)

export default userRouter
import { Router } from "express";
import { getTweetController,createTweetController,deletedTweetController,updateTweetController, getAllTweetController } from "../controllers/tweet.controller";
const tweetRouter = Router()

tweetRouter.get("/:tweetId", getTweetController)
tweetRouter.get("/", getAllTweetController)
tweetRouter.post("/", createTweetController)
tweetRouter.delete("/:tweetId", deletedTweetController)
tweetRouter.put("/", updateTweetController)

export default tweetRouter
import { Request, Response } from "express"
import { getTweetRepo, createTweetRepo, deleteTweetRepo, updateTweetRepo, getAllTweetRepo } from "../repository/tweet.repository"
import { ITweetInterface } from "../database/interfaces/tweet.interface"
import { deleteUserwithTweetIdRepo, updateUserwithTweetIdRepo } from "../repository/user.repository"

export const getTweetController = async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId as string;

    try {
        const tweet = await getTweetRepo(tweetId)
        if (tweet) {
            res.status(200).json({ "data": tweet })
        }
        else {
            res.status(500).json({ error: "Tweet not Found" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ "error": error })
    }
}

export const getAllTweetController = async (req: Request, res: Response) => {

    try {
        const tweets = await getAllTweetRepo()
        if (tweets) {
            res.status(200).json({ "data": tweets })
        }
        else {
            res.status(500).json({ error: "Tweets are not Found" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ "error": error })
    }
}


export const createTweetController = async (req: Request, res: Response) => {
    const tweet: ITweetInterface = req.body

    try {
        const success = await createTweetRepo(tweet)
        if (success) {
            const userUpdateSuccess = await updateUserwithTweetIdRepo(tweet.adminId, tweet.tweetId)
            if (userUpdateSuccess) {
                res.status(200).json({ data: tweet })
            }
            else {
                res.status(500).json({ data: "User not Updated" })
            }
        }
        else {
            res.status(500).json({ error: "Tweet not Created" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ "error": error })
    }
}

export const updateTweetController = async (req: Request, res: Response) => {
    const updatedTweet: ITweetInterface = req.body

    try {
        const success = await updateTweetRepo(updatedTweet.tweetId, updatedTweet)
        if (success) {
            res.status(200).json({ "data": "Tweet Updated" })
        }
        else {
            res.status(500).json({ error: "Tweet not Updated" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ "error": error })
    }
}

export const deletedTweetController = async (req: Request, res: Response) => {
    const tweetId = req.params.tweetId as string
    try {
        const tweet = await getTweetRepo(tweetId)
        const success = await deleteTweetRepo(tweetId)
        if (success) {
            const deleteUpdatedUserTweetId = await deleteUserwithTweetIdRepo(tweet!.adminId, tweet!.tweetId)
            if (deleteUpdatedUserTweetId) {
                res.status(200).json({ "data": "Tweet Id deleted from User" });
            }
            else {
                res.status(500).json({ "data": "Tweet Id not Deleted from User" });
            }
        }
        else {
            res.status(500).json({ error: "Tweet not Deleted" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ "error": error })
    }
}
import { Document } from "mongoose";

export interface IUserInterface extends Document {
    uid: string,
    tweet: string[],
    firstName: string,
    lastName: string,
    email: string,
    createdAt: string,
}
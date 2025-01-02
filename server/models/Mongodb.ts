import { ObjectId } from "mongodb";

export type WithId<T> = T & { _id?: ObjectId };
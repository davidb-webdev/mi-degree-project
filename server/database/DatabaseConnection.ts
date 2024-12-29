import { Collection, MongoClient, ObjectId } from "mongodb";
import { WithId } from "../models/Mongodb";
import { User } from "../models/User";
import { Project } from "../models/Project";

let instance: DatabaseConnection | null = null;

export default class DatabaseConnection {
  client: MongoClient | null;
  url: string | null;

  constructor() {
    this.url = null;
    this.client = null;
  }

  static getInstance() {
    if (instance === null) {
      instance = new DatabaseConnection();
    }
    return instance;
  }

  setUrl(url: string) {
    this.url = url;
  }

  async connect() {
    if (this.client) {
      return;
    }
    if (!this.url) {
      throw new Error("No URL set on instance of DatabaseConnection");
    }
    this.client = new MongoClient(this.url);
    await this.client.connect();
  }

  getCollection<T>(name: string): Collection<WithId<T>> {
    if (!this.client) {
      throw new Error("Database client is not connected");
    }
    return this.client.db(process.env.DB_NAME).collection<WithId<T>>(name);
  }

  async getUserByEmail(email: string) {
    await this.connect();
    const collection = this.getCollection<User>("users");

    const user = await collection.findOne({ email });
    return user;
  }

  async saveUser(user: User) {
    await this.connect();
    const collection = this.getCollection<User>("users");

    const result = await collection.insertOne(user);
    return result.insertedId;
  }

  async getProjectsByUserId(userId: ObjectId) {
    await this.connect();
    const collection = this.getCollection<Project>("projects");

    const projects = await collection.find({ owner: userId }).toArray();
    return projects;
  }

  async getProjectById(id: ObjectId) {
    await this.connect();
    const collection = this.getCollection<Project>("projects");

    const project = await collection.findOne({ _id: id });
    return project;
  }
}

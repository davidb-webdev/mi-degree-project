import { MongoClient } from "mongodb";
import { User } from "../models/User";

let instance: DatabaseConnection | null = null;

export default class DatabaseConnection {
  url: string | null;
  client: MongoClient | null;

  constructor() {
    this.url = null;
    this.client = null;
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

  async getUserByEmail(email: string) {
    try {
      await this.connect();
    } catch (error) {
      throw error;
    }

    const db = this.client!.db(process.env.DB_NAME || "noDbNameSet");
    const collection = db.collection<User>("users");

    const customer = await collection.findOne({ email });
    return customer;
  }

  async saveUser(user: User) {
    try {
      await this.connect();
    } catch (error) {
      throw error;
    }

    const db = this.client!.db(process.env.DB_NAME || "noDbNameSet");
    const collection = db.collection<User>("users");

    const result = await collection.insertOne(user);
    return result.insertedId;
  }

  static getInstance() {
    if (instance === null) {
      instance = new DatabaseConnection();
    }
    return instance;
  }
}

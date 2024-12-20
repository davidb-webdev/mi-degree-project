import { MongoClient } from "mongodb";

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

  static getInstance() {
    if (instance === null) {
      instance = new DatabaseConnection();
    }
    return instance;
  }
}

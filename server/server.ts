import express from "express";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import DatabaseConnection from "./database/DatabaseConnection";

import {
  authorize,
  registerUser,
  signIn,
  signOut,
  testDb
} from "./controllers/auth.controller";

dotenv.config();
const app = express();
const serverPort = process.env.SERVER_PORT || "3000";
const dbUrl = process.env.DB_URL || "noDbUrlSet";

DatabaseConnection.getInstance().setUrl(dbUrl);

app.use(express.json());
app.use(
  cookieSession({
    secret: process.env.COOKIESESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24
  })
);

app.post("/authorize", authorize);
app.post("/registerUser", registerUser);
app.post("/signin", signIn);
app.post("/signOut", signOut);
app.get("/testDb", testDb);

app.listen(serverPort, () => console.log("Node server running"));

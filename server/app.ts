import express from "express";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import { errorHandler } from "./middleware/errorHandler";
import validate from "./middleware/validate";
import { registerSchema } from "./schemas/auth.schema";

import {
  auth,
  register,
  signIn,
  signOut,
  testDb
} from "./controllers/auth.controller";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cookieSession({
    secret: process.env.COOKIESESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24
  })
);

app.get("/", async (req, res) => {
  res.status(200).send();
});

app.get("/authorize", auth);
app.post("/register", validate(registerSchema), register);
app.post("/signin", signIn);
app.get("/signout", signOut);
app.get("/testdb", testDb);

app.use(errorHandler);

export default app;

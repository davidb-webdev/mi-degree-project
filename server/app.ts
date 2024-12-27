import express from "express";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import errorHandler from "./middleware/errorHandler";
import validate from "./middleware/validate";
import { signInSchema, registerSchema } from "./schemas/auth.schema";
import { auth, register, signIn, signOut } from "./controllers/auth.controller";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cookieSession({
    secret: process.env.COOKIESESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  })
);

app.post("/signin", validate(signInSchema), signIn);
app.get("/signout", signOut);
app.get("/auth", auth);
app.post("/register", validate(registerSchema), register);

app.use(errorHandler);

export default app;

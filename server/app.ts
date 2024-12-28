import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler";
import validate from "./middleware/validate";
import { renewSession, session } from "./middleware/session";
import { signInSchema, registerSchema } from "./schemas/auth.schema";
import { auth, register, signIn, signOut } from "./controllers/auth.controller";

dotenv.config();
const app = express();

app.use(express.json());
app.use(session);
app.use(renewSession);

app.post("/signin", validate(signInSchema), signIn);
app.get("/signout", signOut);
app.get("/auth", auth);
app.post("/register", validate(registerSchema), register);

app.use(errorHandler);

export default app;

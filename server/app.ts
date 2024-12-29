import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler";
import validate from "./middleware/validate";
import { renewSession, session } from "./middleware/session";
import { signInSchema, registerSchema } from "./schemas/auth.schema";
import { auth, register, signIn, signOut } from "./controllers/auth.controller";
import {
  deleteProject,
  getProject,
  getProjects,
  patchProject,
  postProject
} from "./controllers/projects.controller";
import { postOrPatchProjectSchema } from "./schemas/projects.schema";
import requireAuth from "./middleware/requireAuth";

dotenv.config();
const app = express();

app.use(express.json());
app.use(session);
app.use(renewSession);

app.post("/signin", validate(signInSchema), signIn);
app.get("/signout", signOut);
app.get("/auth", requireAuth, auth);
app.post("/register", validate(registerSchema), register);

app.get("/projects", requireAuth, getProjects);
app.get("/project/:id", requireAuth, getProject);
app.post(
  "/project/",
  requireAuth,
  validate(postOrPatchProjectSchema),
  postProject
);
app.patch(
  "/project/:id",
  requireAuth,
  validate(postOrPatchProjectSchema),
  patchProject
);
app.delete("/project/:id", requireAuth, deleteProject);

app.use(errorHandler);

export default app;

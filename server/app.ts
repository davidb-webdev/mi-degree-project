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
import {
  patchProjectSchema,
  postProjectSchema
} from "./schemas/projects.schema";
import requireAuth from "./middleware/requireAuth";
import { deleteNote, getNote, getNotes, patchNote, postNote } from "./controllers/notes.controller";
import { patchNoteSchema, postNoteSchema } from "./schemas/notes.schema";

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
app.post("/project/", requireAuth, validate(postProjectSchema), postProject);
app.patch(
  "/project/:id",
  requireAuth,
  validate(patchProjectSchema),
  patchProject
);
app.delete("/project/:id", requireAuth, deleteProject);

app.get("/notes/:floorId", requireAuth, getNotes);
app.get("/note/:id", requireAuth, getNote);
app.post("/note/", requireAuth, validate(postNoteSchema), postNote);
app.patch("/note/:id", requireAuth, validate(patchNoteSchema), patchNote);
app.delete("/note/:id", requireAuth, deleteNote);

app.use(errorHandler);

export default app;

import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler";
import validate from "./middleware/validate";
import { renewSession, session } from "./middleware/session";
import requireAuth from "./middleware/requireAuth";

import { auth, register, signIn, signOut } from "./controllers/auth.controller";
import { signInSchema, registerSchema } from "./schemas/auth.schema";
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
import {
  deleteFloor,
  getFloor,
  getFloors,
  patchFloor,
  postFloor
} from "./controllers/floors.controller";
import { patchFloorSchema, postFloorSchema } from "./schemas/floors.schema";
import {
  deleteNote,
  getNote,
  getNotes,
  patchNote,
  postNote
} from "./controllers/notes.controller";
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

app.get("/floors/:projectId", requireAuth, getFloors);
app.get("/floor/:id", requireAuth, getFloor);
app.post("/floor/", requireAuth, validate(postFloorSchema), postFloor);
app.patch("/floor/:id", requireAuth, validate(patchFloorSchema), patchFloor);
app.delete("/floor/:id", requireAuth, deleteFloor);

app.get("/notes/:floorId", requireAuth, getNotes);
app.get("/note/:id", requireAuth, getNote);
app.post("/note/", requireAuth, validate(postNoteSchema), postNote);
app.patch("/note/:id", requireAuth, validate(patchNoteSchema), patchNote);
app.delete("/note/:id", requireAuth, deleteNote);

app.use(errorHandler);

export default app;

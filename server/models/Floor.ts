import { ObjectId } from "mongodb";

export interface Floor {
  projectId: ObjectId;
  floorPlanPath: string;
  title: string;
  createdAt: Date;
  editedAt: Date;
}

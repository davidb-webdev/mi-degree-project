import { ObjectId } from "mongodb";

export interface Project {
  title: string;
  description: string;
  status: ProjectStatus;
  owner: ObjectId;
  createdAt: Date;
  editedAt: Date;
}

export const ProjectStatuses = {
  Draft: "Draft",
  InProgress: "InProgress",
  Finished: "Finished"
} as const;

export type ProjectStatus =
  (typeof ProjectStatuses)[keyof typeof ProjectStatuses];

export interface Project {
  _id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  owner: string;
  createdAt: Date;
  editedAt: Date;
}

export const ProjectStatuses = {
  InProgress: "InProgress",
  Finished: "Finished"
} as const;

export type ProjectStatus =
  (typeof ProjectStatuses)[keyof typeof ProjectStatuses];

export interface Project {
  title: string;
  description: string;
  status: ProjectStatus;
	owner: string;
	createdAt: Date;
	editedAt: Date;
}

export enum ProjectStatus {
  InProgress = "In progress",
  Finished = "Finished"
}

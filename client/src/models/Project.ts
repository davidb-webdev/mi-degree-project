export interface Project {
  title: string;
  description: string;
  status: ProjectStatus;
}

export enum ProjectStatus {
  InProgress = "In progress",
  Finished = "Finished"
}

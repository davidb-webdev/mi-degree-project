export class Project {
  constructor(
    public title: string,
    public description: string,
    public status: ProjectStatus,
    public owner: string,
    public createdAt: Date,
    public editedAt: Date,
    public _id?: string
  ) {}
}

export const ProjectStatuses = {
  Draft: "Draft",
  InProgress: "InProgress",
  Finished: "Finished"
} as const;

export type ProjectStatus =
  (typeof ProjectStatuses)[keyof typeof ProjectStatuses];

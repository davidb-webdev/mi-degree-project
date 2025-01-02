export class Floor {
  constructor(
    public title: string,
    public floorPlanPath: string,
    public projectId?: string,
    public createdAt?: Date,
    public editedAt?: Date
  ) {}
}

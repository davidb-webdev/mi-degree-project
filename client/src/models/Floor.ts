export class Floor {
  constructor(
    public title: string,
    public projectId: string,
    public floorPlanPath: string,
    public createdAt?: Date,
    public editedAt?: Date
  ) {}
}

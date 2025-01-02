export class Note {
  constructor(
    public title: string,
    public category: NoteCategory,
    public description: string,
    public xCoordinate: number,
    public yCoordinate: number,
    public floorId?: string,
    public createdAt?: Date,
    public editedAt?: Date,
    public _id?: string
  ) {}
}

export const NoteCategories = {
  BlockedEscapeRoute: "BlockedEscapeRoute",
  FireHazard: "FireHazard",
  NoFireAlarm: "NoFireAlarm"
} as const;

export type NoteCategory = (typeof NoteCategories)[keyof typeof NoteCategories];

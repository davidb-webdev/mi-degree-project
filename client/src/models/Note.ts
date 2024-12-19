export class Note {
  constructor(
    public title: string,
    public category: NoteCategory,
    public description: string
  ) {}
}

export const NoteCategories = {
  BlockedEscapeRoute: "BlockedEscapeRoute",
  FireHazard: "FireHazard",
  NoFireAlarm: "NoFireAlarm"
} as const;

export type NoteCategory = (typeof NoteCategories)[keyof typeof NoteCategories];

export interface Note {
  title: string;
  categories: NoteCategory[];
  description: string;
}

export enum NoteCategory {
  BlockedEscapeRoute = "BlockedEscapeRoute",
  FireHazard = "FireHazard",
  NoFireAlarm = "NoFireAlarm"
}
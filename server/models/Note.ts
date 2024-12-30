import { ObjectId } from "mongodb";

export interface Note {
  title: string;
  category: NoteCategory;
  description: string;
	floorId: ObjectId;
	xCoordinate: number;
	yCoordinate: number;
	createdAt: Date;
	editedAt: Date;
}

export const NoteCategories = {
  BlockedEscapeRoute: "BlockedEscapeRoute",
  FireHazard: "FireHazard",
  NoFireAlarm: "NoFireAlarm"
} as const;

export type NoteCategory = (typeof NoteCategories)[keyof typeof NoteCategories];

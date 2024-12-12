import { NoteCategories } from "./NoteCategory";

export interface Note {
  title: string;
  categories: NoteCategories[];
  description: string;
}

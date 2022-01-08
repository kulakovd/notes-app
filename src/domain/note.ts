/** Note what uses only for notes list */
export interface Note {
  id: string;
  title: string | null;
  textBeginning: string | null;
  date: string;
}

export interface NoteWithFullText {
  id: string;
  html: string;
  text: string;
  title: string;
  textBeginning: string;
  date: Date;
}

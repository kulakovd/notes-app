import { Note, NoteWithFullText } from '../domain/note';

export interface NotesRepository {
  list(): Promise<Note[]>;
  search(str: string): Promise<Note[]>;
  get(id: string): Promise<NoteWithFullText | undefined>;
  save(note: NoteWithFullText): Promise<void>;
  delete(id: string): Promise<void>;
}

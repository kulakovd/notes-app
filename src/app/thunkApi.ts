import { NotesRepository } from './notesRepositry';

export type ThunkApi = {
  extra: {
    notesRepo: NotesRepository;
  }
}

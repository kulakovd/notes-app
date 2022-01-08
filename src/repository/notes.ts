import Dexie from 'dexie';
import { NotesRepository } from '../app/notesRepositry';
import { NoteWithFullText } from '../domain/note';

class NotesDatabase extends Dexie {
  notes!: Dexie.Table<NoteWithFullText, string>;

  constructor () {
    super('NotesDatabase');
    this.version(1).stores({
      notes: '&id, text, date',
    });
  }
}

const db = new NotesDatabase();

export const notesRepo: NotesRepository = {
  async list() {
    const notes = await db.notes.reverse().sortBy('date');
    return notes.map((note) => {
      const { id, date, textBeginning, title } = note;
      return { id, date: date.toISOString(), title, textBeginning };
    });
  },
  async get(id) {
    return db.notes.where('id').equals(id).last();
  },
  async save(note) {
    await db.notes.put(note);
  },
  async delete(id) {
    await db.notes.delete(id);
  }
}

import Dexie from 'dexie';
import { NotesRepository } from '../app/notesRepositry';
import { Note, NoteWithFullText } from '../domain/note';

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

function mapNotes(notes: NoteWithFullText[]): Note[] {
  return notes.map((note) => {
    const { id, date, textBeginning, title } = note;
    return { id, date: date.toISOString(), title, textBeginning };
  })
};

export const notesRepo: NotesRepository = {
  async list() {
    const notes = await db.notes.reverse().sortBy('date');
    return mapNotes(notes);
  },
  async search(searchStr) {
    const regex = new RegExp(searchStr, 'i');
    const notes = await db.notes.filter((note) => regex.test(note.text)).reverse().sortBy('date');
    return mapNotes(notes);
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

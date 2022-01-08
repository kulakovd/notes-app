import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as uuid from 'uuid';
import { Note, NoteWithFullText } from '../domain/note';
import { ThunkApi } from './thunkApi';

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

function noteWithFullTextToNote(note: NoteWithFullText): Note {
  return {
    id: note.id,
    title: note.title,
    textBeginning: note.textBeginning,
    date: note.date.toISOString(),
  };
}

export const createNoteAction = createAsyncThunk<Note, (id: string) => void, ThunkApi>(
  'notes/create-async',
  async (cb, { extra }) => {
    const id = uuid.v4();
    cb(id);
    const newNote: NoteWithFullText = {
      id,
      html: '',
      text: '',
      title: '',
      textBeginning: '',
      date: new Date(),
    };
    await extra.notesRepo.save(newNote);
    return noteWithFullTextToNote(newNote);
  },
);

export const deleteNoteAction = createAsyncThunk<void, string, ThunkApi>(
  'notes/delete-async',
  async (id, { extra }) => extra.notesRepo.delete(id),
);

export const loadNotesAction = createAsyncThunk<Note[], string | undefined, ThunkApi>(
  'notes/load-async',
  async (arg, { extra }) => {
    if (arg != null) {
      return extra.notesRepo.search(arg);
    } else {
      return extra.notesRepo.list();
    }
  },
);

type UpdateNoteResult = Note;
type UpdateNoteArg = Omit<NoteWithFullText, 'date'>;
export const updateNoteAction = createAsyncThunk<UpdateNoteResult, UpdateNoteArg, ThunkApi>(
  'notes/update-async',
  async (arg, { extra }) => {
    const updatedNote: NoteWithFullText = { 
      ...arg,
      title: arg.title.slice(0, 100), // first 100 chars -- beginning of title
      textBeginning: arg.textBeginning.slice(0, 100), // first 100 chars -- beginning of text
      date: new Date(),
    };
    await extra.notesRepo.save(updatedNote);
    return noteWithFullTextToNote(updatedNote);
  },
);

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNoteAction.fulfilled, (state, { payload }) => {
      state.notes.unshift(payload);
    });

    builder.addCase(deleteNoteAction.fulfilled, (state, { meta: { arg: id } }) => {
      state.notes = state.notes.filter((n) => n.id !== id);
    });

    builder.addCase(loadNotesAction.fulfilled, (state, { payload }) => {
      state.notes = payload;
    });

    builder.addCase(updateNoteAction.fulfilled, (state, { payload }) => {
      const findedIndex = state.notes.findIndex((n) => n.id === payload.id);
      if (findedIndex === -1) return;
      state.notes.splice(findedIndex, 1);
      state.notes.unshift(payload);
    });
  }
});

export const notesReducer = notesSlice.reducer;

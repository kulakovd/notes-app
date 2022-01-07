import { createAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as uuid from 'uuid';
import { Note } from "../domain/note";
import { AppDispatch } from "./store";

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [
    {
      id: 'c991a900-ddc1-4623-b224-2508856fe86e',
      title: 'Note title',
      text: 'kek lol kek lol',
      date: new Date().toISOString(),
    },
    {
      id: 'f4f14858-4afb-48d4-bbb7-7d44cf01fe08',
      title: 'Note title very very long long long long long',
      text: 'kek lol kek lol blah blah blah blah aaa aaa',
      date: new Date(2021, 10, 15).toISOString(),
    },
    {
      id: 'afcc153b-ca75-44f3-b9ed-f26ac9fa4526',
      title: 'Note title',
      text: 'kek lol kek lol',
      date: new Date(2100, 2, 29).toISOString(),
    },
  ],
};

export const createNoteAction = createAsyncThunk<Note, (id: string) => void>(
  'notes/create-async',
  (cb) => {
    const id = uuid.v4();
    cb(id);
    return {
      id,
      title: null,
      text: null,
      date: new Date().toISOString(),
    };
  },
);

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    deleteNoteAction(state, action: PayloadAction<string>) {
      state.notes = state.notes.filter((n) => n.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNoteAction.fulfilled, (state, { payload }) => {
      state.notes.push(payload);
    });
  }
});

export const notesReducer = notesSlice.reducer;
export const { deleteNoteAction } = notesSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
import { Note } from "../domain/note";

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [
    {
      id: 'c991a900-ddc1-4623-b224-2508856fe86e',
      title: 'Note title',
      text: 'kek lol kek lol',
      date: new Date(),
    },
    {
      id: 'f4f14858-4afb-48d4-bbb7-7d44cf01fe08',
      title: 'Note title very very long long long long long',
      text: 'kek lol kek lol blah blah blah blah aaa aaa',
      date: new Date(2021, 10, 15),
    },
    {
      id: 'afcc153b-ca75-44f3-b9ed-f26ac9fa4526',
      title: 'Note title',
      text: 'kek lol kek lol',
      date: new Date(2100, 2, 29),
    },
  ],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
});

export const notesReducer = notesSlice.reducer;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { notesReducer } from './notesSlice';

export const store = configureStore({
  reducer: notesReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

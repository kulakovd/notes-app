import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { NotesRepository } from './notesRepositry';
import { notesReducer } from './notesSlice';
import { ThunkApi } from './thunkApi';

export const createStore = (notesRepo: NotesRepository) => {
  const extra: ThunkApi['extra'] = { notesRepo };

  return configureStore({
    reducer: notesReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extra,
        },
      }),
  });
}

export type AppDispatch = ReturnType<typeof createStore>['dispatch'];
export type RootState = ReturnType<ReturnType<typeof createStore>['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  ThunkApi,
  Action<string>
>;

import React from 'react';
import { NotesRepository } from '../app/notesRepositry';

export const NotesRepoContext = React.createContext<NotesRepository | null>(null);

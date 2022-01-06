import React from 'react';
import { NotesList } from '../NotesList';
import { Workspace } from '../Workspace';

export const App: React.FC = () => {
  return (
    <div className="h-screen bg-white text-black dark:bg-neutral-800 dark:text-white">
      <div className="absolute inset-0 w-screen md:w-3/12">
        <NotesList />
      </div>
      <Workspace />
    </div>
  );
};

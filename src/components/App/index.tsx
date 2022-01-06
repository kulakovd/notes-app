import React from 'react';
import { NotesList } from '../NotesList';
import { Workspace } from '../Workspace';

export const App: React.FC = () => {
  return (
    <div className="flex items-stretch h-screen bg-white text-black dark:bg-neutral-800 dark:text-white">
      <div className="absolute inset-0 w-screen md:w-3/12 lg:w-3/12 xl:w-3/12 2xl:w-3/12">
        <NotesList />
      </div>
      <Workspace />
    </div>
  );
};

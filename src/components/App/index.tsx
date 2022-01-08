import classNames from 'classnames';
import React from 'react';
import { useQuery } from '../../hooks/useQuery';
import { NotesList } from '../NotesList';
import { Workspace } from '../Workspace';

export const App: React.FC = () => {
  const openedNote = useQuery().get('note');

  const notesListWrapperClasses = 'absolute inset-0 w-screen md:w-3/12';

  const workspaceWrapperClasses = classNames(
    'absolute h-screen w-screen md:left-1/4 md:w-9/12 transition-all', 
    {
      'pointer-events-none -right-full md:right-0': openedNote == null,
      'right-0': openedNote != null,
    },
  );

  return (
    <div className="h-screen text-black dark:text-white selection:bg-yellow-300 dark:selection:bg-yellow-600">
      <div className={notesListWrapperClasses}>
        <NotesList />
      </div>
      <div className={workspaceWrapperClasses}>
        <Workspace noteId={openedNote} />
      </div>
    </div>
  );
};

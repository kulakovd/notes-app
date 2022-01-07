import React, { useMemo, useState } from 'react';
import { NotesListItem } from '../NotesListItem';
import { useQuery } from '../../hooks/useQuery';
import { useAppSelector } from '../../app/hooks';

export const NotesList: React.FC = () => {
  const query = useQuery();
  const selected = query.get('note');
  const notes = useAppSelector((state) => state.notes);

  /** Notes sorted from newer to older */
  const sorted = useMemo(() => [...notes].sort((a, b) => b.date.valueOf() - a.date.valueOf()), [notes]);

  return (
    <div className="p-2 border-r h-full overflow-y-auto dark:bg-neutral-700 dark:border-gray-900">
      {sorted.map((note, i) => (
        <NotesListItem
          key={note.id}
          note={note}
          selected={note.id === selected}
        />
      ))}
    </div>
  );
};

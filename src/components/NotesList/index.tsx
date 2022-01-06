import React, { useMemo, useState } from 'react';
import * as uuid from 'uuid';
import { NotesListItem } from '../NotesListItem';
import { Note } from '../../domain/note';

export const NotesList: React.FC = () => {
  const [selected, setSelected] = useState<string>();
  const [notes, setNotes] = useState<Note[]>(
    [
      {
        id: uuid.v4(),
        title: 'Note title',
        text: 'kek lol kek lol',
        date: new Date(),
      },
      {
        id: uuid.v4(),
        title: 'Note title very very long long long long long',
        text: 'kek lol kek lol blah blah blah blah aaa aaa',
        date: new Date(2021, 10, 15),
      },
      {
        id: uuid.v4(),
        title: 'Note title',
        text: 'kek lol kek lol',
        date: new Date(2100, 2, 29),
      },
    ],
  );

  const sorted = useMemo(() => [...notes].sort((a, b) => b.date.valueOf() - a.date.valueOf()), [notes]);

  return (
    <div className="p-2 border-r h-full overflow-y-auto dark:bg-neutral-700 dark:border-gray-900">
      {sorted.map((note, i) => (
        <NotesListItem
          key={note.id}
          note={note}
          selected={note.id === selected}
          onSelect={() => setSelected(note.id)}
        />
      ))}
    </div>
  );
};

import React, { useCallback, useEffect, useMemo } from 'react';
import { NotesListItem } from '../NotesListItem';
import { useQuery } from '../../hooks/useQuery';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { WithToolbar } from '../WithToolbar';
import { Button } from '../Button';
import { ReactComponent as AddNoteIcon } from '../../icons/add-note.svg'
import { createNoteAction, loadNotesAction } from '../../app/notesSlice';
import { useNavigate } from 'react-router-dom';
import { SearchBox } from '../SearchBox';

export const NotesList: React.FC = () => {
  const query = useQuery();
  const selected = query.get('note');
  const notes = useAppSelector((state) => state.notes);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadNotesAction());
  }, [dispatch]);

  const handleCreateNote = useCallback(() => {
    const callback = (id: string) => {
      // open new note when it will get the id
      navigate(`/?note=${id}`);
    }
    dispatch(createNoteAction(callback));
  }, [dispatch, navigate]);

  return (
    <WithToolbar
      toolbar={(
        <div className="flex justify-center">
          <Button icon={<AddNoteIcon />} text="Новая заметка" onClick={handleCreateNote} />
        </div>
      )}
    >
      <div className="flex flex-col p-2 border-r h-full overflow-y-auto dark:bg-neutral-700 dark:border-gray-900">
        <div className="mb-2">
          <SearchBox />
        </div>
        {notes.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-neutral-500">
            нет заметок
          </div>
        )}
        {notes.map((note, i) => (
          <NotesListItem
            key={note.id}
            note={note}
            selected={note.id === selected}
          />
        ))}
      </div>
    </WithToolbar>
  );
};

import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { ReactComponent as BackIcon } from '../../icons/back.svg';
import { Button } from '../Button';
import { WithToolbar } from '../WithToolbar';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';
import { deleteNoteAction, updateNoteAction } from '../../app/notesSlice';
import { NoteWithFullText } from '../../domain/note';
import { NoteEditor } from '../NoteEditor';
import { NotesRepoContext } from '../notesRepoContext';

export interface WorkspaceProps {
  noteId?: string | null;
}

export const Workspace: React.FC<WorkspaceProps> = ({ noteId }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const notesRepo = useContext(NotesRepoContext);

  const [note, setNote] = useState<NoteWithFullText>();

  useEffect(() => {
    if (noteId == null || notesRepo == null) return;
    (async () => {
      const note = await notesRepo.get(noteId);
      setNote(note);
    })();
  }, [noteId, notesRepo])

  const noteDate = useMemo(() => {
    if (note == null) return null;
    const formatter = new Intl.DateTimeFormat(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
    return formatter.format(note.date);
  }, [note]);

  const handleDeleteNote = useCallback(() => {
    if (note == null) return;
    dispatch(deleteNoteAction(note.id));
    navigate('/');
  }, [dispatch, navigate, note]);

  // const handleUpdateNote = useCallback(() => {
  //   if (note == null || notesRepo == null) return;
  //   notesRepo.save({ ...note, html });
  // }, [note, notesRepo]);

  return (
    <WithToolbar
      toolbar={(
        <div className="flex justify-center md:justify-start">
          {note && (<Button icon={<DeleteIcon />} text="Удалить заметку" onClick={handleDeleteNote} />)}
        </div>
      )}
    >
      <div className="flex flex-col h-full bg-white dark:bg-neutral-800">
        <div className="md:hidden p-2 flex-shrink-0">
          <Button icon={<BackIcon />} text="Заметки" onClick={() => navigate('/')} />
        </div>
        {note && (
          <div className="flex flex-col flex-1 overflow-y-auto">
            <div className="text-center text-xs text-gray-400 dark:text-gray-500 font-semibold mt-2">{noteDate}</div>
            <NoteEditor note={note} />
          </div>
        )}
      </div>
    </WithToolbar>
  );
};

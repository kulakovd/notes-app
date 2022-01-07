import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { ReactComponent as BackIcon } from '../../icons/back.svg';
import { Button } from '../Button';

export interface WorkspaceProps {
  noteId?: string | null;
}

export const Workspace: React.FC<WorkspaceProps> = ({ noteId }) => {
  const navigate = useNavigate();

  const note = useAppSelector((state) => state.notes.find((n) => n.id === noteId));

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

  const classes = 'p-2 h-full bg-white dark:bg-neutral-800';

  return (
    <div className={classes}>
      <div className="md:hidden mb-2">
        <Button icon={<BackIcon />} text="Заметки" onClick={() => navigate('/')} />
      </div>
      {note && (
        <div className="p-2">
          <div className="text-center text-xs text-gray-400 dark:text-gray-500 font-semibold mb-2">{noteDate}</div>
          <div>
            <div>{note.title}</div>
            <div>{note.text}</div>
          </div>
        </div>
      )}
    </div>
  );
};

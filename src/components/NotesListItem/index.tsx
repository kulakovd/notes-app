import classNames from 'classnames';
import React from 'react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Note } from '../../domain/note';

const timeFormatter = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });

function isToday(date: Date): boolean {
  const today = new Date();
  return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
}

export interface NotesListItemProps {
  note: Note;
  selected?: boolean;
}

export const NotesListItem: React.FC<NotesListItemProps> = ({ 
  note,
  selected = false
}) => {
  const classes = classNames(
    'py-2 px-8 rounded',
    {
      'bg-amber-200 dark:bg-yellow-600': selected,
      'hover:bg-neutral-100 dark:hover:bg-neutral-600': !selected,
    }
  );

  const title = note.title == null || note.title.trim() === '' ? 'Новая заметка' : note.title;

  const date = useMemo(() => {
    const date = new Date(note.date);
    if (isToday(date)) {
      return timeFormatter.format(date);
    } else {
      return date.toLocaleDateString();
    }
  }, [note.date]);

  return (
    <Link to={`/?note=${note.id}`}>
      <div className={classes} role="button">
        <span className="font-bold truncate block">{title}</span>
        <div className="text-xs whitespace-nowrap truncate">
          <span className="font-bold">{date}</span>
          {' '}
          <span>{note?.textBeginning?.slice(0, 100)}</span>
        </div>
      </div>
    </Link>
  );
};

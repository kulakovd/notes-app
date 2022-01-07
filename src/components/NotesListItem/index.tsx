import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { Note } from '../../domain/note';

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

  return (
    <Link to={`/?note=${note.id}`}>
      <div className={classes} role="button">
        <span className="font-bold truncate block">{note.title}</span>
        <div className="text-xs whitespace-nowrap truncate">
          <span className="font-bold">{note.date.toLocaleDateString()}</span>
          {' '}
          <span>{note.text.slice(0, 100)}</span>
        </div>
      </div>
    </Link>
  );
};

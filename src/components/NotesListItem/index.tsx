import classNames from 'classnames';
import React from 'react';
import { Note } from '../../domain/note';

export interface NotesListItemProps {
  note: Note;
  selected?: boolean;
  onSelect?: () => void;
}

export const NotesListItem: React.FC<NotesListItemProps> = ({ 
  note,
  selected = false,
  onSelect = () => {} 
}) => {
  const classes = classNames(
    'py-2 px-8 rounded',
    {
      'bg-amber-200 dark:bg-yellow-600': selected,
      'hover:bg-neutral-100 dark:hover:bg-neutral-600': !selected,
    }
  );

  return (
    <div className={classes} role="button" onClick={onSelect}>
      <span className="font-bold truncate block">{note.title}</span>
      <div className="text-xs whitespace-nowrap truncate">
        <span className="font-bold">{note.date.toLocaleDateString()}</span>
        {' '}
        <span>{note.text.slice(0, 100)}</span>
      </div>
    </div>
  );
};

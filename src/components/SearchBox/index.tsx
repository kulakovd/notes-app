import React, { ChangeEvent, useCallback } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { loadNotesAction } from '../../app/notesSlice';
import { throttle } from '../../helpers/throttle';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';

export const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleInput = useCallback(
    throttle((e: ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      dispatch(loadNotesAction(v));
    }, 100), 
    [dispatch],
  );

  return (
    <div className="flex items-center rounded focus-within:outline focus-within:outline-2 focus-within:outline-yellow-300 bg-white border dark:bg-neutral-800 dark:border-neutral-600 dark:focus-within:outline-yellow-600">
      <span className="text-2xl ml-1 text-neutral-300 dark:text-neutral-500">
        <SearchIcon />
      </span>
      <input
        className="w-full px-2 py-0.5 focus:outline-none bg-transparent" 
        type="text" 
        name="search" 
        placeholder="поиск по заметкам"
        autoComplete="none"
        onChange={handleInput}
      />
    </div>
  );
}


import classNames from 'classnames';
import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { updateNoteAction } from '../../app/notesSlice';
import { Note, NoteWithFullText } from '../../domain/note';
import { getTitleAndTextFromHtml, TitleAndText } from '../../helpers/get-note-title-and-text-from-html';
import { throttle } from '../../helpers/throttle';
import css from './style.module.css';

export const NoteEditor: React.FC<{ note: NoteWithFullText, editorRef: RefObject<HTMLDivElement> }> = ({ note, editorRef }) => {
  const dispatch = useAppDispatch();

  const contentRef = editorRef;
  const html = useMemo(() => note.html == '' ? `<h1><br /></h1>` : note.html, [note.id]);

  const handleInput = useCallback(
    throttle(
      (e) => {
        if (contentRef.current == null) return;
        const { title, text: textBeginning } = getTitleAndTextFromHtml(contentRef.current.children);
        dispatch(updateNoteAction({
          id: note.id,
          title,
          textBeginning,
          html: contentRef.current.innerHTML,
          text: contentRef.current.textContent ?? '',
        }));
      },
      100
    ),
    [contentRef.current, dispatch, note.id]
  );

  const classes = classNames('p-4 flex-1 focus:outline-none', css.editor);
  
  return (
    <div 
      ref={contentRef} 
      contentEditable="true" 
      className={classes} 
      onInput={handleInput}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}


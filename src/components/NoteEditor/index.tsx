import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { updateNoteAction } from '../../app/notesSlice';
import { Note } from '../../domain/note';
import { throttle } from '../../helpers/throttle';
import css from './style.module.css';

function getFulltext(note: Note | null | undefined) {
  if (note == null) return '';
  if (note.title == null && note.textBeginning == null) return `<h1><br /></h1>`;

  return `<h1>${note?.title ?? ''}</h1>
  <div><br /></div>
  <div>${note?.textBeginning ?? ''}</div>
  <div><br /></div>`
}

export const NoteEditor: React.FC<{ note: Note }> = ({ note }) => {
  const dispatch = useAppDispatch();

  const idChanged = useRef(true);

  const initialFulltext = useRef(getFulltext(note));

  const [fulltext, setFulltext] = useState(initialFulltext.current);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    idChanged.current = true;
    const fulltext = getFulltext(note);
    initialFulltext.current = fulltext;
    setFulltext(fulltext);
  }, [note?.id]);

  const handleInput = useCallback(
    throttle(
      (e) => {
        if (contentRef.current != null) {
          setFulltext(contentRef.current.innerHTML);
        }
      },
      100
    ),
    [contentRef.current]
  );

  const { title, text } = useMemo(() => {
    if (contentRef.current != null) {
      console.log('try get title and first line of text');
      let title = null; let text = null;

      const lines = Array.from(contentRef.current.children);
      for (let i = 0; i < lines.length; i++) {
        const textContent = lines[i].textContent;
        if (textContent == null || textContent.trim() === '') continue;
        if (title == null) {
          title = textContent;
        } else {
          text = textContent;
          break;
        }
      }

      return {
        title: title ?? '',
        text: text ?? '',
      }
    }

    return {} as { title?: string; text?: string };
  }, [contentRef.current, note, fulltext]);

  useEffect(() => {
    // idChanged.current = true means what another note is opened so dispatch restricted
    if (idChanged.current) {
      idChanged.current = false;
      return;
    }
    if (title == null || text == null) return;
    console.log('update', note.id, { title, text });
    dispatch(updateNoteAction({
      id: note.id,
      title,
      text,
    }))
  }, [note, title, text]);

  const classes = classNames('p-4 flex-1 focus:outline-none', css.editor);
  
  return (
    <div 
      ref={contentRef} 
      contentEditable="true" 
      className={classes} 
      onInput={handleInput}
      dangerouslySetInnerHTML={{ __html: initialFulltext.current }}
    />
  );
}


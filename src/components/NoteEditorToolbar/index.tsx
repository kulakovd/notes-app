import React, { RefObject, useCallback, useEffect, useState } from 'react';
import { Button } from '../Button';
import { ReactComponent as TitleIcon } from '../../icons/title.svg';
import { ReactComponent as BoldIcon } from '../../icons/bold.svg';
import { ReactComponent as ItalicIcon } from '../../icons/italic.svg';
import { ReactComponent as UnderlinedIcon } from '../../icons/underlined.svg';
import { ReactComponent as StrikethroughIcon } from '../../icons/strikethrough.svg';
import { debounce } from '../../helpers/debounce';

export const NoteEditorToolbar: React.FC<{ editorRef: RefObject<HTMLDivElement> }> = ({ editorRef }) => {
  const [isTitle, setIsTitle] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor == null) return;

    document.addEventListener('selectionchange', debounce((e) => {
      const selection = getSelection();
      if (selection == null) return;
      
      const anchorNode = selection.anchorNode;
      // make sure selection is in editor
      if (anchorNode == null || !editor.contains(anchorNode)) return;

      const parent = anchorNode.parentElement!; // anchorNode always has a parent

      const elemStyle = getComputedStyle(parent);
      
      setIsBold(Number(elemStyle.fontWeight) >= 700);
      setIsItalic(elemStyle.fontStyle === 'italic');
      setIsUnderlined(elemStyle.textDecorationLine.includes('underline'));
      setIsStrikethrough(elemStyle.textDecorationLine.includes('line-through'));

      const isTitle = (() => {
        let current: HTMLElement | null = parent;
        while (current != null && current !== editor) {
          if (current.tagName === 'H1' && current.parentElement === editor) {
            return true;
          }
          current = current.parentElement;
        }
        return false;
      })();

      setIsTitle(isTitle);
    }, 100));
  }, [editorRef.current]);

  const handleTitleClick = useCallback(() => {
    const tag = isTitle ? 'div' : 'h1';
    const success = document.execCommand('formatBlock', false, tag);
    if (success) setIsTitle(b => !b);
  }, [isTitle]);

  const handleBoldClick = useCallback(() => {
    const success = document.execCommand('bold');
    if (success) setIsBold(b => !b);
  }, []);

  const handleItalicClick = useCallback(() => {
    const success = document.execCommand('italic');
    if (success) setIsItalic(b => !b);
  }, []);

  const handleUnderlinedClick = useCallback(() => {
    const success = document.execCommand('underline');
    if (success) setIsUnderlined(b => !b);
  }, []);

  const handleStrikethroughClick = useCallback(() => {
    const success = document.execCommand('strikeThrough');
    if (success) setIsStrikethrough(b => !b);
  }, []);

  return (
    <div className="flex md:gap-1 px-1 justify-center gap-12">
      <Button icon={<TitleIcon />} pressed={isTitle} onClick={handleTitleClick} />
      <Button icon={<BoldIcon />} pressed={isBold} onClick={handleBoldClick} />
      <Button icon={<ItalicIcon />} pressed={isItalic} onClick={handleItalicClick} />
      <Button icon={<UnderlinedIcon />} pressed={isUnderlined} onClick={handleUnderlinedClick} />
      <Button icon={<StrikethroughIcon />} pressed={isStrikethrough} onClick={handleStrikethroughClick} />
    </div>
  );
}

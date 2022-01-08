export interface TitleAndText {
  title: string;
  text: string;
}

export function getTitleAndTextFromHtml(children: HTMLCollection): TitleAndText {
  let title = null; let text = null;

  const lines = Array.from(children);
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

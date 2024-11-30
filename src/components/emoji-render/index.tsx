import * as joypixels from "emoji-toolkit";

function EmojiRender({ emoji }: { emoji: string }): JSX.Element {
  const emojiHtml = joypixels.toImage(emoji);

  return <div dangerouslySetInnerHTML={{ __html: emojiHtml }} />;
}

export default EmojiRender;

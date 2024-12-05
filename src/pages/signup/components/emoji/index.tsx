import React from "react";

interface EmojiProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

const Emoji: React.FC<EmojiProps> = ({
  src,
  alt,
  width = "12px",
  height = "12px",
}) => {
  return (
    <img src={src} alt={alt} style={{ width, height }} />
  );
};

export default Emoji;
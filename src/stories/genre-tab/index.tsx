import { GENRE_EMOJI } from "@constants/genre";

import styles from "./index.styles";
import { useEffect } from "react";

export interface GenreTabProps {
  primary?: boolean;
  backgroundColor?: string;
  btnType?: "Rectangle" | "Round";
  label: string; // 버튼의 텍스트
  emoji?: string; // 버튼의 아이콘
  padding?: string;
  onClick?: () => void;
  selected?: boolean;
}

/** Primary UI component for user interaction */
export function GenreTabButton({
  // primary = false,
  btnType = "Rectangle",
  backgroundColor,
  label,
  emoji,
  padding,
  selected = false,
  ...props
}: GenreTabProps) {
  return (
    <button
      type="button"
      css={[
        styles.storybookButton(),
        btnType === "Rectangle"
          ? styles.storybookGenreRectangle(selected)
          : styles.storybookGenreRound(selected, padding),
      ]}
      style={{
        backgroundColor: selected ? "#000" : backgroundColor,
        color: selected ? "#fff" : "#000",
      }}
      {...props}
    >
      {emoji && GENRE_EMOJI[emoji as keyof typeof GENRE_EMOJI]}
      {label}
    </button>
  );
}

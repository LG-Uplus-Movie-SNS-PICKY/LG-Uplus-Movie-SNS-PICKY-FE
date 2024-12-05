import { GENRE_EMOJI } from "@constants/genre";

import styles from "./index.styles";

export interface GenreTabProps {
  primary?: boolean;
  backgroundColor?: string;
  btnType?: "Rectangle" | "Round";
  label: string; // 버튼의 텍스트
  emoji?: string; // 버튼의 아이콘
  padding?: string;
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export function GenreTabButton({
  primary = false,
  btnType = "Rectangle",
  backgroundColor,
  label,
  emoji,
  padding,
  ...props
}: GenreTabProps) {
  const mode: boolean | null =
    (btnType === "Rectangle" || btnType === "Round") && primary;

  return (
    <button
      type="button"
      css={[
        styles.storybookButton(),
        btnType === "Rectangle"
          ? styles.storybookGenreRectangle(mode)
          : styles.storybookGenreRound(mode, padding),
      ]}
      style={{ backgroundColor }}
      {...props}
    >
      {emoji && GENRE_EMOJI[emoji as keyof typeof GENRE_EMOJI]}
      {label}
    </button>
  );
}

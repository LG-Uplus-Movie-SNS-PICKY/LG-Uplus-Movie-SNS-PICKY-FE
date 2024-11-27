import styles from "./index.styles";

export interface GenreTabProps {
  primary?: boolean;
  backgroundColor?: string;
  btnType?: "Rectangle" | "Round";
  label: string; // 버튼의 텍스트
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export function GenreTab({
  primary = false,
  btnType = "Rectangle",
  backgroundColor,
  label,
  ...props
}: GenreTabProps) {
  const mode: boolean | null =
    (btnType === "Rectangle" || btnType === "Round") && primary;

  return (
    <button
      type="button"
      css={[
        styles.storybookButton(),
        btnType === "Rectangle" ? styles.storybookGenreRectangle(mode) : styles.storybookGenreRound(mode),
      ]}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
}
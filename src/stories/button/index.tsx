import styles from "./index.styles";

export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  btnType?: "Active" | "Social" | "More";
  label: string; // 버튼의 텍스트
  size?: "Small" | "Large";
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export function Button({
  primary = false,
  btnType = "Active",
  backgroundColor,
  label,
  size = "Small",
  ...props
}: ButtonProps) {
  const mode: boolean | null =
    (btnType === "Active" || btnType === "Social") && primary;

  return (
    <button
      type="button"
      css={[
        styles.storybookButton(),
        btnType === "Social" ? styles.storybookButtonSocial(mode, size) : styles[`storybookButton${btnType}`](mode),
      ]}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
}
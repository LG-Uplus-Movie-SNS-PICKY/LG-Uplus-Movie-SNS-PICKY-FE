import styles from "./index.styles";

export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  btnType?: "Active" | "Social" | "More";
  label: string; // 버튼의 텍스트
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  btnType = "Active",
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode: boolean | null =
    (btnType === "Active" || btnType === "Social") && primary;

  return (
    <button
      type="button"
      css={[
        styles.storybookButton(),
        styles[`storybookButton${btnType}`](mode),
      ]}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};

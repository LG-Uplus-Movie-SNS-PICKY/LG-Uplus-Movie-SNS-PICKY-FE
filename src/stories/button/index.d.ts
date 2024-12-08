export interface ButtonProps {
    primary?: boolean;
    backgroundColor?: string;
    btnType?: "Active" | "Social" | "More";
    label: string;
    size?: "Small" | "Large";
    onClick?: () => void;
}
/** Primary UI component for user interaction */
export declare function Button({ primary, btnType, backgroundColor, label, size, ...props }: ButtonProps): import("@emotion/react/jsx-runtime").JSX.Element;

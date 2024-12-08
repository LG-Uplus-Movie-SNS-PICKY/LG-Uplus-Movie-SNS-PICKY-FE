export interface GenreTabProps {
    primary?: boolean;
    backgroundColor?: string;
    btnType?: "Rectangle" | "Round";
    label: string;
    emoji?: string;
    padding?: string;
    onClick?: () => void;
}
/** Primary UI component for user interaction */
export declare function GenreTabButton({ primary, btnType, backgroundColor, label, emoji, padding, ...props }: GenreTabProps): import("@emotion/react/jsx-runtime").JSX.Element;

interface FlexProps {
    position?: "relative" | "absolute" | "fixed" | "sticky";
    direction?: "row" | "column";
    justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around";
    align?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
    webGap?: number;
    height?: string;
    heightVh?: number;
    margin?: string;
    padding?: string;
    borderRadius?: number;
    backgroundColor?: string;
    mobileGap?: number;
    overflowY?: string;
}
export declare const Flex: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & FlexProps, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export {};

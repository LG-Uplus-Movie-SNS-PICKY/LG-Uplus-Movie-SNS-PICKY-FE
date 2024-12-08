import { DefaultTheme } from "styled-components";
type StyleText = {
    color?: keyof DefaultTheme["color"];
    size?: keyof DefaultTheme["size"];
    weight?: keyof DefaultTheme["weight"];
    pointer?: boolean;
    margin?: string;
};
export declare const Text: {
    CheckIcon: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {
        color?: keyof DefaultTheme["color"];
    }>> & string;
    Mini: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, StyleText>> & string;
    Subtitle: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, StyleText>> & string;
    TitleMenu100: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, StyleText>> & string;
    TitleMenu300: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, StyleText>> & string;
    FocusedMenu: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, StyleText & {
        isFocused: boolean;
    }>> & string;
    Warning: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, StyleText>> & string;
    FocusedWarning: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, StyleText & {
        isFocused: boolean;
    }>> & string;
};
type StyleBlock = {
    $width?: string;
    $height?: string;
    $margin?: string;
    $padding?: string;
    $display?: string;
    $direction?: string;
    $justifyContent?: string;
    $alignItems?: string;
    $border?: string;
    $borderRadius?: string;
    $color?: keyof DefaultTheme["color"] | string;
    $bgColor?: keyof DefaultTheme["color"] | string;
    $bgImg?: string;
    $bgSize?: string;
    $gap?: string;
    $position?: string;
    $top?: string;
    $right?: string;
    $bottom?: string;
    $left?: string;
    $relative?: boolean;
    $zIndex?: string;
    $pointer?: boolean;
    $maxWidth?: string;
    $borderBottom?: string;
    $flexGrow?: string;
};
export declare const Block: {
    FlexBox: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, StyleBlock>> & string;
};
type StyleButton = {
    $display?: string;
    $justifyContent?: string;
    $alignItems?: string;
    $width?: string;
    $height?: string;
    $borderRadius?: string;
    $color?: keyof DefaultTheme["color"] | string;
    $bgColor?: keyof DefaultTheme["color"] | string;
    $cursor?: string;
    $border?: string;
    $variant?: "primary" | "secondary";
};
export declare const Button: {
    Confirm: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, StyleButton & {
        $isDisabled: boolean;
    }>> & string;
    Select: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, {
        isSelected: boolean;
    }>> & string;
};
type StyleInput = {
    width?: string;
    height?: string;
    pointer?: boolean;
    border?: string;
};
export declare const Input: {
    InfoBox: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, StyleInput>> & string;
    BirthBox: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, StyleInput>> & string;
};
type StyleMargin = {
    size: number;
    direction: "column" | "row";
};
export declare const Margin: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components/dist/types").Substitute<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, StyleMargin>> & string;
export declare const HeaderContainer: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;
export declare const NavContainer: import("styled-components/dist/types").IStyledComponentBase<"web", import("styled-components").FastOmit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, never>> & string;
export {};

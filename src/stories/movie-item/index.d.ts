import "react-lazy-load-image-component/src/effects/blur.css";
export interface MovieItemProps {
    type: "basic" | "rate" | "all";
    src: string;
    title: string;
    rate?: number;
    like?: number;
    comment?: number;
    state?: string;
    name: string;
}
export declare function MovieItem({ type, src, title, rate, like, comment, state, name, }: MovieItemProps): JSX.Element;

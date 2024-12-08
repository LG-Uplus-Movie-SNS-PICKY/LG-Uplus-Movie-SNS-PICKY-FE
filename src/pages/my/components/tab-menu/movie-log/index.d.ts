export interface MovieLogData {
    id: number;
}
interface MovieLogContentProps {
    data: MovieLogData[];
}
declare function MovieLogContnent({ data }: MovieLogContentProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default MovieLogContnent;

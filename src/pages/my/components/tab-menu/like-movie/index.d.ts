import "react-lazy-load-image-component/src/effects/blur.css";
export interface LikeMovieData {
    movie_id: number;
    movie_title: string;
    movie_poster_url: string;
}
interface LikeMovieContentProps {
    data: LikeMovieData[];
}
declare function LikeMovieContent({ data }: LikeMovieContentProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default LikeMovieContent;

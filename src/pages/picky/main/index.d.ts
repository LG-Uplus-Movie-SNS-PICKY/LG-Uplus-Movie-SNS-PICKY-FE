export interface BestMovieTypes {
    movie_id: number;
    movie_title: string;
    movie_poster_url: string;
    movie_total_rating: number;
    movie_total_like: number;
    movie_total_line_review: number;
    movie_backdrop_url: string;
    movie_genres: string[];
}
declare function PickyPage(): import("@emotion/react/jsx-runtime").JSX.Element;
export default PickyPage;

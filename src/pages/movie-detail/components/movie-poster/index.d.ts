interface MoviePosterProps {
    imageUrl: string;
    title: string;
    year: string;
    nation: string;
    genre: string;
    ott: Array<string>;
}
declare const MoviePoster: ({ imageUrl, title, year, nation, genre, ott }: MoviePosterProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default MoviePoster;

interface MovieDetailProps {
    imageUrl?: string;
    title?: string;
    year?: string;
    nation?: string;
    production?: string;
    age?: string;
    genre?: string;
    ott?: string[];
    rating?: number;
    content?: string;
    castData?: Array<{
        name: string;
        role: string;
        image: string;
    }>;
    reviews?: Array<{
        rating: number;
        text: string;
        user: string;
        date: string;
        likes: number;
        dislikes: number;
    }>;
}
declare function MovieDetail(props: MovieDetailProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default MovieDetail;

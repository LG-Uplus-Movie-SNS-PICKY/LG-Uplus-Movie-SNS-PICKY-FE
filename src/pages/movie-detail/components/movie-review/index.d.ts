interface ReviewProps {
    reviews: {
        id: number;
        writerNickname: string;
        userId: number;
        movieId: number;
        rating: number;
        context: string;
        isSpoiler: boolean;
        likes: number;
        dislikes: number;
        createdAt: string;
    }[];
    lastReviewRef?: (node: HTMLElement | null) => void;
}
declare const MovieReview: ({ reviews, lastReviewRef }: ReviewProps) => import("@emotion/react/jsx-runtime").JSX.Element;
export default MovieReview;

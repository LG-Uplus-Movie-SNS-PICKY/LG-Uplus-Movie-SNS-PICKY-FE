interface MovieTypes {
    [key: string]: unknown;
    movie_id: number;
    movie_title: string;
    movie_poster_src: string;
}
interface WriterTypes {
    [key: string]: unknown;
    writer_id: number;
    writer_nickname: string;
}
export interface LineReviewData {
    [key: string]: unknown;
    line_review_id: number;
    line_review_rating: number;
    line_review_content: string;
    movie: MovieTypes;
    line_review_like: number;
    line_review_hate: number;
    writer: WriterTypes;
    created_at: string;
}
interface LineReviewContentProps {
    data: LineReviewData[];
}
declare function LineReviewContent({ data }: LineReviewContentProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default LineReviewContent;

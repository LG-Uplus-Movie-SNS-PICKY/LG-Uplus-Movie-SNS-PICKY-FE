import React from 'react';
interface Review {
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
    gender?: string;
}
interface Props {
    reviews: Array<Review>;
}
declare const ReviewGraph: React.FC<Props>;
export default ReviewGraph;

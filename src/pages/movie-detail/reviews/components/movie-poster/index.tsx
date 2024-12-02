// pages/MovieDetail/Reviews/components/MovieReviewsPoster/index.tsx
import {
    PosterContainer,
    PosterImage,
} from './index.styles';

interface MovieReviewsPosterProps {
    imageUrl: string;
}

const MovieReviewsPoster = ({ imageUrl }: MovieReviewsPosterProps) => {
    return (
        <PosterContainer>
            <PosterImage src={imageUrl} />
        </PosterContainer>
    );
}

export default MovieReviewsPoster;
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
// pages/MovieDetail/Reviews/components/MovieReviewsPoster/index.tsx
import { PosterContainer, PosterImage, } from './index.styles';
const MovieReviewsPoster = ({ imageUrl }) => {
    return (_jsx(PosterContainer, { children: _jsx(PosterImage, { src: imageUrl }) }));
};
export default MovieReviewsPoster;

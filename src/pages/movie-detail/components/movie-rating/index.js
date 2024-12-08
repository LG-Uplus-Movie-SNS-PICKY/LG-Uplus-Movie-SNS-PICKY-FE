import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
// pages/MovieDetail/components/MovieRating/index.tsx
import { useState } from 'react';
import { RatingContainer, RatingTextContainer, RatingText, PeopleText, RatingStarContainer, Star, TabBarContainer, IconContainer, LikeText } from './index.styles';
import BehindModal from '../behind-modal';
import StarMiniSvg from '@assets/icons/star_mini.svg?react';
import ThumbsUp from '@assets/icons/thumbs_up.svg?react';
import ThumbsUpActive from '@assets/icons/thumbs_up_active.svg?react';
import MovieLogSvg from '@assets/icons/movie_log.svg?react';
import BehindSvg from '@assets/icons/behind.svg?react';
const MovieRating = ({ rating }) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = totalStars - fullStars - halfStar;
    const [likeActive, setLikeActive] = useState(false);
    const [showBehindModal, setShowBehindModal] = useState(false);
    const toggleLike = () => setLikeActive(!likeActive);
    return (_jsxs(RatingContainer, { children: [_jsxs(RatingTextContainer, { children: [_jsx(RatingText, { children: "\uD3C9\uC810 " }), _jsx(StarMiniSvg, {}), _jsx(RatingText, { children: rating.toFixed(1) }), _jsx(PeopleText, { children: "(2000\uBA85)" })] }), _jsxs(RatingStarContainer, { children: [Array.from({ length: fullStars }).map((_, index) => (_jsx(Star, { filled: true }, `full-${index}`))), halfStar === 1 && _jsx(Star, { filled: false, filledHalf: true }, "half"), Array.from({ length: emptyStars }).map((_, index) => (_jsx(Star, { filled: false }, `empty-${index}`)))] }), _jsxs(TabBarContainer, { children: [_jsxs(IconContainer, { onClick: toggleLike, children: [likeActive ? _jsx(ThumbsUpActive, {}) : _jsx(ThumbsUp, {}), _jsx(LikeText, { active: likeActive, children: "\uC88B\uC544\uC694" })] }), _jsxs(IconContainer, { children: [_jsx(MovieLogSvg, {}), "\uBB34\uBE44\uB85C\uADF8"] }), _jsxs(IconContainer, { onClick: () => setShowBehindModal(true), children: [_jsx(BehindSvg, {}), "\uBE44\uD558\uC778\uB4DC"] })] }), showBehindModal && _jsx(BehindModal, { onClose: () => setShowBehindModal(false) })] }));
};
export default MovieRating;

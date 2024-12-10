// pages/MovieDetail/components/MovieRating/index.tsx
import React, { useState } from 'react';
import {
    RatingContainer,
    RatingTextContainer,
    RatingText,
    PeopleText,
    RatingStarContainer,
    Star,
    TabBarContainer,
    IconContainer,
    LikeText
} from './index.styles';
import BehindModal from '../behind-modal';

import StarMiniSvg from '@assets/icons/star_mini.svg?react';
import ThumbsUp from '@assets/icons/thumbs_up.svg?react';
import ThumbsUpActive from '@assets/icons/thumbs_up_active.svg?react';
import MovieLogSvg from '@assets/icons/movie_log.svg?react';
import BehindSvg from '@assets/icons/behind.svg?react';

interface MovieRatingProps {
    rating: number; // 이 값에 따라 별의 색이 채워집니다.
}

const MovieRating = ({ rating }: MovieRatingProps) => {
    const totalStars = 5;

    // 각 별의 채워짐 단계를 계산
    const starLevels = Array.from({ length: totalStars }).map((_, index) => {
        const starPosition = index + 1;
        const difference = rating - (starPosition - 1);
        if (difference >= 1) return 6; // 완전히 채워진 별
        if (difference > 0) return Math.round(difference * 6); // 부분적으로 채워진 별
        return 0; // 빈 별
    });

    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = totalStars - fullStars - halfStar;

    const [likeActive, setLikeActive] = useState(false);
    const [ showBehindModal, setShowBehindModal ] = useState(false);

    const toggleLike = () => setLikeActive(!likeActive);

    return (
        <RatingContainer>
            <RatingTextContainer>
                <RatingText>평점 </RatingText>
                <StarMiniSvg />
                <RatingText>{rating.toFixed(1)}</RatingText>
                <PeopleText>(2000명)</PeopleText>
            </RatingTextContainer>
            <RatingStarContainer>
                {starLevels.map((level, index) => (
                    <Star key={index} filledLevel={level} />
                ))}
            </RatingStarContainer>
            <TabBarContainer>
                <IconContainer onClick={toggleLike}>
                    {likeActive ? <ThumbsUpActive /> : <ThumbsUp />}
                    <LikeText active={likeActive}>좋아요</LikeText>
                </IconContainer>
                <IconContainer>
                    <MovieLogSvg />
                    무비로그
                </IconContainer>
                <IconContainer onClick={() => setShowBehindModal(true)}>
                    <BehindSvg />
                    비하인드
                </IconContainer>
            </TabBarContainer>
            {showBehindModal && <BehindModal onClose={() => setShowBehindModal(false)} />}
        </RatingContainer>
    );
};

export default MovieRating;
// pages/MovieDetail/components/MovieRating/index.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    rating: number;
    initialLike: boolean; // movie_info에서 전달된 초기 좋아요 상태
    movieId: number; // 영화 ID
}

const MovieRating = ({ rating, initialLike, movieId }: MovieRatingProps) => {
    const totalStars = 5;

    // 각 별의 채워짐 단계를 계산
    const starLevels = Array.from({ length: totalStars }).map((_, index) => {
        const starPosition = index + 1;
        const difference = rating - (starPosition - 1);
        if (difference >= 1) return 6; // 완전히 채워진 별
        if (difference > 0) return Math.round(difference * 6); // 부분적으로 채워진 별
        return 0; // 빈 별
    });

    // const fullStars = Math.floor(rating);
    // const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    // const emptyStars = totalStars - fullStars - halfStar;

    // `initialLike`를 초기값으로 설정
    const [likeActive, setLikeActive] = useState(initialLike);
    const [showBehindModal, setShowBehindModal] = useState(false);

    // 좋아요 상태 토글 및 API 호출
    const toggleLike = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/${movieId}/like`,
                {}, // POST 요청이므로 빈 body
                {
                    headers: { Authorization: "123" },
                }
            );

            console.log(response.data.message); // 성공 메시지 출력
            const updatedLikeStatus = !likeActive; // 상태 반전
            setLikeActive(updatedLikeStatus); // 좋아요 상태 업데이트
            console.log(`현재 좋아요 상태: ${updatedLikeStatus}`);
        } catch (error: any) {
            console.error("좋아요 상태 변경 실패", error);
            if (error.response) {
                console.error("응답 상태:", error.response.status);
                console.error("응답 데이터:", error.response.data);
            } else {
                console.error("요청 실패:", error.request);
            }
        }
    };



    // // 좋아요 상태 확인 및 초기화
    // useEffect(() => {
    //     const fetchLikeStatus = async () => {
    //         try {
    //             const response = await axios.get(
    //                 `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/${movieId}/like`,
    //                 {
    //                     headers: { Authorization: "Bearer token" },
    //                 }
    //             );
    //             console.log("현재 좋아요 상태:", response.data.liked);
    //             setLikeActive(response.data.liked);
    //         } catch (err) {
    //             console.error("좋아요 상태 조회 실패", err);
    //         }
    //     };

    //     fetchLikeStatus();
    // }, [movieId]);

    // // 좋아요 상태 토글
    // const toggleLike = async () => {
    //     try {
    //       const response = await axios.post(
    //         `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/${movieId}/like`,
    //         {},
    //         {
    //           headers: { Authorization: "Bearer token" }, // Authorization 헤더 추가
    //         }
    //       );

    //       console.log(response.data.message); // 성공 메시지 출력
    //       setLikeActive(!likeActive); // 좋아요 상태 반전
    //     } catch (error) {
    //       console.error("좋아요 상태 변경 실패", error);
    //     }
    //   };

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
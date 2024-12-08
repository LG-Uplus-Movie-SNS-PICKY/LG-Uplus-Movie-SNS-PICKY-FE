import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
// pages/movie-detail/components/movie-review/index.tsx
import { useEffect, useState } from "react";
import { TotalReviewsContainer, ReviewBody, ReviewContainer, ReviewBadge, ReviewText, UserText, ReviewDetailsContainer, ReviewDetailsText, ThumbsButtonWrapper, ThumbsButton, StarContainer, Star, StarRating, } from "./index.styles";
import PointSvg from "@assets/icons/point.svg?react";
import ThumbsUpSvg from "@assets/icons/thumbs_up_mini.svg?react";
import ThumbsDownSvg from "@assets/icons/thumbs_down_mini.svg?react";
import ThumbsUpActiveSvg from "@assets/icons/thumbs_up_mini_active.svg?react";
import ThumbsDownActiveSvg from "@assets/icons/thumbs_down_mini_active.svg?react";
const MovieReview = ({ reviews, lastReviewRef }) => {
    const [reviewInteractions, setReviewInteractions] = useState([]);
    // 리뷰 데이터 초기화
    useEffect(() => {
        setReviewInteractions(reviews.map((review) => ({
            likes: review.likes,
            dislikes: review.dislikes,
            liked: false,
            disliked: false,
        })));
    }, [reviews]);
    // 좋아요 및 싫어요 처리 함수
    const handleInteraction = (index, type) => {
        setReviewInteractions((prev) => prev.map((interaction, idx) => {
            if (idx === index) {
                const isLike = type === "like";
                return Object.assign(Object.assign({}, interaction), { liked: isLike ? !interaction.liked : false, disliked: !isLike ? !interaction.disliked : false, likes: isLike
                        ? interaction.likes + (interaction.liked ? -1 : 1)
                        : interaction.likes, dislikes: !isLike
                        ? interaction.dislikes + (interaction.disliked ? -1 : 1)
                        : interaction.dislikes });
            }
            return interaction;
        }));
    };
    // 별점 렌더링
    const renderStars = (rating) => (_jsxs(StarContainer, { children: [Array.from({ length: 5 }).map((_, idx) => (_jsx(Star, { filled: rating > idx }, idx))), _jsx(StarRating, { children: rating.toFixed(1) })] }));
    // 날짜 포맷팅
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    };
    // 데이터 로딩 중 처리
    if (reviews.length === 0 || reviewInteractions.length !== reviews.length) {
        return _jsx("div", { children: "Loading..." }); // 데이터 로드 중 또는 비동기 상태 보호
    }
    return (_jsx(TotalReviewsContainer, { children: reviews.map((review, index) => {
            var _a, _b, _c, _d, _e, _f;
            return (_jsxs(ReviewBody, { noBorder: index === reviews.length - 1, ref: index === reviews.length - 1 ? lastReviewRef : null, children: [renderStars(review.rating), _jsxs(ReviewContainer, { children: [_jsx(ReviewBadge, { children: "\uAD00\uB78C\uD3C9" }), _jsx(ReviewText, { children: review.context })] }), _jsxs(ReviewDetailsContainer, { children: [_jsx(UserText, { children: review.writerNickname }), _jsx(PointSvg, {}), _jsx(ReviewDetailsText, { children: formatDate(review.createdAt) }), _jsx(PointSvg, {}), _jsx(ReviewDetailsText, { children: "\uC2E0\uACE0" })] }), _jsxs(ThumbsButtonWrapper, { children: [_jsxs(ThumbsButton, { onClick: () => handleInteraction(index, "like"), active: ((_a = reviewInteractions[index]) === null || _a === void 0 ? void 0 : _a.liked) || false, children: [((_b = reviewInteractions[index]) === null || _b === void 0 ? void 0 : _b.liked) ? (_jsx(ThumbsUpActiveSvg, {})) : (_jsx(ThumbsUpSvg, {})), (_c = reviewInteractions[index]) === null || _c === void 0 ? void 0 : _c.likes] }), _jsxs(ThumbsButton, { onClick: () => handleInteraction(index, "dislike"), active: ((_d = reviewInteractions[index]) === null || _d === void 0 ? void 0 : _d.disliked) || false, children: [((_e = reviewInteractions[index]) === null || _e === void 0 ? void 0 : _e.disliked) ? (_jsx(ThumbsDownActiveSvg, {})) : (_jsx(ThumbsDownSvg, {})), (_f = reviewInteractions[index]) === null || _f === void 0 ? void 0 : _f.dislikes] })] })] }, index));
        }) }));
};
export default MovieReview;

// pages/movie-detail/components/movie-review/index.tsx
import React, { useEffect, useState } from "react";
import {
  TotalReviewsContainer,
  ReviewBody,
  ReviewContainer,
  ReviewBadge,
  ReviewText,
  UserText,
  ReviewDetailsContainer,
  ReviewDetailsText,
  ThumbsButtonWrapper,
  ThumbsButton,
  StarContainer,
  Star,
  StarRating,
  ToastContainer
} from "./index.styles";
import PointSvg from "@assets/icons/point.svg?react";
import ThumbsUpSvg from "@assets/icons/thumbs_up_mini.svg?react";
import ThumbsDownSvg from "@assets/icons/thumbs_down_mini.svg?react";
import ThumbsUpActiveSvg from "@assets/icons/thumbs_up_mini_active.svg?react";
import ThumbsDownActiveSvg from "@assets/icons/thumbs_down_mini_active.svg?react";
import { Toast } from "@stories/toast";
import { fetchLineReviewMovie, toggleLineReviewLike } from "@api/linereview";
import { useRecoilValue } from "recoil";
import { isLogin } from "@/recoil/atoms/isLoginState";

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
  isLiked?: boolean;
  isDisliked?: boolean;
  isAuthor?: boolean;
}

interface ReviewProps {
  movieId: number;
  reviews: Review[];
  lastReviewRef?: (node: HTMLElement | null) => void;
}

const MovieReview = ({ movieId, reviews: initialReviews, lastReviewRef }: ReviewProps) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [toast, setToast] = useState<{ message: string; direction: "none" | "up" | "down" } | null>(null);

  // 토스트 메시지 표시 함수
  const showToast = (message: string, direction: "none" | "up" | "down" = "none") => {
    console.log(`Toast Message: ${message}, Direction: ${direction}`); // 콘솔에 메시지 출력
    setToast({ message, direction });
    setTimeout(() => setToast(null), 1500); // 1.5초 후 메시지 사라짐
  };

  // 서버에서 최신 likes/dislikes 가져오기
  const fetchLatestReview = async (reviewId: number) => {
    try {
      const data = await fetchLineReviewMovie(movieId);
      const updatedReview = data.data.content.find((r: Review) => r.id === reviewId);
      return updatedReview;
    } catch (error) {
      console.error("최신 리뷰 조회 실패:", error);
      showToast("서버 요청 중 오류가 발생했습니다.");
      return null;
    }
  };

  // 좋아요/싫어요 클릭 이벤트
  const handleInteraction = async (reviewId: number, type: "like" | "dislike") => {
    const reviewIndex = reviews.findIndex((r) => r.id === reviewId);
    if (reviewIndex === -1) return;
  
    const currentReview = reviews[reviewIndex];
  
    // 작성자 여부 확인
    if (currentReview.isAuthor) {
      showToast("본인이 작성한 한줄평에는 좋아요/싫어요를 할 수 없습니다.");
      return;
    }
  
    const isLike = type === "like";
    const wasLiked = currentReview.isLiked;
    const wasDisliked = currentReview.isDisliked;
  
    // UI 상태를 즉시 업데이트
    setReviews((prev) =>
      prev.map((r, idx) =>
        idx === reviewIndex
          ? {
              ...r,
              isLiked: isLike ? !wasLiked : false,
              isDisliked: !isLike ? !wasDisliked : false,
              likes: isLike
                ? wasLiked
                  ? r.likes - 1 // 좋아요 취소
                  : wasDisliked
                  ? r.likes + 1 // 싫어요에서 좋아요로 전환
                  : r.likes + 1
                : r.likes - (wasLiked ? 1 : 0), // 좋아요에서 싫어요로 전환 시 좋아요 감소
              dislikes: !isLike
                ? wasDisliked
                  ? r.dislikes - 1 // 싫어요 취소
                  : wasLiked
                  ? r.dislikes + 1 // 좋아요에서 싫어요로 전환
                  : r.dislikes + 1
                : r.dislikes - (wasDisliked ? 1 : 0), // 싫어요에서 좋아요로 전환 시 싫어요 감소
            }
          : r
      )
    );
  
    try {
      // 서버에 좋아요/싫어요 요청
      await toggleLineReviewLike(reviewId, isLike ? "LIKE" : "DISLIKE");
  
      // 서버에서 최신 값 가져오기
      const updatedReview = await fetchLatestReview(reviewId);
  
      // 서버로부터 받은 최신 상태로 업데이트
      if (updatedReview) {
        setReviews((prev) =>
          prev.map((r) => (r.id === reviewId ? { ...updatedReview } : r))
        );
      }
    } catch (error) {
      console.error("좋아요/싫어요 처리 실패:", error);
  
      // 실패 시 이전 상태 복구
      setReviews((prev) =>
        prev.map((r, idx) => (idx === reviewIndex ? { ...currentReview } : r))
      );
      showToast("처리 중 오류가 발생했습니다.");
    }
  };

  // 별점 렌더링
  const renderStars = (rating: number) => (
    <StarContainer>
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star key={idx} filled={rating > idx} />
      ))}
      <StarRating>{rating.toFixed(1)}</StarRating>
    </StarContainer>
  );

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
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

  return (
    <>
      <TotalReviewsContainer>
        {reviews.map((review, index) => (
          <ReviewBody
            key={index}
            noBorder={index === reviews.length - 1}
            ref={index === reviews.length - 1 ? lastReviewRef : null} // 마지막 리뷰에 ref 연결
          >
            {renderStars(review.rating)}
            <ReviewContainer>
              <ReviewBadge>한줄평</ReviewBadge>
              <ReviewText>{review.context}</ReviewText>
            </ReviewContainer>
            <ReviewDetailsContainer>
              <UserText>{review.writerNickname}</UserText>
              <PointSvg />
              <ReviewDetailsText>{formatDate(review.createdAt)}</ReviewDetailsText>
              <PointSvg />
              <ReviewDetailsText>신고</ReviewDetailsText>
            </ReviewDetailsContainer>
            <ThumbsButtonWrapper>
              <ThumbsButton
                onClick={() => handleInteraction(review.id, "like")}
                active={review.isLiked}
              >
                {review.isLiked ? <ThumbsUpActiveSvg /> : <ThumbsUpSvg />}
                {review.likes}
              </ThumbsButton>
              <ThumbsButton
                onClick={() => handleInteraction(review.id, "dislike")}
                active={review.isDisliked}
              >
                {review.isDisliked ? <ThumbsDownActiveSvg /> : <ThumbsDownSvg />}
                {review.dislikes}
              </ThumbsButton>
            </ThumbsButtonWrapper>
          </ReviewBody>
        ))}
      </TotalReviewsContainer>

      {/* 토스트 메시지 */}
      <ToastContainer>
        {toast && <Toast message={toast.message} direction={toast.direction} />}
      </ToastContainer>
    </>
  );
};

export default MovieReview;
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
import { toggleLineReviewLike } from "@api/linereview";

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
  userId?: number; // 현재 로그인한 사용자 ID
  lastReviewRef?: (node: HTMLElement | null) => void; // lastReviewRef 추가
}

interface ReviewInteraction {
  likes: number;
  dislikes: number;
  liked: boolean;
  disliked: boolean;
}

const MovieReview = ({ reviews, userId, lastReviewRef }: ReviewProps) => {
  const [reviewInteractions, setReviewInteractions] = useState<ReviewInteraction[]>([]);
  const [toast, setToast] = useState<{ message: string; direction: "none" | "up" | "down" } | null>(null);

  // 리뷰 데이터 초기화
  useEffect(() => {
    setReviewInteractions(
      reviews.map((review) => ({
        likes: review.likes,
        dislikes: review.dislikes,
        liked: false,
        disliked: false,
      }))
    );
  }, [reviews]);

  // 토스트 메시지 표시 함수
  const showToast = (message: string, direction: "none" | "up" | "down" = "none") => {
  console.log(`Toast Message: ${message}, Direction: ${direction}`); // 콘솔에 메시지 출력
  setToast({ message, direction });
  setTimeout(() => setToast(null), 1500); // 1.5초 후 메시지 사라짐
};

  // 좋아요/싫어요 처리
  const handleInteraction = async (index: number, type: "like" | "dislike") => {
    const review = reviews[index];
    const isLike = type === "like";
    const preference = isLike ? "LIKE" : "DISLIKE";

    try {
      const response = await toggleLineReviewLike(review.id, preference);

      console.log(response.message); // 성공 메시지 출력

      setReviewInteractions((prev) =>
        prev.map((interaction, idx) => {
          if (idx === index) {
            const wasLiked = interaction.liked;
            const wasDisliked = interaction.disliked;

            return {
              ...interaction,
              liked: isLike ? !wasLiked : false,
              disliked: !isLike ? !wasDisliked : false,
              likes:
                isLike && !wasLiked
                  ? interaction.likes + 1
                  : isLike && wasLiked
                  ? interaction.likes - 1
                  : interaction.likes,
              dislikes:
                !isLike && !wasDisliked
                  ? interaction.dislikes + 1
                  : !isLike && wasDisliked
                  ? interaction.dislikes - 1
                  : interaction.dislikes,
            };
          }
          return interaction;
        })
      );
    } catch (error: any) {
      console.error("좋아요/싫어요 처리 중 오류:", error);

      if (error.response?.status === 403) {
        showToast(error.response.data?.message || "요청이 거부되었습니다.");
      } else {
        showToast("처리 중 오류가 발생했습니다.");
      }
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

  // 데이터 로딩 중 처리
  if (reviews.length === 0 || reviewInteractions.length !== reviews.length) {
    return <div>Loading...</div>;
  }

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
                onClick={() => handleInteraction(index, "like")}
                active={reviewInteractions[index]?.liked || false}
              >
                {reviewInteractions[index]?.liked ? (
                  <ThumbsUpActiveSvg />
                ) : (
                  <ThumbsUpSvg />
                )}
                {reviewInteractions[index]?.likes}
              </ThumbsButton>
              <ThumbsButton
                onClick={() => handleInteraction(index, "dislike")}
                active={reviewInteractions[index]?.disliked || false}
              >
                {reviewInteractions[index]?.disliked ? (
                  <ThumbsDownActiveSvg />
                ) : (
                  <ThumbsDownSvg />
                )}
                {reviewInteractions[index]?.dislikes}
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
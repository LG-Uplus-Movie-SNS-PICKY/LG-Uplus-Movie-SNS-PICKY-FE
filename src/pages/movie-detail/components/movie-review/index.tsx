// pages/movie-detail/components/movie-review/index.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
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
  // const accessToken = localStorage.getItem("accessToken");
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTAsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzMzOTkxNzQ2LCJleHAiOjE3MzQwNzgxNDZ9.roZDLyA2pNpNwcvqap2gBFRPlrwQoQ6JAI5cysxKNSY"
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

  // 좋아요/싫어요 API 요청 처리 함수
  const handleInteraction = async (index: number, type: "like" | "dislike") => {
    try {
      const review = reviews[index];
      const isLike = type === "like";
      const preference = isLike ? "LIKE" : "DISLIKE";
  
      // // 자기 글에 대한 좋아요/싫어요 처리 방지
      // if (review.userId === userId) {
      //   showToast("자신이 등록한 한줄평에는 좋아요를 누를 수 없습니다.", "none");
      //   return;
      // }
  
      // API 요청
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/linereviewlike`,
        {
          lineReviewId: review.id,
          preference,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}`}, // 올바른 토큰 사용
        }
      );
  
      console.log(response.data.message); // 성공 메시지 출력
  
      // 상태 업데이트
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
      console.error("좋아요/싫어요 처리 중 오류 발생:", error);
  
      // 403 에러에 대한 토스트 메시지 처리
      if (error.response?.status === 403) {
        showToast(
          error.response.data?.message ||
            "좋아요/싫어요 요청이 거부되었습니다.","none"
        );
      } else {
        showToast("좋아요/싫어요 처리 중 오류가 발생했습니다.", "none");
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
    return <div>Loading...</div>; // 데이터 로드 중 또는 비동기 상태 보호
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
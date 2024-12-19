// pages/movie-detail/components/movie-review/index.tsx
import React, { forwardRef, useEffect, useState } from "react";
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
  ToastContainer,
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
  review: Review | null; // 개별 리뷰 객체
  noBorder?: boolean; // 마지막 리뷰 여부
  // ref: (node?: Element | null) => void;
}

// forwardRef를 사용해 ref를 마지막 리뷰에 연결 가능하게 처리
const MovieReview = forwardRef<HTMLDivElement, ReviewProps>(
  ({ review, movieId, noBorder }, ref) => {
    // const [reviews, setReviews] = useState<Review[]>(initialReviews);
    // 리뷰 초기 상태 설정
    const [currentReview, setCurrentReview] = useState<Review | null>(review);

    // 리뷰가 없으면 null 반환
    if (!currentReview) {
      return null;
    }

    const [toast, setToast] = useState<{
      message: string;
      direction: "none" | "up" | "down";
    } | null>(null);

    // 토스트 메시지 표시 함수
    const showToast = (
      message: string,
      direction: "none" | "up" | "down" = "none"
    ) => {
      setToast({ message, direction });
      setTimeout(() => setToast(null), 1500); // 1.5초 후 메시지 사라짐
    };

    // 서버에서 최신 likes/dislikes 가져오기
    const fetchLatestReview = async (reviewId: number) => {
      try {
        const data = await fetchLineReviewMovie(movieId);
        const updatedReview = data.data.content.find(
          (r: Review) => r.id === reviewId
        );
        return updatedReview;
      } catch (error) {
        showToast("서버 요청 중 오류가 발생했습니다.");
        return null;
      }
    };

    // 좋아요/싫어요 클릭 이벤트
    const handleInteraction = async (type: "like" | "dislike") => {
      // 작성자 여부 확인
      if (currentReview.isAuthor) {
        showToast(
          "본인이 작성한 한줄평에는 좋아요/싫어요를 할 수 없습니다.",
          "none"
        );
        return;
      }

      const isLike = type === "like";
      const updatedLikes = isLike
        ? currentReview.isLiked
          ? currentReview.likes - 1
          : currentReview.likes + 1
        : currentReview.likes - (currentReview.isLiked ? 1 : 0);
      const updatedDislikes = !isLike
        ? currentReview.isDisliked
          ? currentReview.dislikes - 1
          : currentReview.dislikes + 1
        : currentReview.dislikes - (currentReview.isDisliked ? 1 : 0);

      // UI 상태 즉시 업데이트
      setCurrentReview((prev) =>
        prev
          ? {
              ...prev,
              isLiked: isLike ? !prev.isLiked : false,
              isDisliked: !isLike ? !prev.isDisliked : false,
              likes: isLike
                ? prev.isLiked
                  ? prev.likes - 1
                  : prev.likes + 1
                : prev.likes,
              dislikes: !isLike
                ? prev.isDisliked
                  ? prev.dislikes - 1
                  : prev.dislikes + 1
                : prev.dislikes,
            }
          : prev
      );

      try {
        await toggleLineReviewLike(
          currentReview.id,
          isLike ? "LIKE" : "DISLIKE"
        );
        const updatedReview = await fetchLineReviewMovie(movieId).then((res) =>
          res.data.content.find((r: Review) => r.id === currentReview.id)
        );
        if (updatedReview) {
          setCurrentReview(updatedReview);
        }
      } catch (error) {
        showToast("서버 요청 중 오류가 발생했습니다.");
      }
    };

    useEffect(() => {
      setCurrentReview(review);
    }, [review]);

    // 별점 렌더링
    const renderStars = (rating: number) => (
      <StarContainer>
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star key={idx} filled={rating > idx} />
        ))}
        <StarRating>{rating.toFixed(1)}</StarRating>
      </StarContainer>
    );

    // 날짜 포맷팅 함수 - 한국 시간 (KST) 기준
    const formatToKST = (dateString: string) => {
      const date = new Date(dateString); // UTC 기준
      const KST_OFFSET = 9 * 60 * 60 * 1000; // 9시간(밀리초 단위)
      const kstDate = new Date(date.getTime() + KST_OFFSET);

      return kstDate.toLocaleString("ko-KR", {
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
          <ReviewBody ref={ref} noBorder={noBorder}>
            {renderStars(currentReview.rating)}
            <ReviewContainer>
              <ReviewBadge>한줄평</ReviewBadge>
              <ReviewText>{currentReview.context}</ReviewText>
            </ReviewContainer>
            <ReviewDetailsContainer>
              <UserText>{currentReview.writerNickname}</UserText>
              <PointSvg />
              <ReviewDetailsText>
                {formatToKST(currentReview.createdAt)}
              </ReviewDetailsText>
              <PointSvg />
              <ReviewDetailsText>신고</ReviewDetailsText>
            </ReviewDetailsContainer>
            <ThumbsButtonWrapper>
              <ThumbsButton
                onClick={() => handleInteraction("like")}
                active={currentReview.isLiked}
              >
                {currentReview.isLiked ? (
                  <ThumbsUpActiveSvg />
                ) : (
                  <ThumbsUpSvg />
                )}
                {currentReview.likes}
              </ThumbsButton>
              <ThumbsButton
                onClick={() => handleInteraction("dislike")}
                active={currentReview.isDisliked}
              >
                {currentReview.isDisliked ? (
                  <ThumbsDownActiveSvg />
                ) : (
                  <ThumbsDownSvg />
                )}
                {currentReview.dislikes}
              </ThumbsButton>
            </ThumbsButtonWrapper>
          </ReviewBody>
        </TotalReviewsContainer>

        {/* Toast 메시지 */}
        {toast && (
          <ToastContainer>
            <Toast message={toast.message} direction={toast.direction} />
          </ToastContainer>
        )}
      </>
    );
  }
);

export default MovieReview;

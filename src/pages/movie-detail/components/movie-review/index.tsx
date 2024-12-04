// pages/MovieDetail/components/MovieReview/index.tsx
import React, { useState } from "react";
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
} from "./index.styles";
import PointSvg from "@assets/icons/point.svg?react";
import ThumbsUpSvg from "@assets/icons/thumbs_up_mini.svg?react";
import ThumbsDownSvg from "@assets/icons/thumbs_down_mini.svg?react";
import ThumbsUpActiveSvg from "@assets/icons/thumbs_up_mini_active.svg?react";
import ThumbsDownActiveSvg from "@assets/icons/thumbs_down_mini_active.svg?react";

interface ReviewProps {
  reviews: {
    rating: number;
    text: string;
    user: string;
    date: string;
    likes: number;
    dislikes: number;
  }[];
}

const MovieReview = ({ reviews }: ReviewProps) => {
  const [reviewInteractions, setReviewInteractions] = useState(
    reviews.map((review) => ({
      likes: review.likes,
      dislikes: review.dislikes,
      liked: false,
      disliked: false,
    }))
  );

  const handleLike = (index: number) => {
    setReviewInteractions((currentInteractions) =>
      currentInteractions.map((interaction, idx) => {
        if (index === idx) {
          if (interaction.disliked) {
            return {
              ...interaction,
              liked: true,
              disliked: false,
              likes: interaction.likes + 1,
              dislikes: interaction.dislikes - 1,
            };
          } else {
            return {
              ...interaction,
              liked: !interaction.liked,
              dislikes: interaction.liked
                ? interaction.dislikes
                : interaction.dislikes,
              likes: interaction.liked
                ? interaction.likes - 1
                : interaction.likes + 1,
            };
          }
        }
        return interaction;
      })
    );
  };

  const handleDislike = (index: number) => {
    setReviewInteractions((currentInteractions) =>
      currentInteractions.map((interaction, idx) => {
        if (index === idx) {
          if (interaction.liked) {
            return {
              ...interaction,
              liked: false,
              disliked: true,
              likes: interaction.likes - 1,
              dislikes: interaction.dislikes + 1,
            };
          } else {
            return {
              ...interaction,
              disliked: !interaction.disliked,
              likes: interaction.disliked
                ? interaction.likes
                : interaction.likes,
              dislikes: interaction.disliked
                ? interaction.dislikes - 1
                : interaction.dislikes + 1,
            };
          }
        }
        return interaction;
      })
    );
  };

  const renderStars = (rating: number) => {
    return (
      <StarContainer>
        {Array.from({ length: 5 }).map((_, idx) => {
          const filled = rating > idx;
          return <Star key={idx} filled={filled} />;
        })}
        <StarRating>{rating.toFixed(1)}</StarRating>
      </StarContainer>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24시간 형식
    });
  };

  return (
    <TotalReviewsContainer>
      {reviews.map((review, index) => (
        <ReviewBody key={index} noBorder={index === reviews.length - 1}>
          {renderStars(review.rating)}
          <ReviewContainer>
            <ReviewBadge>관람평</ReviewBadge>
            <ReviewText>{review.text}</ReviewText>
          </ReviewContainer>
          <ReviewDetailsContainer>
            <UserText>{review.user}</UserText>
            <PointSvg />
            <ReviewDetailsText>{formatDate(review.date)}</ReviewDetailsText>
            <PointSvg />
            <ReviewDetailsText>신고</ReviewDetailsText>
          </ReviewDetailsContainer>
          <ThumbsButtonWrapper>
            <ThumbsButton
              onClick={() => handleLike(index)}
              active={reviewInteractions[index].liked}
            >
              {reviewInteractions[index].liked ? (
                <ThumbsUpActiveSvg />
              ) : (
                <ThumbsUpSvg />
              )}
              {reviewInteractions[index].likes}
            </ThumbsButton>
            <ThumbsButton
              onClick={() => handleDislike(index)}
              active={reviewInteractions[index].disliked}
            >
              {reviewInteractions[index].disliked ? (
                <ThumbsDownActiveSvg />
              ) : (
                <ThumbsDownSvg />
              )}
              {reviewInteractions[index].dislikes}
            </ThumbsButton>
          </ThumbsButtonWrapper>
        </ReviewBody>
      ))}
    </TotalReviewsContainer>
  );
};

export default MovieReview;

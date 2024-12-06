// pages/MovieDetail/Reviews/index.tsx
import React, { useState } from "react";
import MovieHeader from "../components/movie-header";
import MovieReviewsPoster from "./components/movie-poster";
import ReviewGraph from "./components/review-graph";
import ReviewRegist from "./components/review-regist";
import MovieReview from "../components/movie-review";
import {
  MovieReviewContainer,
  InfoContainer,
  Title,
  DetailContainer,
  DetailText,
  ReviewsWrapper,
  FilterContainer,
  SortContainer,
  SortOption,
  SpoilerToggleContainer,
  SpoilerToggleText,
  SpoilerToggleButton,
} from "./index.styles";
import AgeAllSvg from "../../../assets/icons/age_all.svg?react";
import Age12Svg from "../../../assets/icons/age_12.svg?react";
import Age15Svg from "../../../assets/icons/age_15.svg?react";
import Age19Svg from "../../../assets/icons/age_19.svg?react";
import SpoilerToggleSvg from "@assets/icons/spoiler_toggle.svg?react";
import SpoilerToggleActiveSvg from "@assets/icons/spoiler_toggle_active.svg?react";
import SEO from "@components/seo";

interface ReviewRegistProps {
  includeSpoilers: boolean;
  setIncludeSpoilers: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewsPage = () => {
  const [includeSpoilers, setIncludeSpoilers] = useState(false);
  const [sortBy, setSortBy] = useState("");

  const handleToggleSpoilers = () => {
    setIncludeSpoilers(!includeSpoilers);
  };

  const dummyData = {
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/ko/thumb/f/f2/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg/1200px-%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg",
    title: "어벤져스: 엔드게임",
    year: "2019",
    age: "12",
    runtime: 181,
    reviews: [
      {
        spoiler: false,
        rating: 4.0,
        text: "정말 재미있게 봤습니다. 특히 마지막 전투씬이 인상적이었어요!",
        user: "홍길동",
        gender: "male",
        date: "2022-07-10T14:48:00",
        likes: 123,
        dislikes: 10,
      },
      {
        spoiler: true,
        rating: 3.0,
        text: "기대했던 것보다는 조금 실망스러웠지만, 나름대로의 재미는 있었습니다.",
        user: "이순신",
        gender: "male",
        date: "2022-07-11T15:20:00",
        likes: 76,
        dislikes: 8,
      },
      {
        spoiler: true,
        rating: 5.0,
        text: "최고의 영화입니다! 두 번 세 번 추천드립니다!",
        user: "장보고",
        gender: "male",
        date: "2022-07-12T16:00:00",
        likes: 200,
        dislikes: 3,
      },
      {
        spoiler: false,
        rating: 4.0,
        text: "정말 재미있게 봤습니다. 특히 마지막 전투씬이 인상적이었어요!",
        user: "길동이",
        gender: "female",
        date: "2022-07-10T14:48:00",
        likes: 123,
        dislikes: 10,
      },
      {
        spoiler: false,
        rating: 5.0,
        text: "정말 재미있게 봤습니다. 특히 마지막 전투씬이 인상적이었어요!",
        user: "홍홍홍",
        gender: "female",
        date: "2022-07-10T14:48:00",
        likes: 123,
        dislikes: 10,
      },
      {
        spoiler: false,
        rating: 5.0,
        text: "정말 재미있게 봤습니다. 특히 마지막 전투씬이 인상적이었어요!",
        user: "홍홍홍",
        gender: "female",
        date: "2022-07-10T14:48:00",
        likes: 123,
        dislikes: 10,
      },
    ],
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  const filteredReviews = includeSpoilers
    ? dummyData.reviews.filter((review) => review.spoiler)
    : dummyData.reviews;

  return (
    <>
      <SEO
        title={`${dummyData.title}(${dummyData.year})`}
        description={`${dummyData.title}(${dummyData.year})의 ${dummyData.reviews.length}개의 모든 리뷰를 확인해보세요`}
        image={dummyData.imageUrl}
        url={`http://localhost:5173/${location.pathname}`}
      />

      <div style={{ width: "100%" }}>
        <MovieReviewContainer>
          <MovieHeader />
          <MovieReviewsPoster imageUrl={dummyData.imageUrl} />
          <InfoContainer>
            <Title>{dummyData.title}</Title>
            <DetailContainer>
              <DetailText>{dummyData.year}</DetailText>
              {dummyData.age === "all" && <AgeAllSvg />}
              {dummyData.age === "12" && <Age12Svg />}
              {dummyData.age === "15" && <Age15Svg />}
              {dummyData.age === "19" && <Age19Svg />}
              <DetailText>{formatRuntime(dummyData.runtime)}</DetailText>
            </DetailContainer>
          </InfoContainer>
          <ReviewGraph reviews={dummyData.reviews} />
          <ReviewRegist />
          <ReviewsWrapper>
            <FilterContainer>
              <SortContainer>
                <SortOption
                  onClick={() => setSortBy("popular")}
                  active={sortBy === "popular"}
                >
                  공감순
                </SortOption>
                <SortOption
                  onClick={() => setSortBy("recent")}
                  active={sortBy === "recent"}
                >
                  최신순
                </SortOption>
              </SortContainer>
              <SpoilerToggleContainer>
                <SpoilerToggleText>스포일러 포함</SpoilerToggleText>
                <SpoilerToggleButton onClick={handleToggleSpoilers}>
                  {includeSpoilers ? (
                    <SpoilerToggleActiveSvg />
                  ) : (
                    <SpoilerToggleSvg />
                  )}
                </SpoilerToggleButton>
              </SpoilerToggleContainer>
            </FilterContainer>
            <MovieReview reviews={filteredReviews} />
          </ReviewsWrapper>
        </MovieReviewContainer>
      </div>
    </>
  );
};

export default ReviewsPage;

// pages/movie-detail/reviews/index.tsx
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

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
}

const fetchReviews = async ({ pageParam = 1, sortBy }: { pageParam: number; sortBy: string }) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 지연
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/linereview/movie/1`,
    {
      headers: { Authorization: "123" },
      params: {
        page: pageParam,
        limit: 10,
        sortType: sortBy, // sortBy 파라미터를 요청에 포함
      },
    }
  );
  return response.data;
};

const ReviewsPage = () => {
  const [includeSpoilers, setIncludeSpoilers] = useState(false);
  const [sortBy, setSortBy] = useState("likes");
  const [movieInfo, setMovieInfo] = useState({
    imageUrl: "https://upload.wikimedia.org/wikipedia/ko/thumb/f/f2/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg/1200px-%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%A0%9C%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg",
    title: "어벤져스: 엔드게임",
    year: "2019",
    age: "12",
    runtime: 181,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["reviews", { sortBy, includeSpoilers }],
    queryFn: ({ pageParam = 1 }) => fetchReviews({ pageParam, sortBy }), // sortBy 전달
    initialPageParam: 1, // 초기 페이지를 명시적으로 설정
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? undefined; // 다음 페이지가 없다면 undefined 반환
    },
  });

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleToggleSpoilers = () => {
    setIncludeSpoilers(!includeSpoilers);
  };

  const allReviews = data?.pages.flatMap((page) => page.data) || [];

  const filteredReviews = includeSpoilers
    ? allReviews // 스포일러 포함 시 모든 리뷰
    : allReviews.filter((review: Review) => !review.isSpoiler); // 스포일러 제외

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "likes") {
      return b.likes - a.likes; // 좋아요 순 정렬
    }
    if (sortBy === "latest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // 최신순 정렬
    }
    return 0;
  });

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  return (
    <>
      <SEO
        title={`${movieInfo.title}(${movieInfo.year})`}
        description={`${movieInfo.title}(${movieInfo.year})의 ${filteredReviews?.length || 0}개의 모든 리뷰를 확인해보세요`}
        image={movieInfo.imageUrl}
        url={`http://localhost:5173/${location.pathname}`}
      />

      <div style={{ width: "100%" }}>
        <MovieReviewContainer>
          <MovieHeader />
          <MovieReviewsPoster imageUrl={movieInfo.imageUrl} />
          <InfoContainer>
            <Title>{movieInfo.title}</Title>
            <DetailContainer>
              <DetailText>{movieInfo.year}</DetailText>
              {movieInfo.age === "all" && <AgeAllSvg />}
              {movieInfo.age === "12" && <Age12Svg />}
              {movieInfo.age === "15" && <Age15Svg />}
              {movieInfo.age === "19" && <Age19Svg />}
              <DetailText>{formatRuntime(movieInfo.runtime)}</DetailText>
            </DetailContainer>
          </InfoContainer>
          <ReviewGraph reviews={allReviews} />
          <ReviewRegist />
          <ReviewsWrapper>
            <FilterContainer>
              <SortContainer>
                <SortOption
                  onClick={() => setSortBy("likes")}
                  active={sortBy === "likes"}
                >
                  공감순
                </SortOption>
                <SortOption
                  onClick={() => setSortBy("latest")}
                  active={sortBy === "latest"}
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
            <MovieReview
              reviews={sortedReviews || []} // 공감순 or 최신순으로 정렬된 리뷰 전달
              lastReviewRef={ref}
            />
            {isFetchingNextPage && <div>로딩 중...</div>}
            {!hasNextPage && <div>더 이상 데이터가 없습니다.</div>}
          </ReviewsWrapper>
        </MovieReviewContainer>
      </div>
    </>
  );
};

export default ReviewsPage;

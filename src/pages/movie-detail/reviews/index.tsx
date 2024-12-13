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
  LoadingContainer
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
import { useParams } from "react-router-dom";
import Loading from "@components/loading";

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

interface MovieInfo {
  imageUrl: string;
  title: string;
  year: string;
  age: string;
  runtime: number;
}

interface ReviewResponse {
  data: Review[];
  nextPage?: number;
}

const fetchReviews = async ({
  pageParam = 1,
  sortBy,
}: {
  pageParam: number;
  sortBy: string;
}): Promise<ReviewResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 지연
  const response = await axios.get<ReviewResponse>(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/linereview/movie/1`,
    {
      headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTMsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzMzOTY1NTE5LCJleHAiOjE3MzQwNTE5MTl9.0l58z2m5gbDOhBQfluWGZ8c5rJRhqZh_cAPx_8CxNWQ" },
      params: {
        page: pageParam,
        limit: 10,
        sortType: sortBy,
      },
    }
  );
  return response.data;
};

const ReviewsPage = () => {
  // const accessToken = localStorage.getItem("accessToken");
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTAsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzMzOTkxNzQ2LCJleHAiOjE3MzQwNzgxNDZ9.roZDLyA2pNpNwcvqap2gBFRPlrwQoQ6JAI5cysxKNSY"
  const { id: movieId } = useParams(); // 영화 ID 가져오기
  const [includeSpoilers, setIncludeSpoilers] = useState(false);
  const [sortBy, setSortBy] = useState("likes");
  const [movieInfo, setMovieInfo] = useState<MovieInfo | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["reviews", { sortBy, includeSpoilers }],
    queryFn: ({ pageParam = 1 }) => fetchReviews({ pageParam, sortBy }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });

  const { ref, inView } = useInView({ threshold: 1.0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/${movieId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const movieData = response.data.movie_info;
        setMovieInfo({
          imageUrl: movieData.backdrop_path
            ? `https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`
            : "",
          title: movieData.original_title,
          year: movieData.release_date.split("-")[0],
          age: "12", // 임시 설정. 적절히 API에서 가져올 수 있음.
          runtime: movieData.runtime,
        });
      } catch (error) {
        console.error("영화 정보를 불러오는 중 오류 발생:", error);
      }
    };

    if (movieId) {
      fetchMovieInfo();
    }
  }, [movieId]);

  const handleToggleSpoilers = () => {
    setIncludeSpoilers(!includeSpoilers);
  };

  const currentPageReviews: Review[] =
    data?.pages[data.pages.length - 1]?.data || []; // 현재 페이지의 데이터
  const allReviews: Review[] = data?.pages.flatMap((page) => page.data) || [];

  const filteredReviews = includeSpoilers
    ? allReviews
    : allReviews.filter((review) => !review.isSpoiler);

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "likes") {
      return b.likes - a.likes;
    }
    if (sortBy === "latest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  if (!movieInfo) {
    return 0;
  }

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
          <MovieReviewsPoster imageUrl={movieInfo.imageUrl || ""} />
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
          <ReviewRegist refetch={refetch} />
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

            {/* 로딩 상태 관리 */}
            {isLoading ? (
              <LoadingContainer>
                <Loading />
              </LoadingContainer>
            ) : (
              <>
                <MovieReview reviews={sortedReviews || []} lastReviewRef={ref} />

                {/* 추가 데이터 로딩 중 */}
                {isFetchingNextPage && (
                  <LoadingContainer>
                    <Loading />
                  </LoadingContainer>
                )}

                {/* 모든 데이터 로드 완료 시 메시지 */}
                {!hasNextPage && sortedReviews.length > 0 && (
                  <div
                    style={{
                      fontSize: "16px",
                      textAlign: "center",
                      fontWeight: "600",
                      margin: "16px",
                    }}
                  >
                    마지막 리뷰입니다.
                  </div>
                )}
              </>
            )}
          </ReviewsWrapper>
        </MovieReviewContainer>
      </div>
    </>
  );
};

export default ReviewsPage;

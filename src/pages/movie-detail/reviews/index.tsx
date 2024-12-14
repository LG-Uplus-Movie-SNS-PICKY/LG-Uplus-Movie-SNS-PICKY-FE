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
import SpoilerToggleSvg from "@assets/icons/spoiler_toggle.svg?react";
import SpoilerToggleActiveSvg from "@assets/icons/spoiler_toggle_active.svg?react";
import SEO from "@components/seo";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import Loading from "@components/loading";
import { fetchMovieDetail } from "@api/movie";
import { fetchLineReviewMovie } from "@api/linereview";
import { useMovieDetailQuery } from "@hooks/movie";
import { useLineReviewMovieQuery } from "@hooks/review";

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

interface ReviewResponse {
  data: Review[];
  nextPage?: number;
}

const ReviewsPage = () => {
  const { id } = useParams(); // URL에서 movieId 추출
  const { data: movieDetail, isLoading: movieDetailIsLoading } =
    useMovieDetailQuery(Number(id));
  const { data: lineReviews, isLoading: lineReviewsIsLoading } =
    useLineReviewMovieQuery(Number(id));
  const [reviews, setReviews] = useState<Review[]>([]);
  const [includeSpoilers, setIncludeSpoilers] = useState(false);
  const [sortBy, setSortBy] = useState("likes");
  const { ref, inView } = useInView();
  const [movieData, setMovieData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 영화 데이터 가져오기
  useEffect(() => {
    if (!movieDetailIsLoading) {
      // API 응답 데이터 구조 검증
      if (!movieDetail.data) {
        throw new Error("Invalid API response: Missing data");
      }

      const { movie_info, rating, streaming_platform } = movieDetail.data;

      if (!movie_info) {
        throw new Error("Invalid API response: Missing movie_info");
      }

      // `streaming_platform` 필터링
      const availablePlatforms = Object.entries(streaming_platform || {})
        .filter(([_, value]) => value === true) // 값이 true인 플랫폼만 필터링
        .map(([key]) => key); // 키(플랫폼 이름)만 추출

      // `credits` 기본값 설정
      const credits = movie_info.credits || {
        cast: [],
        crew: [],
        directingCrew: [],
      };


      setMovieData({
        ...movie_info,
        availablePlatforms,
        rating: rating || 0,
      });
    }
  }, [movieDetailIsLoading]);

  useEffect(() => {
    console.log(movieDetail);
  }, [movieData]);

  // 한줄평 가져오기
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await fetchLineReviewMovie(Number(id));
        const allReviews = data?.data?.content || [];
        setReviews(allReviews);
      } catch (err) {
        console.error(err);
        setError("Failed to load reviews.");
      }
    };

    fetchReviews();
  }, [id, sortBy]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["reviews", id, includeSpoilers, sortBy],
    queryFn: async ({ pageParam = { lastReviewId: 0, lastCreatedAt: "" } }) => {
      const { lastReviewId, lastCreatedAt } = pageParam;

      const response = await fetchLineReviewMovie(
        Number(id),
        lastReviewId,
        lastCreatedAt,
        includeSpoilers,
        sortBy
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      const lastReview = lastPage.content?.[lastPage.content.length - 1];
      if (!lastReview) return undefined;
      return {
        lastReviewId: lastReview.id,
        lastCreatedAt: lastReview.createdAt,
      };
    },
    initialPageParam: {
      lastReviewId: 0,
      lastCreatedAt: "",
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allReviews = data?.pages.flatMap((page) => page.content) || [];

  // 총 데이터를 콘솔에 출력
  useEffect(() => {
    console.log(`불러온 총 리뷰 데이터 개수: ${allReviews.length}`);
  }, [allReviews]);

  const sortedReviews = [...allReviews].sort((a, b) => {
    if (sortBy === "likes") return b.likes - a.likes;
    if (sortBy === "latest")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return 0;
  });

  const handleToggleSpoilers = () => {
    setIncludeSpoilers((prev) => !prev);
  };

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  return (
    movieData && (
      <>
        <SEO
          title={`${movieData.original_title}(${new Date(movieData.release_date).getFullYear()})`}
          description={`${movieData.original_title}의 ${allReviews?.length || 0}개의 모든 리뷰를 확인해보세요`}
          image={`${import.meta.env.VITE_TMDB_IMAGE_URL}${movieData.backdrop_path}`}
          url={`http://localhost:5173/${location.pathname}`}
        />

        <div style={{ width: "100%" }}>
          <MovieReviewContainer>
            <MovieHeader />
            <MovieReviewsPoster imageUrl={`${import.meta.env.VITE_TMDB_IMAGE_URL}${movieData.backdrop_path}`} />
            <InfoContainer>
              <Title>{movieData.original_title}</Title>
              <DetailContainer>
                <DetailText>{new Date(movieData.release_date).getFullYear()}</DetailText>
                |
                <DetailText>{formatRuntime(movieData.runtime)}</DetailText>
              </DetailContainer>
            </InfoContainer>


            {/* <ReviewGraph reviews={allReviews} /> */}

            {/* 한줄평 등록 컴포넌트 */}
            {/* <ReviewRegist refetch={refetch} /> */}

            {/* 필터 및 정렬 UI */}
            <ReviewsWrapper>
              <FilterContainer>
                <SortContainer>
                  <SortOption
                    onClick={() => handleSortChange("likes")}
                    active={sortBy === "likes"}
                  >
                    공감순
                  </SortOption>
                  <SortOption
                    onClick={() => handleSortChange("latest")}
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

              {/* 리뷰 데이터 로딩 및 표시 */}
              {/* 로딩 상태 */}
              {isLoading ? (
                <LoadingContainer>
                  <Loading />
                </LoadingContainer>
              ) : (
                <>
                  {/* 리뷰 표시 */}
                  <MovieReview reviews={sortedReviews} />
                  <div ref={ref} style={{ height: "20px" }} />
                  {isFetchingNextPage && <Loading />}
                </>
              )}

              {/* 모든 데이터 로드 완료 메시지 */}
              {!hasNextPage && !isLoading && allReviews.length > 0 && (
                <div style={{ textAlign: "center", margin: "16px" }}>
                  모든 리뷰를 불러왔습니다.
                </div>
              )}
            </ReviewsWrapper>
          </MovieReviewContainer>
        </div>
      </>
    )
  );
};

export default ReviewsPage;

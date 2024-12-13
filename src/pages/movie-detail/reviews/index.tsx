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

interface ReviewResponse {
  data: Review[];
  nextPage?: number;
}

const ReviewsPage = () => {
  // const accessToken = localStorage.getItem("accessToken");
  const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MTIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzM0MDYyMzcwLCJleHAiOjE3MzQxNDg3NzB9.2vo7JzzTxzq8rK69JBmc6lBA2zQL_Yc3GbzbGoTGBGY"
  // const { id: movieId } = useParams(); // 영화 ID 가져오기
  const { id } = useParams(); // URL에서 movieId 추출
  const [includeSpoilers, setIncludeSpoilers] = useState(false);
  const [sortBy, setSortBy] = useState("likes");
  // const [movieInfo, setMovieInfo] = useState<MovieInfo | null>(null);
  const [movieData, setMovieData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const fetchReviews = async ({
  //   pageParam = 1,
  //   sortBy,
  // }: {
  //   pageParam: number;
  //   sortBy: string;
  // }): Promise<ReviewResponse> => {
  //   await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 지연
  //   const response = await axios.get<ReviewResponse>(
  //     `${import.meta.env.VITE_SERVER_URL}/api/v1/linereview/movie/${id}`,
  //     {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //       params: {
  //         page: pageParam,
  //         limit: 10,
  //         sortType: sortBy,
  //       },
  //     }
  //   );
  //   return response.data;
  // };

  const fetchReviews = async ({
    pageParam = 1,
    sortBy,
  }: {
    pageParam: number;
    sortBy: string;
  }): Promise<ReviewResponse> => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/linereview/movie/${id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: {
            page: pageParam,
            limit: 10,
            sortType: sortBy,
          },
        }
      );
      console.log("리뷰 API 응답 데이터:", response.data); // 응답 데이터를 콘솔에 출력
      return {
        data: response.data.data.content, // 리뷰 데이터
        nextPage: response.data.data.last ? undefined : pageParam + 1, // 다음 페이지 계산
      };
    } catch (error) {
      console.error("리뷰 데이터를 가져오는 중 오류 발생:", error);
      throw error;
    }
  };

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
    if (data) {
      const allReviews = data.pages.flatMap((page) => page.data || []);
      console.log("모든 리뷰 데이터 확인:", allReviews);
    }
  }, [data]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/movie/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        console.log("영화 API 응답 데이터:", response.data); // 응답 확인

        const movie_info = response.data?.data?.movie_info;
        if (!movie_info) {
          throw new Error("API 응답에서 movie_info 데이터를 찾을 수 없습니다.");
        }

        setMovieData(movie_info);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          console.error("영화 데이터 불러오기 실패:", err.message);
          setError(err.message || "Failed to fetch movie data");
        } else {
          console.error("영화 데이터 불러오기 실패:", err);
          setError("Failed to fetch movie data");
        }
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleToggleSpoilers = () => {
    setIncludeSpoilers(!includeSpoilers);
  };

  const currentPageReviews: Review[] =
    data?.pages[data.pages.length - 1]?.data || []; // 현재 페이지의 데이터
  const allReviews: Review[] = data?.pages.flatMap((page) => page.data) || [];

  // const filteredReviews = includeSpoilers
  //   ? allReviews
  //   : allReviews.filter((review) => !review.isSpoiler);

  const filteredReviews = (allReviews || []).filter(
    (review) => review && !review.isSpoiler
  );

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movieData) {
    return <div>No movie data found</div>;
  }

  if (!data) {
    return <div>데이터 없음.</div>;
  }

  return (
    <>
      <SEO
        title={`${movieData.original_title}(${new Date(movieData.release_date).getFullYear()})`}
        description={`${movieData.original_title}의 ${filteredReviews?.length || 0}개의 모든 리뷰를 확인해보세요`}
        image={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}
        url={`http://localhost:5173/${location.pathname}`}
      />

      <div style={{ width: "100%" }}>
        <MovieReviewContainer>
          <MovieHeader />
          <MovieReviewsPoster imageUrl={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`} />
          <InfoContainer>
            <Title>{movieData.original_title}</Title>
            <DetailContainer>
              <DetailText>{new Date(movieData.release_date).getFullYear()}</DetailText>
              |
              {/* {movieInfo.age === "all" && <AgeAllSvg />}
              {movieInfo.age === "12" && <Age12Svg />}
              {movieInfo.age === "15" && <Age15Svg />}
              {movieInfo.age === "19" && <Age19Svg />} */}
              <DetailText>{formatRuntime(movieData.runtime)}</DetailText>
            </DetailContainer>
          </InfoContainer>
          {/* <ReviewGraph reviews={allReviews} /> */}
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

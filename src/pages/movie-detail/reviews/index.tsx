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
  LoadingContainer,
  EmptyText,
} from "./index.styles";
import SpoilerToggleSvg from "@assets/icons/spoiler_toggle.svg?react";
import SpoilerToggleActiveSvg from "@assets/icons/spoiler_toggle_active.svg?react";
import SEO from "@components/seo";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import Loading from "@components/loading";
import {
  fetchGenders,
  fetchLineReviewMovie,
  fetchRatings,
} from "@api/linereview";
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
  isLiked?: boolean;
  isDisliked?: boolean;
  isAuthor?: boolean;
}

const defaultRatings: RatingsData = {
  totalCount: 0,
  oneCount: 0,
  twoCount: 0,
  threeCount: 0,
  fourCount: 0,
  fiveCount: 0,
};

const defaultGenders: GendersData = {
  totalCount: 0,
  maleCount: 0,
  femaleCount: 0,
  manAverage: 0,
  womanAverage: 0,
};

interface RatingsData {
  totalCount: number;
  oneCount: number;
  twoCount: number;
  threeCount: number;
  fourCount: number;
  fiveCount: number;
}

interface GendersData {
  totalCount: number;
  maleCount: number;
  femaleCount: number;
  manAverage: number;
  womanAverage: number;
}

const ReviewsPage = () => {
  const { id } = useParams(); // URL에서 movieId 추출
  const movieId = id ? Number(id) : 0; // id가 undefined인 경우 기본값 설정

  const { data: movieDetail, isLoading: movieDetailIsLoading } =
    useMovieDetailQuery(Number(id));
  const [reviews, setReviews] = useState<Review[]>([]);

  const [movieData, setMovieData] = useState<any>(null);

  const [ratings, setRatings] = useState<RatingsData>(defaultRatings);
  const [genders, setGenders] = useState<GendersData>(defaultGenders);

  const [sortType, setSortType] = useState("LATEST"); // 최신순, 공감순 정렬 타입
  const [includeSpoilers, setIncludeSpoilers] = useState(false); // 스포일러 포함 여부

  const { ref, inView } = useInView({ threshold: 1.0 });

  const {
    data: lineReviewState, // React Query 데이터 상태를 lineReviewState로 변경
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useLineReviewMovieQuery(movieId, sortType);

  // 모든 리뷰 데이터 병합
  const allReviews =
    lineReviewState?.pages?.flatMap((page) => page.data.content) || [];

  // 스포일러 상태에 따라 필터링
  const filteredReviews = includeSpoilers
    ? allReviews // 스포일러 포함 시 전체 데이터를 보여줌
    : allReviews.filter((review) => !review.isSpoiler); // isSpoiler === false인 리뷰만 필터링

  // 무한스크롤 트리거
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 정렬 방식 변경
  const handleSortChange = (newSortType: string) => {
    setSortType(newSortType);
    refetch(); // 새로운 정렬 방식으로 API 다시 호출
  };

  // 스포일러 토글
  const handleToggleSpoilers = () => {
    setIncludeSpoilers((prev) => !prev);
    refetch();
  };

  // 영화 데이터 가져오기
  useEffect(() => {
    if (!movieDetailIsLoading) {
      // API 응답 데이터 구조 검증
      if (!movieDetail.data) {
        throw new Error("Invalid API response: Missing data");
      }

      const { movie_info } = movieDetail.data;

      if (!movie_info) {
        throw new Error("Invalid API response: Missing movie_info");
      }

      setMovieData({
        ...movie_info,
      });
    }
  }, [movieDetailIsLoading]);

  // ratings와 genders 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ratingsData = await fetchRatings(movieId);
        const gendersData = await fetchGenders(movieId);
        setRatings(ratingsData);
        setGenders(gendersData);
      } catch (error) {}
    };

    fetchData();
  }, [movieId]);

  // const handleAddReview = async (newReview: Review) => {
  //   setReviews((prevReviews) => [newReview, ...prevReviews]);

  //   // 추가: ratings와 genders 데이터 다시 가져오기
  //   try {
  //     const updatedRatings = await fetchRatings(movieId);
  //     const updatedGenders = await fetchGenders(movieId);
  //     setRatings(updatedRatings);
  //     setGenders(updatedGenders);
  //   } catch (error) {
  //     console.error("Error fetching updated ratings or genders:", error);
  //   }
  // };

  const handleAddReview = async (newReview: Review) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);

    // 추가된 리뷰를 서버와 동기화
    refetch(); // 서버에서 최신 리뷰 목록 다시 조회

    try {
      const updatedRatings = await fetchRatings(movieId);
      const updatedGenders = await fetchGenders(movieId);
      setRatings(updatedRatings);
      setGenders(updatedGenders);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchUpdatedData = async () => {
      try {
        const updatedRatings = await fetchRatings(movieId);
        const updatedGenders = await fetchGenders(movieId);
        setRatings(updatedRatings);
        setGenders(updatedGenders);
      } catch (error) {}
    };

    fetchUpdatedData();
  }, [reviews]); // 리뷰가 변경될 때마다 실행

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  return (
    movieData && (
      <>
        <SEO
          title={`${movieData.title}(${new Date(
            movieData.release_date
          ).getFullYear()})`}
          description={`${movieData.title}의 ${
            allReviews?.length || 0
          }개의 모든 리뷰를 확인해보세요`}
          image={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}
          url={`http://localhost:5173/${location.pathname}`}
        />

        <div style={{ width: "100%" }}>
          <MovieReviewContainer>
            <MovieHeader />
            <MovieReviewsPoster
              imageUrl={`${import.meta.env.VITE_TMDB_IMAGE_URL}${
                movieData.backdrop_path
              }`}
            />
            <InfoContainer>
              <Title>{movieData.title}</Title>
              <DetailContainer>
                <DetailText>
                  {new Date(movieData.release_date).getFullYear()}
                </DetailText>
                |<DetailText>{formatRuntime(movieData.runtime)}</DetailText>
              </DetailContainer>
            </InfoContainer>

            {/* ReviewGraph에 ratings와 genders 전달 */}
            <ReviewGraph ratings={ratings} genders={genders} />

            {/* 리뷰 등록 컴포넌트 */}
            <ReviewRegist
              movieId={movieId}
              refetch={refetch}
              onAddReview={handleAddReview}
            />

            <ReviewsWrapper>
              {/* 최신순, 공감순 필터링 */}
              <FilterContainer>
                <SortContainer>
                  <SortOption
                    onClick={() => handleSortChange("LATEST")}
                    active={sortType === "LATEST"}
                  >
                    최신순
                  </SortOption>
                  <SortOption
                    onClick={() => handleSortChange("LIKES")}
                    active={sortType === "LIKES"}
                  >
                    공감순
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

              {/* 리뷰 데이터 매핑 */}
              {filteredReviews.length === 0 ? (
                <EmptyText>현재 등록된 한줄평이 없습니다.</EmptyText>
              ) : (
                filteredReviews.map((review, index) => (
                  <MovieReview
                    key={review.id}
                    movieId={movieId}
                    review={review}
                    ref={index === filteredReviews.length - 1 ? ref : null}
                  />
                ))
              )}

              {/* 무한스크롤 감지 */}
              <div ref={ref} style={{ height: "20px" }} />
              {isFetchingNextPage && (
                <LoadingContainer>
                  <Loading />
                </LoadingContainer>
              )}
              {!hasNextPage && allReviews.length > 0 && (
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "16px",
                    fontWeight: "600",
                  }}
                >
                  마지막 리뷰입니다.
                </div>
              )}
            </ReviewsWrapper>
          </MovieReviewContainer>

          {/* 리뷰 데이터 */}
          {/* {isLoading ? (
                <LoadingContainer>
                  <Loading />
                </LoadingContainer>
              ) : (
                <>
                  <MovieReview reviews={sortedReviews || []} />
                </>
              )} */}

          {/* <div ref={ref} style={{ height: "20px" }} />
          {isFetchingNextPage &&
            <LoadingContainer>
              <Loading />
            </LoadingContainer>
          }
          {!hasNextPage && allReviews.length > 0 && (
            <div style={{ textAlign: "center", margin: "16px", fontWeight: "600" }}>
              마지막 리뷰입니다.
            </div>
          )} */}
        </div>

        {/* 토스트 메시지
      <ToastContainer>
        {toast && <Toast message={toast.message} direction={toast.direction} />}
      </ToastContainer> */}
      </>
    )
  );
};

export default ReviewsPage;

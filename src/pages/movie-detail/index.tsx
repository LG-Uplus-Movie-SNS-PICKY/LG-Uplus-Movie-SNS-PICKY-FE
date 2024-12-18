// pages/movie-detail/index.tsx
import React, { useEffect, useState } from "react";
import MovieHeader from "./components/movie-header";
import MoviePoster from "./components/movie-poster";
import MovieRating from "./components/movie-rating";
import MovieInfo from "./components/movie-info";
import MovieReview from "./components/movie-review";
import MovieFooter from "./components/movie-footer";
import {
  MovieDetailContainer,
  ReviewHeader,
  Title,
  ReviewCountContainer,
  ReviewCount,
  EmptyText
} from "./index.styles";
import { Button } from "@stories/button";
import { useNavigate, useParams } from "react-router-dom";
import PlusSvg from "@assets/icons/plus.svg?react";
import SEO from "@components/seo";
import { useRecoilValueLoadable } from "recoil";
import { genresSelector } from "@recoil/selectors/genresSelector";
import { useMovieDetailQuery } from "@hooks/movie";
import { fetchLineReviewMovie } from "@api/linereview";
import { useLineReviewMovieQuery } from "@hooks/review";

interface MovieDetailProps {
  imageUrl?: string;
  title?: string;
  year?: string;
  nation?: string;
  production?: string;
  age?: string;
  genre?: string;
  ott?: string[];
  rating?: number;
  content?: string;
  castData?: Array<{ name: string; role: string; image: string }>;
}

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
  isLiked: boolean;
  isDisliked: boolean;
  isAuthor: boolean;
}

function MovieDetail(props: MovieDetailProps) {
  const { id } = useParams(); // URL에서 movieId 추출
  const { data: movieDetail, isLoading: movieDetailIsLoading } =
    useMovieDetailQuery(Number(id));
  const { data: lineReviews, isLoading: lineReviewsIsLoading } =
    useLineReviewMovieQuery(Number(id), "LATEST");

  const navigate = useNavigate();

  const [movieData, setMovieData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]); // 리뷰 상태 타입 지정
  const [totalReviews, setTotalReviews] = useState<number>(0); // 전체 한줄평 개수
  const [likeActive, setLikeActive] = useState<boolean>(false); // 좋아요 상태

  const loadable = useRecoilValueLoadable(genresSelector);

  const genres = loadable.contents.data;

  const handleReviewClick = () => {
    navigate(`/movie/${id}/review`); // movieId 변수를 사용
  };

  useEffect(() => {
    if (!movieDetailIsLoading) {
      // API 응답 데이터 구조 검증
      if (!movieDetail.data) {
        throw new Error("Invalid API response: Missing data");
      }

      const { movie_info, like, rating, streaming_platform } = movieDetail.data;

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

      // 데이터 정렬
      const sortedCast =
        credits.cast?.sort((a: any, b: any) => a.id - b.id) || [];
      const sortedDirectingCrew =
        credits.directingCrew?.sort((a: any, b: any) => a.id - b.id) || [];

      // `like` 상태와 영화 데이터 설정
      setLikeActive(like || false);
      setMovieData({
        ...movie_info,
        credits: {
          ...credits,
          cast: sortedCast,
          directingCrew: sortedDirectingCrew,
        },
        availablePlatforms,
        rating: rating || 0,
      });
    }
  }, [movieDetailIsLoading]);

  useEffect(() => {
    if (!lineReviewsIsLoading) {
      const allReviews = lineReviews?.pages?.flatMap((page) => page.data.content) || []; // 모든 페이지 데이터 병합
  
      // 스포일러 제외하고 최신순으로 정렬한 후 상위 3개 가져오기
      const latestNonSpoilerReviews = allReviews
        .filter((review: Review) => !review.isSpoiler) // 스포일러 제외
        .sort((a: Review, b: Review) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // 최신순 정렬
        .slice(0, 3); // 최대 3개 가져오기
  
      // 상태 업데이트
      setTotalReviews(allReviews.length); // 전체 리뷰 개수 설정
      setReviews(latestNonSpoilerReviews); // 상위 3개 리뷰 설정
      console.log("==================================");
      console.log(latestNonSpoilerReviews);
    }
  }, [lineReviewsIsLoading, lineReviews]);

  // useEffect(() => {
  //   if (!lineReviewsIsLoading && lineReviews?.pages) {
  //     // 스포일러 제외된 리뷰를 누적할 배열
  //     const nonSpoilerReviews: Review[] = [];
  
  //     for (const page of lineReviews.pages) {
  //       const pageReviews = page.data.content || [];
  
  //       // 현재 페이지의 리뷰에서 스포일러 제외된 것만 추가
  //       for (const review of pageReviews) {
  //         if (!review.isSpoiler) {
  //           nonSpoilerReviews.push(review);
  //         }
  
  //         // 최대 3개를 채우면 종료
  //         if (nonSpoilerReviews.length >= 3) break;
  //       }
  
  //       // 최대 3개를 채우면 바깥 루프 종료
  //       if (nonSpoilerReviews.length >= 3) break;
  //     }
  
  //     // 최신순 정렬 (createdAt 기준 내림차순)
  //     const sortedReviews = nonSpoilerReviews
  //       .sort(
  //         (a: Review, b: Review) =>
  //           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //       )
  //       .slice(0, 3); // 최대 3개까지 가져오기
  
  //     // 상태 업데이트
  //     setTotalReviews(nonSpoilerReviews.length);
  //     setReviews(sortedReviews);
  
  //     console.log("✅ 스포일러 제외 최신순 리뷰 3개:", sortedReviews);
  //   }
  // }, [lineReviewsIsLoading, lineReviews]);

  // useEffect(() => {
  //   const fetchAllReviews = async () => {
  //     const nonSpoilerReviews: Review[] = [];
  //     let pageNumber = 0;
  //     let hasNextPage = true;
  //     const fetchedIds = new Set<number>();
  
  //     try {
  //       while (nonSpoilerReviews.length < 3 && hasNextPage) {
  //         console.log(`📢 Fetching page: ${pageNumber}`);
          
  //         const response = await fetchLineReviewMovie(Number(id), pageNumber, "", "LATEST");
  
  //         // 리뷰 데이터 가져오기
  //         const reviews: Review[] = response.data.content || [];
  //         console.log(`✅ Page ${pageNumber} data:`, reviews);
  
  //         // 스포일러 제외 및 중복 체크
  //         reviews.forEach((review) => {
  //           if (!fetchedIds.has(review.id) && !review.isSpoiler) {
  //             fetchedIds.add(review.id);
  //             nonSpoilerReviews.push(review);
  //           }
  //         });
  
  //         // 페이지 상태 업데이트
  //         hasNextPage = !response.data.last; // 마지막 페이지 확인
  //         pageNumber += 1;
  
  //         // 3개를 채우면 즉시 종료
  //         if (nonSpoilerReviews.length >= 3) {
  //           console.log("🎉 Fetched 3 non-spoiler reviews. Stopping.");
  //           break;
  //         }
  //       }
  
  //       // 상태 업데이트
  //       setReviews(nonSpoilerReviews.slice(0, 3));
  //       setTotalReviews(fetchedIds.size);
  
  //       console.log("📋 Final non-spoiler reviews:", nonSpoilerReviews);
  //     } catch (error) {
  //       console.error("❌ 리뷰 데이터를 가져오는 중 오류 발생:", error);
  //     }
  //   };
  
  //   fetchAllReviews();
  // }, [id]);

  useEffect(() => {
    console.log(movieDetail);
  }, [movieData]);

  return (
    movieData && (
      <>
        <SEO
          title={`${movieData.title}(${movieData.release_date.split("-")[0]
            })`}
          description={movieData.overview}
          image={`${import.meta.env.VITE_TMDB_IMAGE_URL}/${movieData.poster_path
            }`}
          url={location.pathname}
        />

        <MovieDetailContainer>
          <MovieHeader />
          <MoviePoster
            imageUrl={`${import.meta.env.VITE_TMDB_IMAGE_URL}${movieData.backdrop_path
              }`}
            title={movieData.title}
            year={new Date(movieData.release_date).getFullYear()} // 년도만 추출
            // nation="N/A" // nation 정보가 없다면 기본값 설정
            genre={
              movieData.genres
                .map((movieGenre: any) => {
                  // movieData.genres의 id와 genresSelector의 genreId를 매칭
                  const genreInfo = genres.find(
                    (genre: any) => genre.genreId === movieGenre.id
                  );
                  return genreInfo ? genreInfo.name : null; // 매칭된 장르 이름 반환
                })
                .filter(Boolean) // 유효한 값만 필터링
                .join("/") || "Unknown Genre" // 장르 이름을 "/"로 연결하고 기본값 설정
            }
            ott={movieData.availablePlatforms} // OTT 서비스 정보
          />

          <MovieRating
            rating={movieData.rating || 0}
            initialLike={likeActive} // movie_info에서 가져온 초기 좋아요 상태
            movieId={movieData.id} // 영화 ID
          />

          <MovieInfo
            content={movieData.overview}
            castData={[
              // 감독 정보를 먼저 추가
              ...movieData.credits.directingCrew.map((crew: any) => ({
                name: crew.name,
                role: crew.job,
                image: crew.profile_path,
              })),
              // 그다음 배우 정보 추가
              ...movieData.credits.cast.map((actor: any) => ({
                name: actor.name,
                role: actor.character,
                image: actor.profile_path,
              })),
            ]}
          />

          <ReviewHeader>
            <Title>한줄평</Title>
            <ReviewCountContainer>
              <ReviewCount>{totalReviews}</ReviewCount>{" "}
              {/* 전체 리뷰 개수 출력 */}
              <PlusSvg />
            </ReviewCountContainer>
          </ReviewHeader>

          {/* 리뷰 데이터 매핑 */}
          {reviews.length === 0 ? (
            <EmptyText>현재 등록된 한줄평이 없습니다.</EmptyText>
          ) : (
            reviews.map((review, index) => (
              <MovieReview
                key={review.id}
                movieId={Number(id)}
                review={review} // 개별 review 객체 전달
                noBorder={index === reviews.length - 1} // 마지막 리뷰인지 여부 전달
              />
            ))
          )}
          {/* 전체 리뷰 개수가 0이 아닐 때만 버튼 렌더링 */}
          {totalReviews > 0 ? (
            <Button
              btnType="More"
              label="모두 보기"
              onClick={handleReviewClick}
            />
          ) : (
            <Button
              btnType="More"
              label="작성하러 가기"
              onClick={handleReviewClick}
            />
          )}

          <MovieFooter
            year={movieData.release_date.split("-")[0]}
            // production="N/A" // 제작 정보가 없으므로 기본값 설정
            // age="N/A" // 연령 제한 정보가 없으므로 기본값 설정
            genre={
              movieData.genres
                .map((movieGenre: any) => {
                  // movieData.genres의 id와 genresSelector의 genreId를 매칭
                  const genreInfo = genres.find(
                    (genre: any) => genre.genreId === movieGenre.id
                  );
                  return genreInfo ? genreInfo.name : null; // 매칭된 장르 이름 반환
                })
                .filter(Boolean) // 유효한 값만 필터링
                .join("/") || "Unknown Genre" // 장르 이름을 "/"로 연결하고 기본값 설정
            }
          />
        </MovieDetailContainer>
      </>
    )
  );
}

export default MovieDetail;

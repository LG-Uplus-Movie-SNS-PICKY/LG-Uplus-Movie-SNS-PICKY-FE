// pages/movie-detail/index.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "./index.styles";
import { Button } from "@stories/button";
import { useNavigate, useParams } from "react-router-dom";
import PlusSvg from "@assets/icons/plus.svg?react";
import SEO from "@components/seo";
import { useRecoilValueLoadable } from "recoil";
import { genresSelector } from "@recoil/selectors/genresSelector";

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
}

function MovieDetail(props: MovieDetailProps) {
  const { id } = useParams(); // URL에서 movieId 추출
  console.log("movieId:", id); // movieId가 undefined인지 확인
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]); // 리뷰 상태 타입 지정
  const [totalReviews, setTotalReviews] = useState<number>(0); // 전체 한줄평 개수
  const [likeActive, setLikeActive] = useState<boolean>(false); // 좋아요 상태

  const loadable = useRecoilValueLoadable(genresSelector);

  const genres = loadable.contents.data;
  console.log(genres);

  const handleReviewClick = () => {
    navigate(`/movie/${id}/review`); // movieId 변수를 사용
  };

  // useEffect(() => {
  //   // API 호출
  //   const fetchMovieData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/${id}`,
  //         {
  //           headers: { Authorization: "123" },
  //         }
  //       ).then(res => res.data);

  //       console.log(response)

  //       setMovieData(response.movie_info); // API에서 반환된 데이터에 맞게 설정
  //       setLoading(false);
  //     } catch (err: any) {
  //       setError(err.response?.message || "Failed to fetch movie data");
  //       setLoading(false);
  //     }
  //   };

  //   fetchMovieData();
  // }, [id]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios
          .get(`${import.meta.env.VITE_SERVER_URL}/api/v1/movie/${id}`, {
            headers: { Authorization: "123" },
          })
          .then((res) => res.data);

        // cast와 directingCrew 정렬
        const sortedCast = response.movie_info.credits.cast.sort(
          (a: any, b: any) => a.id - b.id
        );
        const sortedDirectingCrew = response.movie_info.credits.directingCrew.sort(
          (a: any, b: any) => a.id - b.id
        );

        console.log(response); // API 응답 데이터 확인 move_info에 데이터가 있는지 확인

        // `like` 상태 가져오기
        setLikeActive(response.like || false); // response.like 값 설정 (true/false)

        // movieData에 정렬된 데이터 설정
        setMovieData({
          ...response.movie_info,
          credits: {
            ...response.movie_info.credits,
            cast: sortedCast,
            directingCrew: sortedDirectingCrew,
          },
        });

        setLoading(false);
      } catch (err: any) {
        console.error("영화 데이터 불러오기 실패", err);
        setError(err.response?.message || "Failed to fetch movie data");
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/linereview/movie/${id}`,
          {
            headers: { Authorization: "123" },
            params: { page: 1, limit: 100 }, // 충분한 데이터를 가져옴
          }
        );

        console.log("API 응답 데이터:", response.data);

        const allReviews = response.data.data as Review[];
        console.log("전체 리뷰 데이터:", allReviews);

        // 전체 리뷰 개수를 allReviews의 길이로 설정
        setTotalReviews(allReviews.length);

        const topLikedReviews = allReviews
          .filter((review: Review) => !review.isSpoiler) // 스포일러 제외
          .sort((a: Review, b: Review) => b.likes - a.likes) // 공감순 정렬
          .slice(0, 3); // 상위 3개 가져오기

        console.log("공감순 상위 3개 리뷰:", topLikedReviews);

        setReviews(topLikedReviews); // 공감순 상위 3개 리뷰 설정
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };

    fetchReviews();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movieData) {
    return <div>No movie data found</div>;
  }

  return (
    <>
      <SEO
        title={`${movieData.original_title}(${movieData.release_date.split("-")[0]})`}
        description={movieData.overview}
        image={movieData.poster_path}
        url={`http://localhost:5173/${location.pathname}`}
      />

      <MovieDetailContainer>
        <MovieHeader />
        <MoviePoster
          imageUrl={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}
          title={movieData.original_title}
          year={new Date(movieData.release_date).getFullYear()} // 년도만 추출
          nation="N/A" // nation 정보가 없다면 기본값 설정
          genre={movieData.genres
            .map((movieGenre: any) => {
              // genresSelector에서 가져온 전체 장르와 매칭
              const genreInfo = genres.find(
                (genre: any) => genre.genre_id === movieGenre.genre_id
              );
              return genreInfo ? genreInfo.genre_name : null;
            })
            .filter(Boolean) // 유효한 값만 필터링
            .join("/")} // 장르 이름을 /로 연결
          ott={["Netflix", "DisneyPlus", "Watcha"]}
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
              name: crew.original_name,
              role: crew.job,
              image: crew.profile_path,
            })),
            // 그다음 배우 정보 추가
            ...movieData.credits.cast.map((actor: any) => ({
              name: actor.original_name,
              role: actor.character,
              image: actor.profile_path,
            })),
          ]}
        />
        <ReviewHeader>
          <Title>관람평</Title>
          <ReviewCountContainer>
            <ReviewCount>{totalReviews}</ReviewCount> {/* 전체 리뷰 개수 출력 */}
            <PlusSvg />
          </ReviewCountContainer>
        </ReviewHeader>
        <MovieReview reviews={reviews} />
        <Button btnType="More" label="모두 보기" onClick={handleReviewClick} />
        <MovieFooter
          year={movieData.release_date.split("-")[0]}
          production="N/A" // 제작 정보가 없으므로 기본값 설정
          age="N/A" // 연령 제한 정보가 없으므로 기본값 설정
          genre={movieData.genres
            .map((movieGenre: any) => {
              // genresSelector에서 가져온 전체 장르와 매칭
              const genreInfo = genres.find(
                (genre: any) => genre.genre_id === movieGenre.genre_id
              );
              return genreInfo ? genreInfo.genre_name : null;
            })
            .filter(Boolean) // 유효한 값만 필터링
            .join("/")} // 장르 이름을 /로 연결
        />
      </MovieDetailContainer>
    </>
  );
}

export default MovieDetail;

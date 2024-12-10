/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  containerStyle,
  headerStyle,
  titleStyle,
  highlightStyle,
  subtitleStyle,
  movieContainerStyle,
  movieGridStyle,
  movieCardStyle,
  movieImageStyle,
  movieTitleStyle,
  movieRatingStyle,
  headerWrapperStyle,
} from "./index.styles";
import SEO from "@components/seo";

interface Movie {
  movieId: number;
  title: string;
  posterUrl: string;
  totalRating: number;
}

export default function MovieRecommendationPage() {
  const username = "최우진";
  const TMDB_IMAGE_PREFIX = "https://image.tmdb.org/t/p/w185";
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const accessToken = sessionStorage.getItem("accessToken");

  const fetchRecommendedMovies = useCallback(async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/recommend`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("받아온 영화 추천 데이터:", response.data);

      const movieData = response.data.data.map((movie: Movie) => ({
        movieId: movie.movieId,
        title: movie.title,
        posterUrl: `${TMDB_IMAGE_PREFIX}${movie.posterUrl}`,
        totalRating: movie.totalRating,
      }));

      setMovies(movieData);
      setError(null);
    } catch (err) {
      console.error("영화 추천 데이터를 가져오는 중 오류 발생:", err);
      setError("영화 추천 데이터를 불러오는 데 문제가 발생했습니다.");
    }
  }, [accessToken]);

  useEffect(() => {
    fetchRecommendedMovies();
  }, [fetchRecommendedMovies]);

  const handleMovieClick = (id: number) => {
    navigate(`/movie/${id}`);
  };

  return (
    <>
      <SEO
        title="PICKY: RECOMMENDATION"
        description="사용자님에게 추천하는 PICKY 영화 목록들을 확인해보세요"
      />

      <div css={containerStyle}>
        {/* 헤더 */}
        <div css={headerWrapperStyle}>
          <header css={headerStyle}>
            <h1 css={titleStyle}>
              🧸 PICKY가 <span css={highlightStyle}>까탈스럽게</span> 골라낸
              맞춤형 AI 영화 추천
            </h1>
            <h2 css={subtitleStyle}>
              <b>{username}</b>님이 선호하는 장르의 작품들
            </h2>
          </header>
        </div>
        {/* 영화 리스트 */}
        <div css={movieContainerStyle}>
          {error ? (
            <div style={{ color: "red", textAlign: "center" }}>{error}</div>
          ) : movies.length === 0 ? (
            <p>추천할 영화가 없습니다. 나중에 다시 시도해주세요.</p>
          ) : (
            <div css={movieGridStyle}>
              {movies.map((movie) => (
                <div
                  key={movie.movieId}
                  onClick={() => handleMovieClick(movie.movieId)}
                  css={movieCardStyle}
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    css={movieImageStyle}
                  />
                  <div css={movieTitleStyle}>{movie.title}</div>
                  <div css={movieRatingStyle}>
                   {movie.totalRating}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
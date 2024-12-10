/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MovieItem } from "@stories/movie-item";
import {
  containerStyle,
  headerStyle,
  titleStyle,
  highlightStyle,
  subtitleStyle,
  movieContainerStyle,
  movieWrapperStyle,
  headerWrapperStyle,
} from "./index.styles";
import SEO from "@components/seo";

interface Movie {
  movieId: number;
  title: string;
  posterUrl: string;
}

export default function MovieRecommendationPage() {
  const username = "최우진";
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

      // 데이터 매핑
      const movieData = response.data.data.map((movie: Movie) => ({
        movieId: movie.movieId,
        title: movie.title,
        posterUrl: movie.posterUrl,
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
        url="http://location:5173/recommendation"
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

        {error && (
          <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
            {error}
          </div>
        )}

        {/* 영화 리스트 */}
        {!error && movies.length > 0 && (
          <div css={movieContainerStyle}>
            <div css={movieWrapperStyle}>
              {movies.map((movie) => (
                <div
                  key={movie.movieId}
                  onClick={() => handleMovieClick(movie.movieId)}
                  style={{ cursor: "pointer" }}
                >
                  <MovieItem
                    type="rate"
                    src={movie.posterUrl}
                    title={movie.title}
                    name={movie.title}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

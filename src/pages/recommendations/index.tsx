/** @jsxImportSource @emotion/react */
import React from "react";
import { useNavigate } from "react-router-dom";
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

export default function MovieRecommendationPage() {
  const username = "최우진";
  const navigate = useNavigate();

  const movies = [
    {
      id: 1,
      type: "rate",
      src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
      title: "타이타닉",
      name: "타이타닉",
    },
    {
      id: 2,
      type: "rate",
      src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
      title: "인사이드 아웃 2",
      name: "인사이드 아웃 2",
    },
    {
      id: 3,
      type: "rate",
      src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
      title: "어바웃 타임",
      name: "어바웃 타임",
    },
  ];

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

        {/* 영화 리스트 */}
        <div css={movieContainerStyle}>
          {[...Array(4)].map((_, rowIndex) => (
            <div css={movieWrapperStyle} key={rowIndex}>
              {movies.map((movie, index) => (
                <div
                  key={`${rowIndex}-${index}`}
                  onClick={() => handleMovieClick(movie.id)}
                  style={{ cursor: "pointer" }}
                >
                  <MovieItem
                    type="rate"
                    src={movie.src}
                    title={movie.title}
                    name={movie.name}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

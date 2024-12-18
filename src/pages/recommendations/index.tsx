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
  headerWrapperStyle,
} from "./index.styles";
import SEO from "@components/seo";
import { MovieItem } from "@stories/movie-item";
import { useRecommnedMovieQuery } from "@hooks/movie";
import { useRecoilValue } from "recoil";
import { isLogin } from "@recoil/atoms/isLoginState";
import Loading from "@components/loading";
import { RecommendMovieDataTypes } from "@type/api/movie";

interface Movie {
  movieId: number;
  title: string;
  posterUrl: string;
  totalRating: number;
}

export default function MovieRecommendationPage() {
  const { data, isLoading } = useRecommnedMovieQuery();
  const { isLoginInfo } = useRecoilValue(isLogin);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) console.log(data);
  }, [isLoading]);

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
              <b>{isLoginInfo.nickname}</b>님이 선호하는 장르의 작품들
            </h2>
          </header>
        </div>

        {/* 영화 리스트 */}
        <div css={movieContainerStyle}>
          {isLoading && <Loading />}
          {!isLoading && data.data.length === 0 ? (
            <p>추천할 영화가 없습니다. 나중에 다시 시도해주세요.</p>
          ) : (
            <div css={movieGridStyle}>
              {data?.data.map((movie: RecommendMovieDataTypes) => (
                <div
                  key={movie.movieId}
                  onClick={() => navigate(`/movie/${movie.movieId}`)}
                  style={{ cursor: "pointer" }}
                >
                  <MovieItem
                    type="basic"
                    src={movie.posterUrl}
                    title={movie.title}
                    rate={movie.totalRating}
                    name={movie.title}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

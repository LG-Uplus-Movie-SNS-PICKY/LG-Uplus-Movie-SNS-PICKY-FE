/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { inputState } from "../../../../review/atoms";
import {
  wrapper,
  pageContainer,
  titleWrapper,
  titleContainer,
  genreGrid,
  title,
  subtitle,
  requiredBadge,
  TextWrapper,
  Warning,
} from "./index.styles";

import GenreButtons from "@components/genre";

const MovieGenreSelector = () => {
  const [inputData, setInputData] = useRecoilState(inputState);
  const [isValid, setIsValid] = useState(true);

  const validateGenres = useCallback(() => {
    const genreCount = inputData.favoriteGenres.length;
    return genreCount >= 3 && genreCount <= 5;
  }, [inputData.favoriteGenres]);

  const toggleGenre = (id: number) => {
    setInputData((prev) => {
      const updatedGenres = prev.favoriteGenres.includes(id)
        ? prev.favoriteGenres.filter((genreId) => genreId !== id)
        : prev.favoriteGenres.length < 5
        ? [...prev.favoriteGenres, id]
        : prev.favoriteGenres;

      return {
        ...prev,
        favoriteGenres: updatedGenres,
      };
    });
  };

  useEffect(() => {
    setIsValid(validateGenres());
  }, [inputData.favoriteGenres, validateGenres]);

  return (
    <div css={wrapper}>
      <div css={pageContainer}>
        <div css={titleWrapper}>
          <div css={titleContainer}>
            <h2 css={title}>🧸 좋아하는 영화 장르를 선택해 주세요.</h2>
            <span css={requiredBadge}>필수</span>
          </div>
          <span css={subtitle}>
            평소 좋아하는 영화 장르를 골라주세요.(3개~5개)
          </span>
        </div>
        <div css={genreGrid}>
        <GenreButtons
            onClick={toggleGenre}
          />
        </div>
      </div>
      <div css={TextWrapper} style={{ height: "20px" }}>
        <div
          css={Warning}
          style={{ visibility: isValid ? "hidden" : "visible" }}
        >
        </div>
      </div>
    </div>
  );
};

export default MovieGenreSelector;

/** @jsxImportSource @emotion/react */
import React from "react";
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
  genreGroup,
  requiredBadge,
  genreButton,
} from "./index.styles";

const genres = [
  { id: 1, name: "액션", emoji: "🥊" },
  { id: 2, name: "로맨스", emoji: "❤️" },
  { id: 8, name: "뮤지컬", emoji: "🎹" },
  { id: 3, name: "코미디", emoji: "🤣" },
  { id: 5, name: "범죄", emoji: "🦹" },
  { id: 7, name: "애니메이션", emoji: "💥" },
  { id: 6, name: "다큐", emoji: "🤔" },
  { id: 10, name: "호러", emoji: "🧟" },
  { id: 4, name: "드라마", emoji: "🎭" },
  { id: 9, name: "스릴러", emoji: "🎢" },
  { id: 11, name: "SF", emoji: "‍🌫️" },
  { id: 12, name: "판타지", emoji: "🧙‍♂️" },
];

const MovieGenreSelector = () => {
  const [inputData, setInputData] = useRecoilState(inputState);

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

  const chunkedGenres = [];
  for (let i = 0; i < genres.length; i += 4) {
    chunkedGenres.push(genres.slice(i, i + 4));
  }

  return (
    <div css={wrapper}>
      <div css={pageContainer}>
        <div css={titleWrapper}>
          <div css={titleContainer}>
            <h2 css={title}>좋아하는 영화 장르를 선택해 주세요 🧸</h2>
            <span css={requiredBadge}>필수</span>
          </div>
          <span css={subtitle}>평소 좋아하는 영화 장르를 골라주세요.(1개~5개)</span>
        </div>
        {chunkedGenres.map((group, index) => (
          <div key={index} css={genreGroup}>
            <div css={genreGrid}>
              {group.map((genre) => (
                <button
                  key={genre.id}
                  css={genreButton(inputData.favoriteGenres.includes(genre.id))}
                  onClick={() => toggleGenre(genre.id)}
                >
                  {genre.emoji} {genre.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGenreSelector;

/** @jsxImportSource @emotion/react */
import React from "react";
import { useRecoilState } from "recoil";
import Emoji from "../emoji";
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

import action from "@assets/images/action.png";
import romance from "@assets/images/romance.png";
import musical from "@assets/images/musical.png";
import comedy from "@assets/images/comedy.png";
import crime from "@assets/images/crime.png";
import animation from "@assets/images/animation.png";
import documentary from "@assets/images/documentary.png";
import horror from "@assets/images/horror.png";
import darama from "@assets/images/drama.png";
import thriller from "@assets/images/thriller.png";
import sf from "@assets/images/sf.png";
import fantasy from "@assets/images/fantasy.png";

const genres = [
  { id: 1, name: "액션", emoji: <Emoji src={action} alt="액션" /> },
  { id: 2, name: "로맨스", emoji: <Emoji src={romance} alt="로맨스" /> },
  { id: 3, name: "코미디", emoji: <Emoji src={comedy} alt="코미디" /> },
  { id: 4, name: "드라마", emoji: <Emoji src={darama} alt="드라마" /> },
  { id: 5, name: "범죄", emoji: <Emoji src={crime} alt="범죄" /> },
  { id: 6, name: "다큐멘터리", emoji: <Emoji src={documentary} alt="다큐" /> },
  { id: 7, name: "애니메이션", emoji: <Emoji src={animation} alt="애니메이션" />},
  { id: 8, name: "뮤지컬", emoji: <Emoji src={musical} alt="뮤지컬" /> },
  { id: 9, name: "스릴러", emoji: <Emoji src={thriller} alt="스릴러" /> },
  { id: 10, name: "호러", emoji: <Emoji src={horror} alt="호러" /> },
  { id: 11, name: "SF", emoji: <Emoji src={sf} alt="SF" /> },
  { id: 12, name: "판타지", emoji: <Emoji src={fantasy} alt="판타지" /> },
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
            <h2 css={title}>🧸 좋아하는 영화 장르를 선택해 주세요.</h2>
            <span css={requiredBadge}>필수</span>
          </div>
          <span css={subtitle}>
            평소 좋아하는 영화 장르를 골라주세요.(3개~5개)
          </span>
        </div>
        {/* {chunkedGenres.map((group, index) => (
          <div key={index} css={genreGroup}>
            <div css={genreGrid}>
              {group.map((genre) => (
                <button
                  key={genre.id}
                  css={genreButton(inputData.favoriteGenres.includes(genre.id))}
                  onClick={() => toggleGenre(genre.id)}
                >
                  <span
                    css={{ display: "flex", alignItems: "center", gap: "4px" }}
                  >
                    {genre.emoji}
                    {genre.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))} */}
        <div css={genreGrid}>
        {genres.map((genre) => (
          <button
            key={genre.id}
            css={genreButton(inputData.favoriteGenres.includes(genre.id))}
            onClick={() => toggleGenre(genre.id)}
          >
            <span
              css={{ display: "flex", alignItems: "center", gap: "2px" }}
            >
              {genre.emoji}
              {genre.name}
            </span>
          </button>
        ))}
      </div>
      </div>
    </div>
  );
};

export default MovieGenreSelector;

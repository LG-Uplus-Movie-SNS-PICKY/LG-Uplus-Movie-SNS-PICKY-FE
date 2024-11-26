import React from "react";
import { inputState } from "../../../../review/atoms";
import { useRecoilState } from "recoil";
import {PageContainer, TitleContainer, GenreGrid,Title, Subtitle, GenreGroup, RequiredBadge, GenreButton} from "./index.styles"

const genres = [
  { id: 1, name: "액션", emoji: "🥊" },
  { id: 2, name: "로맨스", emoji: "👩‍❤️‍💋‍👨" },
  { id: 3, name: "코미디", emoji: "🤣" },
  { id: 4, name: "드라마", emoji: "🎭" },
  { id: 5, name: "범죄", emoji: "🦹" },
  { id: 6, name: "다큐멘터리", emoji: "🤔" },
  { id: 7, name: "애니메이션", emoji: "💥" },
  { id: 8, name: "뮤지컬", emoji: "🎹" },
  { id: 9, name: "스릴러", emoji: "🎢" },
  { id: 10, name: "호러", emoji: "🧟" },
  { id: 11, name: "SF(공상과학)", emoji: "‍🌫️" },
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
    <PageContainer>
              <TitleContainer>
          <Title>좋아하는 영화 장르를 선택해주세요. 🧸</Title>
          <RequiredBadge>필수</RequiredBadge>
        </TitleContainer>
        <Subtitle>평소 좋아하는 영화를 골라주세요.(1개~5개)</Subtitle>
        <Subtitle $small>
        선택된 장르 기반으로 추천해드리며, 마이페이지에서 변경 가능합니다.
        </Subtitle>
      {chunkedGenres.map((group, index) => (
        <GenreGroup key={index}>
          <GenreGrid>
            {group.map((genre) => (
              <GenreButton
                key={genre.id}
                $isSelected={inputData.favoriteGenres.includes(genre.id)}
                onClick={() => toggleGenre(genre.id)}
              >
                {genre.emoji} {genre.name}
              </GenreButton>
            ))}
          </GenreGrid>
        </GenreGroup>
      ))}
    </PageContainer>
  );
};

export default MovieGenreSelector;
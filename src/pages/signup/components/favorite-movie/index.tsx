import React, { useState } from "react";
import { useRecoilState } from "recoil";
import aboutTime from "../../../../assets/images/Rectangle 2.jpg";
import { Block } from "../ui";
import { ArrowLeft, ArrowRight } from "../../../../assets/svg";
import { inputState } from "../../../../review/atoms";
import {
  MovieTitle,
  MovieImage,
  MovieCard,
  NextButton,
  PreviousButton,
  CheckIcon,
  MovieGrid,
  MovieGridWrapper,
  TotalPages,
  Header,
  TitleContainer,
  Title,
  RequiredBadge,
  Subtitle,
  PageIndicator,
  CurrentPage,
} from "./index.styles";

const MOVIES = [
  { id: 1, title: "어바웃타임", image: aboutTime },
  { id: 2, title: "인사이드아웃2", image: aboutTime },
  { id: 3, title: "타이타닉", image: aboutTime },
  { id: 4, title: "인터스텔라", image: aboutTime },
  { id: 5, title: "라라랜드", image: aboutTime },
  { id: 6, title: "기생충", image: aboutTime },
  { id: 7, title: "어벤져스", image: aboutTime },
  { id: 8, title: "겨울왕국", image: aboutTime },
  { id: 9, title: "미션임파서블", image: aboutTime },
  { id: 10, title: "미션임파서블", image: aboutTime },
  { id: 11, title: "미션임파서블", image: aboutTime },
  { id: 12, title: "미션임파서블", image: aboutTime },
  { id: 13, title: "미션임파서블", image: aboutTime },
  { id: 14, title: "미션임파서블", image: aboutTime },
  { id: 15, title: "미션임파서블", image: aboutTime },
  { id: 16, title: "미션임파서블", image: aboutTime },
  { id: 17, title: "미션임파서블", image: aboutTime },
  { id: 18, title: "미션임파서블", image: aboutTime },
];

const InputFavoriteMovie: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputData, setInputData] = useRecoilState(inputState);

  const moviesPerPage = 9;

  const toggleSelection = (id: number) => {
    setInputData((prev) => {
      const updatedMovies = prev.favoriteMovie.includes(id)
        ? prev.favoriteMovie.filter((movieId) => movieId !== id)
        : [...prev.favoriteMovie, id].slice(0, 10); // 최대 10개 제한
      return { ...prev, favoriteMovie: updatedMovies };
    });
  };

  const totalPages = Math.ceil(MOVIES.length / moviesPerPage);
  const paginatedMovies = MOVIES.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  return (
    <Block.FlexBox $width="20%" $direction="column" $gap="10px">
      <Header>
        <TitleContainer>
          <Title>어떤 영화를 좋아하나요?</Title>
          <RequiredBadge>필수</RequiredBadge>
        </TitleContainer>
        <Subtitle>평소 좋아하는 영화를 골라주세요.(5개 ~ 10개)</Subtitle>
        <Subtitle $small>
          선택된 영화 기반으로 추천해 드리며, 추천 페이지에서 변경 가능
        </Subtitle>
        <PageIndicator>
          <CurrentPage>{currentPage}</CurrentPage> /{" "}
          <TotalPages>{totalPages}</TotalPages>
        </PageIndicator>
      </Header>

      <MovieGridWrapper>
        <PreviousButton
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeft />
        </PreviousButton>

        <MovieGrid>
          {paginatedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              $isSelected={inputData.favoriteMovie.includes(movie.id)}
              onClick={() => toggleSelection(movie.id)}
            >
              <MovieImage
                src={movie.image}
                alt={movie.title}
                $isSelected={inputData.favoriteMovie.includes(movie.id)}
              />
              <CheckIcon
                $isVisible={inputData.favoriteMovie.includes(movie.id)}
              />
              <MovieTitle>{movie.title}</MovieTitle>
            </MovieCard>
          ))}
        </MovieGrid>

        <NextButton
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          <ArrowRight />
        </NextButton>
      </MovieGridWrapper>
    </Block.FlexBox>
  );
};

export default InputFavoriteMovie;
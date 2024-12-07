import React, { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { inputState } from "../../../../review/atoms";
import { ArrowLeft, ArrowRight, Checked } from "../../../../assets/svg";
import {
  consentWrapper,
  wrapper,
  titleWrapper,
  titleContainer,
  title,
  requiredBadge,
  subtitle,
  TextWrapper,
  Warning,
  totalContainer,
  pageIndicator,
  currentPage,
  totalPages,
  movieGridWrapper,
  movieGrid,
  movieCard,
  movieImage,
  checkIcon,
  previousButton,
  nextButton,
  movieTitle,
  selectedCount,
} from "./index.styles";

const TMDB_IMAGE_PREFIX = "https://image.tmdb.org/t/p/w185";

const InputFavoriteMovie: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [inputData, setInputData] = useRecoilState(inputState);
  const [isValid, setIsValid] = useState(true);
  const [movies, setMovies] = useState<
    { movieId: number; title: string; posterUrl: string }[]
  >([]);

  const moviesPerPage = 9;

  const fetchMovies = useCallback(async () => {
    if (inputData.favoriteGenres.length === 0) {
      console.warn("장르 ID가 없습니다. API 호출을 건너뜁니다.");
      return;
    }

    try {
      console.log("보내는 장르 ID 값:", inputData.favoriteGenres);
      const accessToken = sessionStorage.getItem("accessToken");
      console.log("보내는 장르 ID:", accessToken);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user/movies-by-genres`,
        {
          genreIds: inputData.favoriteGenres,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("받아온 영화 데이터:", response.data);

      // 응답 데이터의 타입 정의
      type Movie = {
        movieId: number;
        title: string;
        posterUrl: string;
      };

      // 데이터가 배열인지 확인하고 타입 적용
      const moviesData: Movie[] = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];

      // 이미지 URL 앞에 TMDB_IMAGE_PREFIX 추가
      const processedMovies = moviesData.map((movie: Movie) => ({
        ...movie,
        posterUrl: `${TMDB_IMAGE_PREFIX}${movie.posterUrl}`,
      }));
      setMovies(processedMovies);
    } catch (error) {
      console.error("영화를 가져오는 중 오류 발생:", error);
      alert(
        "영화 데이터를 가져오는 데 문제가 발생했습니다. 다시 시도해주세요."
      );
      setMovies([]);
    }
  }, [inputData.favoriteGenres]);

  const validateSelection = useCallback(() => {
    const selectedCount = inputData.favoriteMovie.length;
    return selectedCount >= 5 && selectedCount <= 10;
  }, [inputData.favoriteMovie]);

  const toggleSelection = (id: number) => {
    setInputData((prev) => {
      const updatedMovies = prev.favoriteMovie.includes(id)
        ? prev.favoriteMovie.filter((movieId) => movieId !== id)
        : [...prev.favoriteMovie, id].slice(0, 10);
      return { ...prev, favoriteMovie: updatedMovies };
    });
  };

  const total = Math.ceil(movies.length / moviesPerPage);
  const paginatedMovies = movies.slice(
    (current - 1) * moviesPerPage,
    current * moviesPerPage
  );

  useEffect(() => {
    setIsValid(validateSelection());
  }, [inputData.favoriteMovie, validateSelection]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const fillEmptySlots = Array.from(
    { length: moviesPerPage - paginatedMovies.length },
    (_, index) => <div key={`placeholder-${index}`} css={movieCard(false)} />
  );

  return (
    <div css={consentWrapper}>
      <div css={wrapper}>
        <div css={titleWrapper}>
          <div css={titleContainer}>
            <h2 css={title}>어떤 영화를 좋아하나요?</h2>
            <span css={requiredBadge}>필수</span>
          </div>
          <div css={subtitle}>평소 좋아하는 영화를 골라주세요.(5개 ~ 10개)</div>
        </div>
      </div>

      <div css={totalContainer}>
        <div css={pageIndicator}>
          <div
            css={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div css={selectedCount}>
              선택된 영화:{" "}
              <span css={{ color: "#FF084A" }}>
                {inputData.favoriteMovie.length}
              </span>
              개
            </div>
            <div>
              <span css={currentPage}>{current}</span>
              {" / "}
              <span css={totalPages}>{total}</span>
            </div>
          </div>
        </div>

        <div css={movieGridWrapper}>
          {total > 0 && (
            <>
              <button
                css={previousButton}
                onClick={() => setCurrent((prev) => prev - 1)}
                disabled={current === 1}
              >
                <ArrowLeft />
              </button>

              <div css={movieGrid}>
                {paginatedMovies.map(
                  (movie: {
                    movieId: number;
                    title: string;
                    posterUrl: string;
                  }) => (
                    <div
                      key={movie.movieId}
                      css={movieCard(
                        inputData.favoriteMovie.includes(movie.movieId)
                      )}
                      onClick={() => toggleSelection(movie.movieId)}
                    >
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        css={movieImage(
                          inputData.favoriteMovie.includes(movie.movieId)
                        )}
                      />
                      {inputData.favoriteMovie.includes(movie.movieId) && (
                        <div css={checkIcon(true)}>
                          <Checked />
                        </div>
                      )}
                      <p css={movieTitle}>
                        {movie.title.length > 8
                          ? `${movie.title.slice(0, 6)}...`
                          : movie.title}
                      </p>
                    </div>
                  )
                )}
                {fillEmptySlots}
              </div>

              <button
                css={nextButton}
                onClick={() => setCurrent((prev) => prev + 1)}
                disabled={current === total}
              >
                <ArrowRight />
              </button>
            </>
          )}
        </div>
      </div>
      <div
        css={TextWrapper}
        style={{ height: "20px", justifyContent: "center" }}
      >
        <div
          css={Warning}
          style={{ visibility: isValid ? "hidden" : "visible" }}
        >
          영화는 최소 5개에서 10개를 골라주세요.
        </div>
      </div>
    </div>
  );
};

export default InputFavoriteMovie;

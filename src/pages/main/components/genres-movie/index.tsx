import styles from "./index.styles";

import teddy from "@assets/images/teddy.png";
import bestMovies from "@pages/main/constants";

// 공통 컴포넌트 import
import { MovieItem } from "@stories/movie-item";
import Emoji from "@pages/signup/components/emoji";
import GenreButtons from "@components/genre";
import { useEffect, useState } from "react";
import { useGenreMovieQuery } from "@hooks/movie";
import Loading from "@components/loading";
import { MovieDataTypes } from "@type/api/movie";
import { useNavigate } from "react-router-dom";

function GenresMovie({ isLogin }: { isLogin: boolean }) {
  const navigate = useNavigate();
  const [selectButton, setSelectButton] = useState<number>(0);
  const { data: genreMovies, isLoading } = useGenreMovieQuery(selectButton);

  // 장르 버튼 최초 로드 시에 초기값 설정
  const handleInitialGenre = (movieId: number) => {
    if (!selectButton) {
      setSelectButton(movieId);
    }
  };

  // 다른 장르 버튼 클릭 시 해당 장르 영화 변경
  const GenreOnClick = (movieId: number) => {
    setSelectButton(movieId);
  };

  return (
    <div css={styles.genreContainer()}>
      <div css={styles.genreCard()}>
        {/* Title */}
        <div className="title">
          <Emoji src={teddy} alt="teddy" width="16px" height="16px" />
          <span>PICKY가 추천하는 장르별 맞춤 영화</span>
        </div>

        {/* Genres Button */}
        <div className="genres">
          <GenreButtons
            onClick={GenreOnClick}
            selectedGenres={selectButton}
            onInitialGenre={handleInitialGenre}
          />
        </div>

        {/* Select Genre Movies */}
        <div className={`select-genre ${isLoading ? "is-loading" : ""}`}>
          {isLoading && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loading />
            </div>
          )}
          {!isLoading && Array.isArray(genreMovies?.pages[0].data.content)
            ? genreMovies?.pages[0].data.content
                .slice(0, 9)
                .map((movie: MovieDataTypes) => (
                  <MovieItem
                    key={movie.movieId}
                    type={isLogin ? "all" : "rate"}
                    src={movie.posterUrl}
                    title={movie.title}
                    name={movie.title}
                    rate={movie.totalRating}
                    like={movie.likes}
                    comment={movie.lineReviews}
                    onClick={() => navigate(`/movie/${movie.movieId}`)}
                  />
                ))
            : null}
        </div>

        {isLogin && (
          <div className="more-genre-movies">
            <button onClick={() => navigate(`/genre/${selectButton}`)}>
              더보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GenresMovie;

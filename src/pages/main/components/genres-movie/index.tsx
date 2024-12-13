import styles from "./index.styles";

import teddy from "@assets/images/teddy.png";
import bestMovies from "@pages/main/constants";

// 공통 컴포넌트 import
import { MovieItem } from "@stories/movie-item";
import Emoji from "@pages/signup/components/emoji";
import GenreButtons from "@components/genre";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function GenresMovie() {
  const navigate = useNavigate();
  const [selectButton, setSelectButton] = useState<number>(0);

  // 장르 버튼 최초 로드 시에 초기값 설정
  const handleInitialGenre = (movieId: number) => {
    if (!selectButton) {
      setSelectButton(movieId);
    }
  };

  // 다른 장르 버튼 클릭 시 해당 장르 영화 변경
  const GenreOnClick = (id: number) => {
    setSelectButton(id);
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
        <div className="select-genre">
          {bestMovies.length > 0 &&
            bestMovies
              .slice(0, 6)
              .map((movie, idx) => (
                <MovieItem
                  key={idx}
                  type="rate"
                  src={movie.src}
                  title={movie.title}
                  name={movie.name}
                  rate={movie.rate}
                  like={movie.like}
                  comment={movie.comment}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default GenresMovie;

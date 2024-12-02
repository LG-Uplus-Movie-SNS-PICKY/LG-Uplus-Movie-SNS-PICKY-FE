import styles from "./index.styles";

import teddy from "@assets/images/teddy.png";
import bestMovies from "@pages/main/constants";

// 공통 컴포넌트 import
import { MovieItem } from "@stories/movie-item";
import Emoji from "@pages/signup/components/emoji";
import GenreButtons from "@components/genre";

function GenresMovie() {
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
          <GenreButtons />
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

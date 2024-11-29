import styles from "./index.styles";
import EmojiRender from "@components/emoji-render";

import bestMovies from "@pages/main/constants";
import { MovieItem } from "@stories/movie-item";

function GenresMovie() {
  return (
    <div css={styles.genreContainer()}>
      <div css={styles.genreCard()}>
        {/* Title */}
        <div className="title">
          <EmojiRender emoji="🧸" />
          <span>PICKY가 추천하는 장르별 맞춤 영화</span>
        </div>

        {/* Genres Button */}
        <div className="genres-btn"></div>

        {/* Select Genre Movies */}
        <div className="select-genre">
          {bestMovies.length > 0 &&
            bestMovies
              .slice(0, 6)
              .map((movie) => (
                <MovieItem
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

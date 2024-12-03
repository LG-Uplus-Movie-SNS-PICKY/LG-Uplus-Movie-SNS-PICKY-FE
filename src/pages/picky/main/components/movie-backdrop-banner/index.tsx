import { BestMovieTypes } from "../..";
import styles from "./index.styles";

interface MovieBackdropBanner {
  movie: BestMovieTypes;
}

function MovieBackdropBanner({ movie }: MovieBackdropBanner) {
  return (
    // Movie Backdrop Banner (Best Movie 평점 1등)
    <div css={styles.backdropBanner(movie.movie_backdrop_url)}>
      {/* Movie 그레디에이션 적용 */}
      <div className="shadow-box">
        {/* 영화 정보 기입 */}
        <div className="movie-info">
          <h3>{movie.movie_title}</h3>
          <div>
            <span>별점: ★ {movie.movie_total_rating.toFixed(1)}</span>
            <span>{movie.movie_genres.join(", ")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieBackdropBanner;

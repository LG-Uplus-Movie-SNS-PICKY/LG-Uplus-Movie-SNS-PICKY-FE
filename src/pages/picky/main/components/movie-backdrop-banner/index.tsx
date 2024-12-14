import { useTopMovieQuery } from "@hooks/movie";
import styles from "./index.styles";

function MovieBackdropBanner() {
  const { data, isLoading } = useTopMovieQuery();

  return (
    <div
      css={styles.backdropBanner(!isLoading ? data.data[0].backdropUrl : "")}
    >
      {/* Movie 그레디에이션 적용 */}
      <div className="shadow-box">
        {/* 영화 정보 기입 */}
        <div className="movie-info">
          <h3>{!isLoading ? data.data[0].title : ""}</h3>
          <div>
            <span>
              별점: ★ {!isLoading ? data.data[0].totalRating.toFixed(1) : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieBackdropBanner;

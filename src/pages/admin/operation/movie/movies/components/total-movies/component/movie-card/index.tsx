import { MovieDataTypes } from "@type/api/movie";
import styles from "./index.styles";
import { useMovieDetailQuery } from "@hooks/movie";
import { useEffect, useState } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { GenreDataType } from "@components/genre";

interface MovieCardProps {
  movie: MovieDataTypes;
  genres: GenreDataType[];
}

function MovieCard({ movie, genres }: MovieCardProps) {
  const { data: movieInfo, isLoading } = useMovieDetailQuery(movie.movieId);

  const [isPosterImageLoading, setIsPosterImageLoading] = useState(false); // 포스터 이미지 Loading

  useEffect(() => {
    if (!isLoading) {
      console.log(movieInfo);
    }
  }, [isLoading]);

  return (
    !isLoading && (
      <div css={styles.movieCard()}>
        {/* Movies Top -> Info, Poster */}
        <div css={styles.movieDetailTop()}>
          {/* Title, Genres, Release */}
          <div className="detail">
            <div className="info">
              <h3>제목</h3>
              <span>{movieInfo.data.movie_info.original_title}</span>
            </div>

            <div className="info">
              <h3>장르</h3>
              <span>
                {movieInfo.data.movie_info.genres
                  .map((genre: { id: number }) => {
                    return genres.find((data) => data.genreId === genre.id)
                      ?.name;
                  })
                  .join(", ")}
              </span>
            </div>

            <div className="info">
              <h3>출시년도</h3>
              <span>
                {new Date(
                  movieInfo.data.movie_info.release_date
                ).getFullYear() +
                  "-" +
                  (
                    new Date(
                      movieInfo.data.movie_info.release_date
                    ).getMonth() + 1
                  )
                    .toString()
                    .padStart(2, "0") +
                  "-" +
                  new Date(movieInfo.data.movie_info.release_date)
                    .getDate()
                    .toString()
                    .padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Poster */}
          <div className="movie-poster">
            <LazyLoadImage
              src={
                process.env.NODE_ENV === "development"
                  ? movieInfo.data.movie_info.poster_path
                  : `${import.meta.env.VITE_TMDB_IMAGE_URL}/${
                      movieInfo.data.movie_info.poster_path
                    }`
              }
              effect={"blur"}
              onLoad={() => setIsPosterImageLoading(true)}
              onError={() => setIsPosterImageLoading(false)}
            />

            {!isPosterImageLoading && (
              <span>{movieInfo.data.movie_info.original_title}</span>
            )}
          </div>
        </div>

        {/* Movie Description */}
        <div css={styles.movieDetailDescription()}>
          <h3>소개</h3>
          <p>{movieInfo.data.movie_info.overview}</p>
        </div>

        {/* Actors Slides */}

        {/* OST or Behind Input */}
        <div css={styles.movieDetailInput()}>
          <div className="input-container">
            <label htmlFor="ost">트레일러</label>
            <div className="input">
              <div className="update">
                <input
                  type="text"
                  id="ost"
                  placeholder="영화의 OST를 Youtube 재생목록 List Param 값을 작성해주세요."
                  value={movieInfo.data.trailer}
                  readOnly
                />
                <button>수정</button>
              </div>

              <span>* Youtube 재생목록의 List Param 값을 기입해주세요.</span>
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="ost">OST</label>
            <div className="input">
              <div className="update">
                <input
                  type="text"
                  id="ost"
                  placeholder="영화의 OST를 Youtube 재생목록 List Param 값을 작성해주세요."
                  value={movieInfo.data.ost}
                  readOnly
                />
                <button>수정</button>
              </div>

              <span>* Youtube 재생목록의 List Param 값을 기입해주세요.</span>
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="behind">비하인드</label>
            <div className="input">
              <div className="update">
                <input
                  type="text"
                  id="behind"
                  placeholder="영화의 비하인드 Youtube 재생목록 List Param 값을 작성해주세요."
                  value={movieInfo.data.movie_behind_videos[0]}
                  readOnly
                />
                <button>수정</button>
              </div>

              <span>* Youtube 재생목록의 List Param 값을 기입해주세요.</span>
            </div>
          </div>
        </div>

        {/* OTT Service */}
        <div css={styles.movieDetailWatchService()}>
          <div className="title">
            <h3>시청할 수 있는 서비스</h3>
            {/* 수정 버튼 */}
            <div className="update">
              {/* <button onClick={() => setWatchServiceUpdateActive(true)}>
            수정
          </button> */}
            </div>
          </div>
          <div className="service">
            {/* {ottDummyData.map((data, idx) => {
          return (
            <div
              className={`icon-btn ${
                watchServiceUpdateActive ? "to-updated" : ""
              }`}
              key={idx}
            >
              {movieInfo.service.includes(data.name) && (
                <div className="selected">
                  <Check />
                </div>
              )}
              {React.createElement(data.icon)}
            </div>
          );
        })} */}
          </div>
        </div>
      </div>
    )
  );
}

export default MovieCard;

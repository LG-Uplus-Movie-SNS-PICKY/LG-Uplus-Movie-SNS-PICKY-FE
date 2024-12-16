import { MovieDataTypes, MovieDetailTypes } from "@type/api/movie";
import styles from "./index.styles";
import { useMovieDetailQuery } from "@hooks/movie";
import React, { useEffect, useState } from "react";

import Netflix from "@assets/icons/netflix.svg?react";
import Watcha from "@assets/icons/watcha.svg?react";
import Tving from "@assets/icons/tving.svg?react";
import Diesney from "@assets/icons/disneyplus.svg?react";
import Coupang from "@assets/icons/coupangplay.svg?react";
import Wavve from "@assets/icons/wavve.svg?react";

import Check from "@assets/icons/check.svg?react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { GenreDataType } from "@components/genre";
import { Toast } from "@stories/toast";
import { fetchMovieDetailUpdate } from "@api/movie";

interface MovieCardProps {
  movie: MovieDataTypes;
  genres: GenreDataType[];
}

const streamingServie = [
  { icon: Netflix, name: "netflix" },
  { icon: Diesney, name: "disney" },
  { icon: Watcha, name: "watcha" },
  { icon: Wavve, name: "wavve" },
  { icon: Tving, name: "tving" },
  { icon: Coupang, name: "coupang" },
];

function MovieCard({ movie, genres }: MovieCardProps) {
  const { data: movieInfo, isLoading } = useMovieDetailQuery(movie.movieId);

  // 수정되는 MovieInfo 정보
  const [updateMovieInfo, setUpdateMovieInfo] =
    useState<MovieDetailTypes | null>(null);

  const [isPosterImageLoading, setIsPosterImageLoading] = useState(false); // 포스터 이미지 Loading
  const [toastMessage, setToastMessage] = useState<string>("");

  // 각 입력 폼 disabled 상태
  const [updateButtonState, setUpdateButtonState] = useState({
    trailer: false,
    ost: false,
    bethind: false,
  });

  useEffect(() => {
    if (!isLoading && movieInfo?.data) {
      setUpdateMovieInfo(movieInfo.data);
    }
  }, [isLoading]);

  // 입력 필드 값 변경 핸들러
  const handleInputChange = (field: string, value: string) => {
    setUpdateMovieInfo((prev) => {
      if (!prev) return prev;
      else {
        if (field === "movie_behind_videos") {
          const updatedVideos = [...(prev.movie_behind_videos || [])];
          updatedVideos[0] = value;

          return {
            ...prev,
            [field]: updatedVideos,
          };
        }

        return {
          ...prev,
          [field]: value,
        };
      }
    });
  };

  // OTT 서비스 상태 토글 핸들러
  const toggleStreamingService = (name: string) => {
    setUpdateMovieInfo((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        streaming_platform: {
          ...prev.streaming_platform,
          [name]: !prev.streaming_platform[name],
        },
      };
    });
  };

  // 수정된 데이터 제출 핸들러
  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    id: number
  ) => {
    event.preventDefault();

    if (!updateMovieInfo || !movieInfo.data) return;

    // 영화의 정보가 수정되지 않은 경우
    if (JSON.stringify(movieInfo.data) === JSON.stringify(updateMovieInfo)) {
      setToastMessage("아무런 정보가 수정되지 않았습니다.");
      return;
    }

    console.log("id: " + id);
    console.log(updateMovieInfo);

    // 영화의 정보가 수정된 경우
    const response = await fetchMovieDetailUpdate(id, updateMovieInfo);
    console.log(response);
  };

  return (
    !isLoading &&
    updateMovieInfo && (
      <>
        <form
          onSubmit={(event) => onSubmit(event, updateMovieInfo.movie_info.id)}
          css={styles.movieCard()}
        >
          {/* OTT Service */}
          <div css={styles.movieDetailWatchService()}>
            <div className="title">
              <h3>시청할 수 있는 서비스</h3>
            </div>
            <div className="service">
              {streamingServie.map((data, idx) => {
                return (
                  <div
                    key={idx}
                    className="icon-btn"
                    onClick={() => toggleStreamingService(data.name)}
                  >
                    {updateMovieInfo?.streaming_platform[data.name] && (
                      <div className="selected">
                        <Check />
                      </div>
                    )}
                    {React.createElement(data.icon)}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Movies Top -> Info, Poster */}
          <div css={styles.movieDetailTop()}>
            {/* Title, Genres, Release */}
            <div className="detail">
              <div className="info">
                <h3>제목</h3>
                <span>{updateMovieInfo?.movie_info.title}</span>
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
                src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${
                  movieInfo.data.movie_info.poster_path
                }`}
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
              <label htmlFor="trailer">트레일러</label>
              <div className="input">
                <div className="update">
                  <input
                    type="text"
                    id="trailer"
                    placeholder="영화의 Trailer 값을 작성해주세요."
                    value={updateMovieInfo?.trailer}
                    onChange={(event) =>
                      handleInputChange("trailer", event.currentTarget.value)
                    }
                    disabled={!updateButtonState.trailer}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setUpdateButtonState((prev) => ({
                        ...prev,
                        trailer: true,
                      }));
                    }}
                  >
                    수정
                  </button>
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
                    placeholder="영화의 OST 값을 작성해주세요."
                    value={updateMovieInfo?.ost}
                    onChange={(event) =>
                      handleInputChange("ost", event.currentTarget.value)
                    }
                    disabled={!updateButtonState.ost}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setUpdateButtonState((prev) => ({
                        ...prev,
                        ost: true,
                      }));
                    }}
                  >
                    수정
                  </button>
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
                    value={updateMovieInfo?.movie_behind_videos[0]}
                    onChange={(event) =>
                      handleInputChange(
                        "movie_behind_videos",
                        event.currentTarget.value
                      )
                    }
                    disabled={!updateButtonState.bethind}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setUpdateButtonState((prev) => ({
                        ...prev,
                        bethind: true,
                      }));
                    }}
                  >
                    수정
                  </button>
                </div>

                <span>* Youtube 재생목록의 List Param 값을 기입해주세요.</span>
              </div>
            </div>
          </div>

          <button type="submit">영화 수정</button>
        </form>
        {toastMessage && <Toast message={toastMessage} direction="none" />}
      </>
    )
  );
}

export default MovieCard;

import React, { useEffect, useState } from "react";
import styles from "./index.styles";
import { useRecoilValueLoadable } from "recoil";
import { genresSelector } from "@recoil/selectors/genresSelector";
import GenreTab from "./genre-tab";
import { useGenreMovieQuery } from "@hooks/movie";
import { useInView } from "react-intersection-observer";
import Loading from "@components/loading";
import { MovieDataTypes } from "@type/api/movie";
import { MovieItem } from "@stories/movie-item";

import Checked from "@assets/icons/checked-movie.svg?react";
import { Toast } from "@stories/toast";

interface ModalProps {
  setCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({ setCreateModalOpen }: ModalProps) {
  const [title, setTitle] = useState("");

  const loadable = useRecoilValueLoadable(genresSelector);
  const [selectButton, setSelectButton] = useState<number | null>(null);

  const [selectMovie, setSelectMovie] = useState<number[]>([]);
  const [toastMessage, setToastMessage] = useState("");

  // 다른 장르 버튼 클릭 시 해당 장르 영화 변경
  const GenreOnClick = (movieId: number) => {
    setSelectButton(movieId);
  };

  useEffect(() => {
    if (loadable.state === "hasValue" && loadable.contents.data.length > 0) {
      setSelectButton(loadable.contents.data[0].genreId);
    }
  }, [loadable]);

  const {
    data: genreMovies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGenreMovieQuery(selectButton ?? -1);

  const { ref, inView } = useInView({
    threshold: 1.0, // 마지막 요소가 100% 뷰포트에 들어왔을 때 true
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (!isLoading) console.log(genreMovies);
  }, [isLoading]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 플레이리스트 제목 And 영화를 하나도 선택하지 않은 경우
    if (!title && !selectMovie.length) {
      setToastMessage("플레이리스트 제목과 영화를 선택해주세요.");
    } else if (!title) {
      // 플레이리스트 제목을 작성하지 않은 경우
      setToastMessage("플레이리스트 제목을 작성해주세요.");
    } else if (!selectMovie.length) {
      // 아무런 영화도 선택하지 않을 경우
      setToastMessage("플레이리스트에 추가하고 싶은 영화를 선택해주세요.");
    } else {
      console.log("Hello");
    }

    if (toastMessage) {
      setTimeout(() => {
        setToastMessage("");
      }, 100);
    }
  };

  return (
    // 모달 외부
    <div css={styles.modalOuter()} onClick={() => setCreateModalOpen(false)}>
      {/* 모달 컨테이너 */}
      <form
        css={styles.modalContainer()}
        onClick={(event) => event.stopPropagation()}
        onSubmit={onSubmit}
      >
        <div css={styles.modalTitle()}>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="플레이리스트 제목"
          />
          <button type="submit">추가</button>
        </div>

        <div style={{ boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }}>
          {/* 영화 장르 선택 */}
          <GenreTab
            onClick={GenreOnClick}
            selectedGenres={selectButton ?? -1}
          />
        </div>

        <div css={styles.modalMovies()}>
          {/* 영화 조회 */}
          <div className="movies-container">
            {isLoading && <Loading />}
            {!genreMovies?.pages[0].data.content.length && <div>영화 없음</div>}
            {/* 영화 목록 */}
            <div className="movie-lists">
              {Array.isArray(genreMovies?.pages) &&
                genreMovies?.pages.map((page, index) => (
                  <React.Fragment key={index}>
                    {/* Playlist Data JSX Element Mapping  */}
                    {Array.isArray(page?.data.content) &&
                      page?.data.content.map((movie: MovieDataTypes) => (
                        <div style={{ position: "relative" }}>
                          {selectMovie.includes(movie.movieId) && (
                            <div
                              css={styles.select()}
                              onClick={() =>
                                setSelectMovie((selectMovies) =>
                                  selectMovies.filter(
                                    (select) => select !== movie.movieId
                                  )
                                )
                              }
                            >
                              <Checked />
                            </div>
                          )}
                          <MovieItem
                            key={movie.movieId}
                            type="basic"
                            src={movie.posterUrl}
                            name={movie.title}
                            title={movie.title}
                            disabled={true}
                            onClick={() =>
                              setSelectMovie((selectMovies) => [
                                ...selectMovies,
                                movie.movieId,
                              ])
                            }
                          />
                        </div>
                      ))}
                  </React.Fragment>
                ))}
              {/* Movies 마지막 영역 */}
              <div ref={ref} style={{ height: "10px" }} />
            </div>

            {/* <div ref={ref} style={{ height: "10px" }} /> */}
          </div>
        </div>
      </form>

      {toastMessage && <Toast message={toastMessage} direction="none" />}
    </div>
  );
}
export default Modal;

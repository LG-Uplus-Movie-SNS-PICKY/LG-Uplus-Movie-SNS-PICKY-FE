import React, { useEffect, useState, useCallback } from "react";

import styles from "./index.styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import AddCircleIcon from "@assets/icons/add_circle_small.svg?react";

import Modal, { ModalStateTypes } from "./components/modal";
import { usePlaylist } from "@hooks/playlist";
import { useInView } from "react-intersection-observer";
import { MovieItem } from "@stories/movie-item";
import { PlaylistDataTypes } from "@type/api/playlist";
import DeleteModal from "./components/delete-modal";

function MoviePlaylistOperationPage() {
  // Modal 상태 값 정의(생성, 수정)
  const [openModal, setOpenModal] = useState<ModalStateTypes>({
    type: "create",
    title: "",
    movieIds: [],
    open: false,
    playlistId: 0,
  });

  // 삭제 Popup 값 정의
  const [deleteModalOpen, setDeleteModalOpen] = useState({
    open: false,
    playlistId: 0,
  });

  // Playlist 항목을 React Query를 통해 캐싱된 데이터를 가져온다.
  const {
    data: playlistsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: playlistLoading,
  } = usePlaylist();

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  const openUpdateModal = async (playlist: PlaylistDataTypes) => {
    setOpenModal({
      open: true,
      title: playlist.title,
      type: "edit",
      movieIds: playlist.getSimpleMovieResps.map((movie) => movie.movieId),
      playlistId: playlist.playlistId,
    });
  };

  return (
    <>
      {/* Header -> Total Playlist, Add Playlist Btn */}
      <div css={styles.titleHeaderContainer()}>
        {/* <h3>Playlists</h3> */}
        <button
          onClick={() => setOpenModal((prev) => ({ ...prev, open: true }))}
          className="playlist-button"
        >
          <AddCircleIcon width="16px" height="16px" />
          <span>추가</span>
        </button>
      </div>

      {/* Content -> Playlist(Title + Update / Delete Button) */}
      <div css={styles.playlistContainer()}>
        {/* Playlist 스크롤링 */}
        {Array.isArray(playlistsData?.pages) &&
          playlistsData.pages.map((page, idx) => (
            <React.Fragment key={idx}>
              {Array.isArray(page.data.content) &&
                page.data.content.map((playlist: PlaylistDataTypes) => (
                  <div css={styles.playlistCard()} key={playlist.playlistId}>
                    {/* Playlist - Header */}
                    <div css={styles.playlistCardHeader()}>
                      <h3>{playlist.title}</h3>
                      <div className="buttons">
                        <button onClick={() => openUpdateModal(playlist)}>
                          수정
                        </button>
                        <button
                          onClick={() =>
                            setDeleteModalOpen({
                              open: true,
                              playlistId: playlist.playlistId,
                            })
                          }
                        >
                          삭제
                        </button>
                      </div>
                    </div>

                    {/* Playlist에 속한 영화 슬라이드 효과 부여 */}
                    <Swiper
                      slidesPerView={3.8}
                      spaceBetween={10}
                      direction={"horizontal"}
                      freeMode={true}
                      modules={[FreeMode, Mousewheel]}
                      mousewheel={{
                        forceToAxis: true,
                      }}
                      css={styles.swiperContainer()}
                    >
                      {playlist.getSimpleMovieResps.length > 0 &&
                        playlist.getSimpleMovieResps.map((movie) => {
                          return (
                            <SwiperSlide key={movie.movieId}>
                              <MovieItem
                                type="basic"
                                src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${
                                  movie.posterUrl
                                }`}
                                title={movie.title}
                                name={movie.title}
                                disabled={true}
                              />
                            </SwiperSlide>
                          );
                        })}
                    </Swiper>
                  </div>
                ))}
            </React.Fragment>
          ))}

        {/* 플레이리스트 뷰포트 마지막 위치 */}
        <div ref={ref} style={{ height: "10px" }} />
      </div>

      {/* 생성 모달 오픈 */}
      {openModal.open && openModal.type === "create" && (
        <Modal type="create" setOpenModal={setOpenModal} />
      )}

      {/* 수정 모달 오픈 */}
      {openModal.open && openModal.type === "edit" && (
        <Modal
          type="edit"
          openModal={openModal}
          setOpenModal={setOpenModal}
          initialTitle={openModal.title}
          initialMovies={openModal.movieIds}
        />
      )}

      {/* 삭제 팝업 오픈 */}
      {deleteModalOpen.open && (
        <DeleteModal
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
        />
      )}
    </>
  );
}

export default MoviePlaylistOperationPage;

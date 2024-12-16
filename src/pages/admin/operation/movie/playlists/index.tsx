import { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./index.styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import image3 from "@assets/images/dummy/image3.jpeg";
import AddCircleIcon from "@assets/icons/add_circle_small.svg?react";
import {
  fetchCreatePlaylist,
  fetchUpdatePlaylist,
  fetchDeletePlaylist,
  fetchCallPlaylist,
} from "@api/playlist";

function MoviePlaylistOperationPage() {
  const [playlists, setPlaylists] = useState<
    { id: number; name: string; movieIds: number[] }[]
  >([]);
  const [availableMovies, setAvailableMovies] = useState<
    { movieId: number; title: string; posterUrl: string }[]
  >([]);
  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ** 영화 목록 로드 **
  // ** 영화 목록 로드 **
  const loadMovies = async () => {
    try {
      const data = await fetchCallPlaylist(undefined, undefined, 20); // null 대신 undefined 사용
      setAvailableMovies(data.content || []);
    } catch (error) {
      console.error("영화 목록 불러오기 오류:", error);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await loadMovies();
        setPlaylists([{ id: 1, name: "액션 영화 모음", movieIds: [1, 2, 3,4,5,6,7,8,9,10] }]); // 초기 더미 데이터
      } catch (error) {
        console.error("데이터 로드 중 오류 발생:", error);
      }
    };
    loadInitialData();
  }, []);

  // 영화 선택/해제 토글
  const toggleMovieSelection = (id: number) => {
    setSelectedMovies((prev) =>
      prev.includes(id)
        ? prev.filter((movieId) => movieId !== id)
        : [...prev, id]
    );
  };

  // 플레이리스트 추가
  const createPlaylist = async () => {
    try {
      const newPlaylist = await fetchCreatePlaylist(title, selectedMovies);
      setPlaylists((prev) => [
        ...prev,
        {
          id: newPlaylist.id,
          name: title,
          movieIds: selectedMovies,
        },
      ]);
      alert("플레이리스트가 성공적으로 추가되었습니다.");
    } catch (error) {
      console.error("플레이리스트 생성 중 오류 발생:", error);
      alert("플레이리스트를 추가하지 못했습니다.");
    }
  };

  // 플레이리스트 수정
  const updatePlaylist = async () => {
    if (editingId === null) return alert("수정할 플레이리스트 ID가 없습니다.");
    try {
      await fetchUpdatePlaylist(editingId, title, selectedMovies);
      setPlaylists((prev) =>
        prev.map((playlist) =>
          playlist.id === editingId
            ? { ...playlist, name: title, movieIds: selectedMovies }
            : playlist
        )
      );
      alert("플레이리스트가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("플레이리스트 수정 중 오류 발생:", error);
      alert("플레이리스트를 수정하지 못했습니다.");
    }
  };

  // 플레이리스트 삭제
  const deletePlaylist = async (id: number) => {
    if (!window.confirm("정말로 이 플레이리스트를 삭제하시겠습니까?")) return;
    try {
      await fetchDeletePlaylist(id);
      setPlaylists((prev) => prev.filter((playlist) => playlist.id !== id));
      alert("플레이리스트가 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("플레이리스트 삭제 중 오류 발생:", error);
      alert("플레이리스트를 삭제하지 못했습니다.");
    }
  };

  // 추가 또는 수정 처리
  const handleSavePlaylist = async () => {
    if (!title.trim() || selectedMovies.length === 0) {
      return alert("제목과 영화를 선택해주세요.");
    }
    setIsLoading(true);
    try {
      if (isEditing) {
        await updatePlaylist();
      } else {
        await createPlaylist();
      }
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("플레이리스트 저장 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기화
  const resetForm = () => {
    setTitle("");
    setSelectedMovies([]);
    setIsEditing(false);
    setEditingId(null);
  };

  // 수정 모드 활성화
  const handleEditPlaylist = (id: number, name: string, movieIds: number[]) => {
    setIsEditing(true);
    setEditingId(id);
    setTitle(name);
    setSelectedMovies(movieIds);
    setIsModalOpen(true);
  };

  // 모달 열기
  const openModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <>
      <div css={styles.titleHeaderContainer()}>
        <div className="container">
          <h3>Total Playlists: {playlists.length}</h3>
          <button onClick={openModal} className="playlist-button">
            <AddCircleIcon width="16px" height="16px" />
            <span>추가</span>
          </button>
        </div>
      </div>
      <div css={styles.playlistContainer()}>
        {playlists.map((playlist) => (
          <div key={playlist.id} css={styles.playlistCard()}>
            {/* Playlist Header */}
            <h3>{playlist.name}</h3>

            {/* Playlist Content */}
            <div css={styles.reportInfoContainer()}>
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={16}
                direction={"horizontal"}
                freeMode={true}
                modules={[FreeMode, Mousewheel]}
                mousewheel={{
                  forceToAxis: true,
                }}
                css={styles.swiperContainer()}
              >
                {playlist.movieIds.map((id) => {
                  const movie = availableMovies.find(
                    (movie) => movie.movieId === id
                  );
                  return (
                    <SwiperSlide key={id}>
                      <div style={{ textAlign: "center" }}>
                        <img
                          src={movie?.posterUrl || image3}
                          alt={movie?.title || `영화 ${id}`}
                          style={{
                            width: "200px",
                            height: "250px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginBottom: "8px",
                          }}
                        />
                        <p style={{ fontSize: "12px", alignContent: "left" }}>
                          {movie?.title || `영화 ${id}`}
                        </p>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            {/* Action Buttons */}
            <button
              onClick={() =>
                handleEditPlaylist(
                  playlist.id,
                  playlist.name,
                  playlist.movieIds
                )
              }
            >
              수정
            </button>
            <button onClick={() => deletePlaylist(playlist.id)}>삭제</button>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        ariaHideApp={false}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "90%", // 반응형 너비
            maxWidth: "430px",
            padding: "20px",
            zIndex: 1000,
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          },
        }}
      >
        <h2>{isEditing ? "플레이리스트 수정" : "플레이리스트 추가"}</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="플레이리스트 제목"
        />
        <div>
          {availableMovies.map((movie) => (
            <label
              key={movie.movieId}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <input
                type="checkbox"
                checked={selectedMovies.includes(movie.movieId)}
                onChange={() => toggleMovieSelection(movie.movieId)}
                style={{ marginRight: "10px" }}
              />
              <img
                src={movie.posterUrl}
                alt={movie.title}
                style={{
                  width: "50px",
                  height: "75px",
                  marginRight: "10px",
                  objectFit: "cover",
                }}
              />
              {movie.title}
            </label>
          ))}
        </div>
        <button onClick={handleSavePlaylist} disabled={isLoading}>
          {isEditing ? "수정 완료" : "추가 완료"}
        </button>
      </Modal>
    </>
  );
}

export default MoviePlaylistOperationPage;

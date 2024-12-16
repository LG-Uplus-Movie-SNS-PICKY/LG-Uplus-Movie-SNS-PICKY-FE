import { useEffect, useState, useCallback } from "react";
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
    { id: number; title: string; movieIds: number[] }[]
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
  const TMDB_IMAGE_PREFIX = "https://image.tmdb.org/t/p/w185";

  // interface Movie {
  //   movieId: number;
  //   title: string;
  //   posterUrl: string;
  // }

  const loadMovies = useCallback(async () => {
    console.log("loadMovies 함수 호출됨");
    setIsLoading(true);
    try {
      const response = await fetchCallPlaylist();
      console.log("API 응답 데이터:", response);

      if (!response || !response.data || !response.data.content) {
        throw new Error("Invalid response structure");
      }

      const { content } = response.data;

      if (!Array.isArray(content)) {
        throw new Error("Content is not an array");
      }

      // 데이터 매핑
      const movies = content.map((movie) => ({
        movieId: movie.movieId,
        title: movie.title,
        posterUrl: movie.posterUrl,
      }));

      setAvailableMovies(movies);

      console.log("영화 데이터:", movies);
    } catch (error) {
      console.error("영화 목록 불러오기 오류:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("useEffect 실행됨");
    loadMovies();
  }, [loadMovies]);

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
      console.log("플레이리스트 생성 요청 시작");
      console.log("제목:", title, "선택된 영화 ID:", selectedMovies);
      const newPlaylist = await fetchCreatePlaylist(selectedMovies, title);
      console.log("API 응답:", newPlaylist);

      setPlaylists((prev) => [
        ...prev,
        {
          id: newPlaylist.id,
          title: title,
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
  const openModal = async () => {
    console.log("openModal 함수 호출됨");
    resetForm();
    try {
      await loadMovies();
      console.log("영화 목록 로드 성공");
    } catch (error) {
      console.error("영화 목록 로드 중 오류:", error);
    }
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
            <h3
              style={{
                textAlign: "center",
                marginBottom: "15px",
                fontSize: "18px",
              }}
            >
              {playlist.title}
            </h3>
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
                          src={
                            movie?.posterUrl
                              ? `${TMDB_IMAGE_PREFIX}${movie.posterUrl}`
                              : image3
                          }
                          alt={movie?.title || `영화 ${id}`}
                          style={{
                            width: "120px",
                            height: "160px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginBottom: "8px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <p
                          style={{
                            fontSize: "12px",
                            marginTop: "5px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {movie?.title || `영화 ${id}`}
                        </p>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <button
                style={{
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onClick={() =>
                  handleEditPlaylist(
                    playlist.id,
                    playlist.title,
                    playlist.movieIds
                  )
                }
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0056b3")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#007BFF")
                }
              >
                수정
              </button>
              <button
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onClick={() => deletePlaylist(playlist.id)}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#b02a37")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#dc3545")
                }
              >
                삭제
              </button>
            </div>
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
            transform: "translate(-50%, -50%)",
            padding: "20px",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          },
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
          {isEditing ? "플레이리스트 수정" : "플레이리스트 추가"}
        </h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="플레이리스트 제목"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
        <div style={{ margin: "15px 0" }}>
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
                src={`${TMDB_IMAGE_PREFIX}${movie.posterUrl}`}
                alt={movie.title}
                style={{
                  width: "50px",
                  height: "75px",
                  marginRight: "10px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
              {movie.title}
            </label>
          ))}
        </div>
        <button
          onClick={handleSavePlaylist}
          disabled={isLoading}
          style={{
            backgroundColor: isEditing ? "#007BFF" : "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            cursor: "pointer",
            textAlign: "center",
            width: "100%",
          }}
        >
          {isEditing ? "수정 완료" : "추가 완료"}
        </button>
      </Modal>
    </>
  );
}

export default MoviePlaylistOperationPage;

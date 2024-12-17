import { useEffect, useState, useCallback } from "react";

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
} from "@api/playlist";
import Modal from "./components/modal";
import { usePlaylist } from "@hooks/playlist";
import { useInView } from "react-intersection-observer";

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

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const TMDB_IMAGE_PREFIX = "https://image.tmdb.org/t/p/w185";

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

  // interface Movie {
  //   movieId: number;
  //   title: string;
  //   posterUrl: string;
  // }

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
      setCreateModalOpen(false);
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
    setCreateModalOpen(true);
  };

  const openModal = async () => {
    setCreateModalOpen(true);
  };

  return (
    <>
      {/* Header -> Total Playlist, Add Playlist Btn */}
      <div css={styles.titleHeaderContainer()}>
        {/* <h3>Playlists</h3> */}
        <button onClick={openModal} className="playlist-button">
          <AddCircleIcon width="16px" height="16px" />
          <span>추가</span>
        </button>
      </div>

      {/* Content -> Playlist(Title + Update / Delete Button) */}
      <div css={styles.playlistContainer()}>
        {/* Playlist Card */}
        <div css={styles.playlistCard}>
          {/* Playlist - Header */}
          <div css={styles.playlistCardHeader()}>
            <h3>우진이가 추천하는 영화 모음집</h3>
            <div className="buttons">
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>

          {/* Playlist - Content */}
        </div>
      </div>

      {createModalOpen && <Modal setCreateModalOpen={setCreateModalOpen} />}
    </>
  );
}

export default MoviePlaylistOperationPage;

// {playlists.map((playlist) => (
//   <div key={playlist.id} css={styles.playlistCard()}>
//     <h3
//       style={{
//         textAlign: "center",
//         marginBottom: "15px",
//         fontSize: "18px",
//       }}
//     >
//       {playlist.title}
//     </h3>
//     <div css={styles.reportInfoContainer()}>
//       <Swiper
//         slidesPerView={"auto"}
//         spaceBetween={16}
//         direction={"horizontal"}
//         freeMode={true}
//         modules={[FreeMode, Mousewheel]}
//         mousewheel={{
//           forceToAxis: true,
//         }}
//         css={styles.swiperContainer()}
//       >
//         {playlist.movieIds.map((id) => {
//           const movie = availableMovies.find(
//             (movie) => movie.movieId === id
//           );
//           return (
//             <SwiperSlide key={id}>
//               <div style={{ textAlign: "center" }}>
//                 <img
//                   src={
//                     movie?.posterUrl
//                       ? `${TMDB_IMAGE_PREFIX}${movie.posterUrl}`
//                       : image3
//                   }
//                   alt={movie?.title || `영화 ${id}`}
//                   style={{
//                     width: "120px",
//                     height: "160px",
//                     objectFit: "cover",
//                     borderRadius: "8px",
//                     marginBottom: "8px",
//                     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                   }}
//                 />
//                 <p
//                   style={{
//                     fontSize: "12px",
//                     marginTop: "5px",
//                     whiteSpace: "nowrap",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                   }}
//                 >
//                   {movie?.title || `영화 ${id}`}
//                 </p>
//               </div>
//             </SwiperSlide>
//           );
//         })}
//       </Swiper>
//     </div>
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         marginTop: "20px",
//       }}
//     >
//       <button
//         style={{
//           backgroundColor: "#007BFF",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           padding: "8px 12px",
//           cursor: "pointer",
//           transition: "background-color 0.3s",
//         }}
//         onClick={() =>
//           handleEditPlaylist(
//             playlist.id,
//             playlist.title,
//             playlist.movieIds
//           )
//         }
//         onMouseEnter={(e) =>
//           (e.currentTarget.style.backgroundColor = "#0056b3")
//         }
//         onMouseLeave={(e) =>
//           (e.currentTarget.style.backgroundColor = "#007BFF")
//         }
//       >
//         수정
//       </button>
//       <button
//         style={{
//           backgroundColor: "#dc3545",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           padding: "8px 12px",
//           cursor: "pointer",
//           transition: "background-color 0.3s",
//         }}
//         onClick={() => deletePlaylist(playlist.id)}
//         onMouseEnter={(e) =>
//           (e.currentTarget.style.backgroundColor = "#b02a37")
//         }
//         onMouseLeave={(e) =>
//           (e.currentTarget.style.backgroundColor = "#dc3545")
//         }
//       >
//         삭제
//       </button>
//     </div>
//   </div>
// ))}

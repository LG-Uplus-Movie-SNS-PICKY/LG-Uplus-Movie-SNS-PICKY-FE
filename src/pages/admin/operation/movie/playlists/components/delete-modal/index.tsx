import { useQueryClient } from "@tanstack/react-query";
import styles from "./index.styles";
import { QueryPlaylistTypes } from "@type/api/playlist";
import { fetchDeletePlaylist } from "@api/playlist";

interface StateValues {
  open: boolean;
  playlistId: number;
}

interface DeleteModalProps {
  deleteModalOpen: StateValues;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<StateValues>>;
}

function DeleteModal({
  deleteModalOpen,
  setDeleteModalOpen,
}: DeleteModalProps) {
  const queryClient = useQueryClient();

  // 플레이리스트 삭제
  const deletePlaylist = async () => {
    // #1. Playlist 삭제
    await fetchDeletePlaylist(deleteModalOpen.playlistId);

    // #2. React Query ["playlist"] 상태 업데이트
    queryClient.setQueryData<QueryPlaylistTypes>(["playlist"], (oldData) => {
      if (!oldData) return oldData;
      console.log(oldData);
      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          data: {
            ...page.data,
            numberOfElements: page.data.numberOfElements - 1, // 플레이리시트 항목 수 감소
            content: page.data.content.filter(
              (playlist) => playlist.playlistId !== deleteModalOpen.playlistId
            ),
          },
        })),
      };
    });

    // #3. Delete Modal 닫기
    setDeleteModalOpen({ open: false, playlistId: 0 });
  };

  return (
    <div
      css={styles.deleteModalOuter()}
      onClick={() => setDeleteModalOpen(() => ({ open: false, playlistId: 0 }))}
    >
      {/* Modal Container */}
      <div
        css={styles.deleteModalContainer()}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Title, paragraph */}
        <div className="playlist-warning-message">
          <h3>플레이리스트 삭제</h3>
          <p>
            플레이리스트를 삭제 하시겠습니까? <br /> 삭제한 플레이리스트는 복구
            할 수 없습니다.
          </p>
        </div>

        <div className="playlist-delete-buttons">
          <button
            onClick={() =>
              setDeleteModalOpen(() => ({ open: false, playlistId: 0 }))
            }
          >
            닫기
          </button>
          <button onClick={deletePlaylist}>삭제</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;

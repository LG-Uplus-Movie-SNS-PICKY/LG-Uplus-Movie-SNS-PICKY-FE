import { useState } from "react";
import styles from "./index.styles";

interface ModalProps {
  setCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({ setCreateModalOpen }: ModalProps) {
  const [title, setTitle] = useState("");

  return (
    // 모달 외부
    <div css={styles.modalOuter()} onClick={() => setCreateModalOpen(false)}>
      {/* 모달 컨테이너 */}
      <form
        css={styles.modalContainer()}
        onClick={(event) => event.stopPropagation()}
        onSubmit={(event) => event.preventDefault()}
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

        <div css={styles.modalMovies()}>
          {/* 영화 조회 */}

          {/* Movies 마지막 영역 */}
          <div />
        </div>
      </form>
    </div>
  );
}
export default Modal;

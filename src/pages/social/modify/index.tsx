import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateBoard } from "@api/movie";
import BackPost from "@assets/icons/back_post.svg?react";
import Review from "@assets/icons/review.svg?react";
import { Button } from "@stories/button";
import { Toast } from "@stories/toast";
import {
  wrapper,
  postContainer,
  modalOverlay,
  reviewSection,
  reviewContainer,
  reviewInput,
  charCount,
  spoilerSection,
  spoilerContainer,
  pText,
  buttonContainer,
  buttonStyle,
  activeButtonStyle,
  shareButton,
  backButton,
  movieInfo,
  movieTitleText,
  movieDetails,
  movieGenres,
  modalContainer,
  movieCountry,
  reviewIcon,
} from "./index.styles";
import { MovieLog } from "@stories/movie-log";
import { Modal } from "@stories/modal";

export default function PostModify() {
  const location = useLocation();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null); // 토스트 메시지 상태

  const { state } = location || {};
  if (!state) {
    return <div>잘못된 접근입니다. 데이터를 불러올 수 없습니다.</div>;
  }

  const { boardId, movieTitle, contents, boardContext, isSpoiler } = state;

  const [reviewText, setReviewText] = useState<string>(boardContext || "");
  const [selectedSpoiler, setSelectedSpoiler] = useState<string>(
    isSpoiler ? "있음" : "없음"
  );
  const [originalReviewText] = useState<string>(boardContext || ""); // 초기값
  const [originalSpoiler] = useState<string>(isSpoiler ? "있음" : "없음"); // 초기값
  const [isBackModalOpen, setIsBackModalOpen] = useState<boolean>(false);

  // 버튼 활성화 상태
  const isButtonActive =
    reviewText !== originalReviewText || selectedSpoiler !== originalSpoiler;

  // 입력 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 500) {
      setToastMessage("리뷰는 500자까지만 작성 가능합니다."); // 토스트 메시지 설정
      return;
    }
    setReviewText(e.target.value);
  };

  // 스포일러 버튼 클릭 핸들러
  const handleSpoilerClick = (type: string) => {
    setSelectedSpoiler(type);
  };

  // 뒤로가기 모달 핸들러
  const handleBackClick = () => {
    setIsBackModalOpen(true);
  };

  // 게시글 수정 핸들러
  const handleUpdate = async () => {
    if (!isButtonActive) {
      setToastMessage("수정 사항이 없습니다."); // 수정 사항 없음 메시지
      return;
    }

    try {
      await updateBoard(boardId, reviewText, selectedSpoiler === "있음");
      setToastMessage("수정이 완료되었습니다."); // 수정 완료 메시지
      setTimeout(() => navigate("/movie-log"), 1500); // 1.5초 후 이동
    } catch (error) {
      setToastMessage("게시글 수정에 실패했습니다.");
    }
  };

  return (
    <div css={wrapper}>
      {isBackModalOpen && (
        <>
          <div css={modalOverlay} onClick={() => setIsBackModalOpen(false)} />
          <div css={modalContainer}>
            <Modal
              message="수정을 취소하고 나가시겠습니까?"
              confirmText="나가기"
              cancelText="취소"
              onConfirm={() => navigate(-1)}
              onCancel={() => setIsBackModalOpen(false)}
            />
          </div>
        </>
      )}
      <div css={movieInfo}>
        <div css={backButton} onClick={handleBackClick}>
          <BackPost />
        </div>

        <h2 css={movieTitleText}>{movieTitle}</h2>

        <div css={movieDetails}>
          <p>🕑 {contents?.[0]?.boardContentType || "기타"}</p>
        </div>

        <div css={movieCountry}>
          <p>영화 상세</p>
        </div>
      </div>

      <div css={postContainer}>
        <MovieLog
          boardContent={contents.map((content: any, index: number) => ({
            board_content_id: index,
            board_content_url: content.contentUrl,
            board_content_type:
              content.boardContentType === "VIDEO" ? "VIDEO" : "IMAGE",
          }))}
        />
      </div>

      <div css={reviewSection}>
        <div css={reviewContainer}>
          {!reviewText && <Review css={reviewIcon} />}
          <textarea
            placeholder="        리뷰를 작성해주세요...&#13;&#10;&#13;&#10;욕설, 비방, 명예훼손성 표현은 누군가에게 상처가 될 수 있습니다."
            css={reviewInput}
            value={reviewText}
            onChange={handleInputChange}
          />
          <div css={charCount}>{reviewText.length} / 500</div>
        </div>
      </div>

      <div css={spoilerSection}>
        <div css={spoilerContainer}>
          <p css={pText}>게시글에 스포일러가 포함되어있나요?</p>
          <div css={buttonContainer}>
            <button
              css={[
                buttonStyle,
                selectedSpoiler === "없음" && activeButtonStyle,
              ]}
              onClick={() => handleSpoilerClick("없음")}
            >
              없음
            </button>
            <button
              css={[
                buttonStyle,
                selectedSpoiler === "있음" && activeButtonStyle,
              ]}
              onClick={() => handleSpoilerClick("있음")}
            >
              있음
            </button>
          </div>
        </div>
      </div>

      <div css={shareButton}>
        <Button
          primary={isButtonActive}
          btnType="Active"
          label="수정 완료"
          onClick={handleUpdate}
        />
      </div>

      {toastMessage && <Toast message={toastMessage} direction="up" />}
    </div>
  );
}

import { useState, useEffect, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateBoard } from "@api/movie";
import BackPost from "@assets/icons/back_post.svg?react";
import Review from "@assets/icons/review.svg?react";
import { Button } from "@stories/button";
import { Modal } from "@stories/modal";
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

export default function PostModify() {
  const location = useLocation();
  const navigate = useNavigate();

  // 초기값 설정 및 유효성 검사
  const { state } = location || {};
  if (!state) {
    return <div>잘못된 접근입니다. 데이터를 불러올 수 없습니다.</div>;
  }

  const { boardId, movieTitle, contents, boardContext, isSpoiler } = state;

  const [reviewText, setReviewText] = useState<string>(boardContext || "");
  const [selectedSpoiler, setSelectedSpoiler] = useState<string>(
    isSpoiler ? "있음" : "없음"
  );
  const [isBackModalOpen, setIsBackModalOpen] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleSpoilerClick = (type: string) => {
    setSelectedSpoiler(type);
  };

  const handleBackClick = () => {
    setIsBackModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await updateBoard(boardId, reviewText, selectedSpoiler === "있음");
      alert("게시글이 수정되었습니다.");
      navigate(-1);
    } catch (error) {
      alert("게시글 수정에 실패했습니다.");
    }
  };

  return (
    <div css={wrapper}>
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
      </div>
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

        <div css={movieGenres}>
          <span>스포일러 {isSpoiler ? "있음" : "없음"}</span>
        </div>
      </div>

      <div css={postContainer}>
        {contents?.map((content: any, index: number) => (
          <div key={index} style={{ margin: "10px 0" }}>
            {content.boardContentType === "PHOTO" ? (
              <img src={content.contentUrl} alt="게시물 사진" />
            ) : (
              <video controls src={content.contentUrl} />
            )}
          </div>
        ))}
      </div>

      <div css={reviewSection}>
        <div css={reviewContainer}>
          {!reviewText && <Review css={reviewIcon} />}
          <textarea
            placeholder="리뷰를 수정해주세요..."
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
        <Button btnType="Active" label="수정 완료" onClick={handleUpdate} />
      </div>
    </div>
  );
}

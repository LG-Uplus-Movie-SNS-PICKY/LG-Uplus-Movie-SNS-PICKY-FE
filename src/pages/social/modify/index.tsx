import { useState, ChangeEvent, KeyboardEvent, useRef } from "react";
import { useNavigate } from "react-router-dom"; // navigate를 위해 추가
import axios from "axios";
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
  movieTitle,
  movieDetails,
  movieGenres,
  modalContainer,
  movieCountry,
  reviewIcon,
} from "./index.styles";

export default function PostModify() {
  const [isBackModalOpen, setIsBackModalOpen] = useState<boolean>(false); // 뒤로가기 모달 상태
  const [reviewText, setReviewText] = useState<string>("");
  const [selectedSpoiler, setSelectedSpoiler] = useState<string>("null");

  const navigate = useNavigate();
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleSpoilerClick = (type: string) => {
    setSelectedSpoiler(type);
  };

  const handleBackClick = () => {
    setIsBackModalOpen(true);
  };

  return (
    <div css={wrapper}>
      {isBackModalOpen && (
        <>
          <div css={modalOverlay} onClick={() => setIsBackModalOpen(false)} />
          <div css={modalContainer}>
            <Modal
              message="공유하지 않고 화면을 나가면 작성 중인 리뷰가 삭제될 수 있습니다. 나가시겠습니까?"
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
        <h2 css={movieTitle}>아이언맨</h2>
        <div css={movieDetails}>
          <p>🕑 리오넬 메시</p>
        </div>
        <div css={movieCountry}>
          <p>대한민국</p>
        </div>
        <div css={movieGenres}>
          <span>스릴러</span>
        </div>
      </div>

      <div css={postContainer}>
        <div style={{ width: "360px", height: "360px", background: "gray" }}>
          asd
        </div>
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
        <Button btnType="Active" label="공유" />
      </div>
    </div>
  );
}

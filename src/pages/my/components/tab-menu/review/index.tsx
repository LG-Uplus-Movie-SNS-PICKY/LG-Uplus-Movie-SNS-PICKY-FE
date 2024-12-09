import styles, { Star, StarContainer, StarRating } from "./index.styles";
import EmptyReview from "@assets/icons/my-page/empty-review.svg?react";

import ThumbsUpSvg from "@assets/icons/thumbs_up_mini.svg?react";
import ThumbsDownSvg from "@assets/icons/thumbs_down_mini.svg?react";

import { Modal } from "@stories/modal";
import { Toast } from "@stories/toast";
import EditReviewModal from "../edit-review-modal";

import { useState } from "react";
import ReactDOM from "react-dom";

interface MovieTypes {
  [key: string]: unknown;
  movie_id: number;
  movie_title: string;
  movie_poster_src: string;
}

interface WriterTypes {
  [key: string]: unknown;
  writer_id: number;
  writer_nickname: string;
}

export interface LineReviewData {
  [key: string]: unknown;
  line_review_id: number;
  line_review_rating: number;
  line_review_content: string;
  movie: MovieTypes;
  line_review_like: number;
  line_review_hate: number;
  writer: WriterTypes;
  created_at: string;
}

interface LineReviewContentProps {
  data: LineReviewData[];
}

// 사용자가 한줄평을 하나도 등록하지 않았을 경우
function EmptyLineReview() {
  return (
    <>
      <EmptyReview />
      <h3>한줄평 없음</h3>
    </>
  );
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24시간 형식
  });
};

function LineReviewContent({ data }: LineReviewContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 삭제 모달 상태 관리
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 수정 모달 상태 관리
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null); // 선택된 리뷰 ID 관리
  const [toast, setToast] = useState<{ message: string; direction: "none" | "up" | "down" } | null>(null);

  const showToast = (message: string, direction: "none" | "up" | "down"): Promise<void> => {
    return new Promise((resolve) => {
      setToast({ message, direction });
      setTimeout(() => {
        setToast(null);
        resolve();
      }, 1500);
    });
  };

  const handleEditClick = (reviewId: number) => {
    setSelectedReviewId(reviewId);
    setIsEditModalOpen(true); // 수정 모달 열기
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false); // 수정 모달 닫기
    setSelectedReviewId(null);
  };

  const handleDeleteClick = (reviewId: number) => {
    setSelectedReviewId(reviewId);
    setIsModalOpen(true); // 모달 열기
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // 모달 닫기
    setSelectedReviewId(null); // 선택된 리뷰 초기화
  };

  const confirmDelete = async () => {
    console.log(`Delete review with ID: ${selectedReviewId}`);
    // 삭제 로직 추가 (예: API 호출)
    await showToast("한줄평 삭제가 완료되었습니다.", "up");
    handleModalClose();
  };

  const renderStars = (rating: number) => {
    return (
      <StarContainer>
        {Array.from({ length: 5 }).map((_, idx) => {
          const filled = rating > idx;
          return <Star key={idx} filled={filled} />;
        })}
        <StarRating>{rating.toFixed(1)}</StarRating>
      </StarContainer>
    );
  };

  return (
    <div css={styles.container()} className={data.length ? "" : "centered"}>
      {data.length === 0 && <EmptyLineReview />}
      {data.length > 0 &&
        data.map((data, idx) => (
          <div key={data.line_review_id} css={styles.reviewCard()}>
            {/* 영화 포스터 이미지 */}
            <div className="poster">
              <img
                src={data.movie.movie_poster_src}
                alt={data.movie.movie_title}
              />
            </div>

            {/* 리뷰 정보 */}
            <div css={styles.reviewInfo()}>
              {/* 사용자가 남긴 평점 */}
              {renderStars(data.line_review_rating)}

              {/* 한줄평 정보 */}
              <div className="line-review-info">
                <div>관람평</div>
                <p>{data.line_review_content}</p>
              </div>

              {/* 영화 | 등록 날짜  */}
              <div className="sub-info">
                <span>{data.movie.movie_title}</span>
                <div className="round" />
                <span>{formatDate(data.created_at)}</span>
              </div>

              {/* 한줄평 좋아요, 싫어요 개수 */}
              <div className="reaction-info">
                <div className="reaction-buttons">
                  <ThumbsUpSvg />
                  <span>{data.line_review_like}</span>
                </div>
                <div className="reaction-buttons">
                  <ThumbsDownSvg />
                  <span>{data.line_review_hate}</span>
                </div>
              </div>
            </div>

            {/* 삭제 버튼 */}
            {/* <div css={styles.reviewDeleteBtn()}>
              <DeleteCircle />
            </div> */}

            {/* 수정 & 삭제 버튼 */}
            <div css={styles.reviewBtnContainer()}>
              <div
                css={styles.reviewEditBtn()}
                onClick={() => handleEditClick(data.line_review_id)}
              >
                수정
              </div>
              <div
                css={styles.reviewDeleteBtn()}
                onClick={() => handleDeleteClick(data.line_review_id)}
              >
                삭제
              </div>
            </div>
          </div>
        ))}

      {/* 삭제 모달 */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div css={styles.modalContainer()} onClick={handleModalClose}>
            <Modal
              message="삭제하시겠습니까?"
              confirmText="삭제하기"
              cancelText="취소"
              onConfirm={confirmDelete}
              onCancel={handleModalClose}
            />
          </div>,
          document.body // body에 렌더링
        )}

      {/* 수정 모달 */}
      {isEditModalOpen &&
        ReactDOM.createPortal(
          <div
            css={styles.modalContainer()}
            onClick={handleEditModalClose} // 모달 바깥 클릭 시 닫기
          >
            <div
              css={styles.modalContent()}
              onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 이벤트 전파 중단
            >
              <EditReviewModal
                reviewId={selectedReviewId}
                onClose={handleEditModalClose}
                onSave={(updatedReview) => {
                  showToast("한줄평 수정이 완료되었습니다.", "up");
                  handleEditModalClose();
                }}
              />
            </div>
          </div>,
          document.body
        )}

      {/* Toast 메시지 */}
      {toast &&
        ReactDOM.createPortal(
          <div css={styles.toastContainer()}>
            <Toast message={toast.message} direction={toast.direction} />
          </div>,
          document.body // body에 렌더링
        )}
    </div>
  );
}

export default LineReviewContent;

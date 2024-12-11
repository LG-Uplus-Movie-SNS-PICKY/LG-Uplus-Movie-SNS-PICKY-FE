import styles, { Star, StarContainer, StarRating } from "./index.styles";
import EmptyReview from "@assets/icons/my-page/empty-review.svg?react";

import ThumbsUpSvg from "@assets/icons/thumbs_up_mini.svg?react";
import ThumbsDownSvg from "@assets/icons/thumbs_down_mini.svg?react";

import { Modal } from "@stories/modal";
import { Toast } from "@stories/toast";
import EditReviewModal from "../edit-review-modal";

import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

interface MovieTypes {
  [key: string]: unknown;
  movieId: number;
  movie_title: string;
  movie_poster_src: string;
}

interface WriterTypes {
  [key: string]: unknown;
  writer_id: number;
  writerNickname: string;
}

export interface LineReviewData {
  [key: string]: unknown;
  id: number;
  rating: number;
  context: string;
  movie: MovieTypes;
  likes: number;
  dislikes: number;
  writer: WriterTypes;
  isSpoiler: boolean;
  created_at: string;
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

function LineReviewContent() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 삭제 모달 상태 관리
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null); // 선택된 리뷰 ID 관리
  const [toast, setToast] = useState<{ message: string; direction: "none" | "up" | "down" } | null>(null);

  const { nickname } = useParams<{ nickname: string }>();
  const [reviews, setReviews] = useState<LineReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 수정 모달 상태 관리
  const [selectedReview, setSelectedReview] = useState<LineReviewData | null>(
    null
  );

  useEffect(() => {
    const fetchLineReviews = async () => {
      if (!nickname) {
        setError("닉네임이 제공되지 않았습니다.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/linereview/${nickname}`,
          {
            headers: { Authorization: "123" },
            params: { size: 10 },
          }
        );
        setReviews(data.content || []);

        console.log("data");
        console.log(data);
      } catch (err) {
        setError("한줄평 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLineReviews();
  }, [nickname]);

  const showToast = (message: string, direction: "none" | "up" | "down"): Promise<void> => {
    return new Promise((resolve) => {
      setToast({ message, direction });
      setTimeout(() => {
        setToast(null);
        resolve();
      }, 1500);
    });
  };

  const openEditModal = (review: LineReviewData) => {
    setSelectedReview(review);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedReview(null);
    setIsEditModalOpen(false);
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
    if (!selectedReviewId) return;

    try {
      // DELETE API 호출
      const { data } = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/linereview/${selectedReviewId}`,
        {
          headers: { Authorization: "Bearer token" },
        }
      );

      // 삭제 성공 시 리뷰 목록에서 제거
      setReviews((prev) =>
        prev.filter((review) => review.line_review_id !== selectedReviewId)
      );

      await showToast("한줄평 삭제가 완료되었습니다.", "up");
    } catch (err) {
      console.error("한줄평 삭제 중 오류 발생", err);
      await showToast("한줄평 삭제에 실패했습니다.", "down");
    } finally {
      handleModalClose();
    }
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

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div css={styles.container()} className={reviews.length ? "" : "centered"}>
      {reviews.length === 0 && <EmptyLineReview />}
      {reviews.length > 0 &&
        reviews.map((review) => (
          <div key={review.id} css={styles.reviewCard()}>
            {/* 영화 포스터 이미지
            <div className="poster">
              {review.movie?.movie_poster_src ? (
                <img
                  src={review.movie.movie_poster_src}
                  alt={review.movie.movie_title || "제목 없음"}
                />
              ) : (
                <div>포스터 없음</div>
              )}
            </div> */}

            {/* 영화 포스터 이미지 */}
            <div
              className="poster"
              style={{ backgroundColor: "#D9D9D9", width: "60px", height: "100%" }}
            ></div>

            {/* 리뷰 정보 */}
            <div css={styles.reviewInfo()}>
              {/* 사용자가 남긴 평점 */}
              {renderStars(review.rating)}

              {/* 한줄평 정보 */}
              <div className="line-review-info">
                <div>한줄평</div>
                <p>{review.context}</p>
              </div>

              {/* 영화 | 등록 날짜  */}
              <div className="sub-info">
                <span>{review.movie?.movie_title || "제목 없음"}</span>
                <div className="round" />
                <span>{formatDate(review.created_at)}</span>
              </div>

              {/* 한줄평 좋아요, 싫어요 개수 */}
              <div className="reaction-info">
                <div className="reaction-buttons">
                  <ThumbsUpSvg />
                  <span>{review.likes}</span>
                </div>
                <div className="reaction-buttons">
                  <ThumbsDownSvg />
                  <span>{review.dislikes}</span>
                </div>
              </div>
            </div>

            {/* 수정 & 삭제 버튼 */}
            <div css={styles.reviewBtnContainer()}>
              <div
                css={styles.reviewEditBtn()}
                onClick={() => openEditModal(review)}
              >
                수정
              </div>
              <div
                css={styles.reviewDeleteBtn()}
                onClick={() => handleDeleteClick(review.id)}
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
            onClick={closeEditModal} // 모달 바깥 클릭 시 닫기
          >
            <div
              css={styles.modalContent()}
              onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 이벤트 전파 중단
            >
              {selectedReview && (
                <EditReviewModal
                  review={selectedReview} // 선택된 리뷰 데이터 전달
                  onClose={closeEditModal} // 모달 닫기 핸들러
                  onSave={(updatedReview) => {
                    // 저장 후 부모 상태 업데이트
                    setReviews((prev) =>
                      prev.map((review) =>
                        review.line_review_id === updatedReview.line_review_id
                          ? updatedReview
                          : review
                      )
                    );
                    showToast("한줄평 수정이 완료되었습니다.", "up");
                    closeEditModal();
                  }}
                />
              )}
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

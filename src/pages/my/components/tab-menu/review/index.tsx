import styles, { Star, StarContainer, StarRating, LoadingContainer } from "./index.styles";
import EmptyReview from "@assets/icons/my-page/empty-review.svg?react";

import ThumbsUpSvg from "@assets/icons/thumbs_up_mini.svg?react";
import ThumbsDownSvg from "@assets/icons/thumbs_down_mini.svg?react";

import { Modal } from "@stories/modal";
import { Toast } from "@stories/toast";
import EditReviewModal from "../edit-review-modal";
import Loading from "@components/loading";

import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { deleteLineReview, fetchLineReviewsByUser, updateLineReview } from "@api/linereview";

export interface LineReviewData {
  [key: string]: unknown;
  id: number;
  rating: number;
  context: string;
  isSpoiler: boolean;
  likes: number;
  dislikes: number;
  createdAt: string;
  writerNickname: string;
  isAuthor: boolean;
  movie: {
    movieId: number;
    movieTitle: string;
    moviePosterUrl: string;
  };
}

// 사용자가 한줄평을 하나도 등록하지 않았을 경우
function EmptyLineReview() {
  return (
    <div css={styles.emptyState}>
      <EmptyReview />
      <h3>한줄평 없음</h3>
    </div>
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
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<LineReviewData[]>([]);
  const [lastCursor, setLastCursor] = useState<{ lastCreatedAt: string; lastReviewId: number } | null>(null);
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

        // 실제 API 호출 복원
        const response = await fetchLineReviewsByUser(nickname, 10);
        console.log("Fetched Reviews:", response);

        setReviews(response.context || []); // API 응답 데이터에서 리뷰 설정
        setLastCursor(response.lastCursor || null); // 페이징 정보 설정

        // // 더미 데이터 설정
        // setReviews(dummyData.data.content || []);
        // setLastCursor(null);

      } catch (err) {
        console.error("API 호출 실패:", err);
        setError("한줄평 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLineReviews();
  }, [nickname]);

  // const dummyData = {
  //   success: true,
  //   code: 200,
  //   message: "요청이 성공적으로 처리되었습니다.",
  //   data: {
  //     content: [
  //       {
  //         id: 96,
  //         writerNickname: "우진쓰~",
  //         userId: 10,
  //         rating: 5.0,
  //         context: "노래 너무 좋아여👍",
  //         isSpoiler: false,
  //         likes: 0,
  //         dislikes: 0,
  //         createdAt: "2024-12-15T17:06:13.377225",
  //         movie: {
  //           movieId: 1241982,
  //           movieTitle: "모아나 2",
  //           moviePosterUrl: "/2WVvPcVRqfjyVzIUVIcszGb6zT4.jpg",
  //         },
  //         isAuthor: true,
  //       },
  //       {
  //         id: 95,
  //         writerNickname: "우진쓰~",
  //         userId: 10,
  //         rating: 5.0,
  //         context: "이거 보면서 눈물 콧물 왕창ㅜㅜ😭",
  //         isSpoiler: false,
  //         likes: 0,
  //         dislikes: 0,
  //         createdAt: "2024-12-15T16:19:11.693746",
  //         movie: {
  //           movieId: 158445,
  //           movieTitle: "7번방의 선물",
  //           moviePosterUrl: "/c9TqJPm4pZCuiEXumTayoNIrBSK.jpg",
  //         },
  //         isAuthor: true,
  //       },
  //     ],
  //   },
  // };

  // useEffect(() => {
  //   // 더미 데이터를 직접 사용하여 상태 설정
  //   try {
  //     setIsLoading(true); // 로딩 상태 설정
  //     setReviews(dummyData.data.content || []); // 더미 데이터에서 리뷰 데이터 설정
  //     setLastCursor(null); // lastCursor 필요 시 설정
  //   } catch (err) {
  //     console.error("더미 데이터 처리 중 오류 발생:", err);
  //     setError("더미 데이터를 처리하는 중 오류가 발생했습니다.");
  //   } finally {
  //     setIsLoading(false); // 로딩 상태 해제
  //   }
  // }, []);

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`); // 클릭 시 영화 상세 페이지로 이동
  };

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

  const handleSave = async (updatedReview: {
    context: string;
    isSpoiler: boolean;
  }) => {
    if (!selectedReview) return;

    try {
      // 수정된 데이터를 서버로 전송
      const updatedData = await updateLineReview(selectedReview.id, updatedReview);
      console.log("수정된 데이터:", updatedData);

      // 저장 후 부모 상태 업데이트
      setReviews((prev) =>
        prev.map((review) =>
          review.id === selectedReview.id
            ? { ...review, ...updatedReview, ...updatedData }
            : review
        )
      );

      showToast("한줄평 수정이 완료되었습니다.", "up");
    } catch (err) {
      console.error("한줄평 수정 중 오류 발생", err);
      showToast("한줄평 수정에 실패했습니다.", "down");
    } finally {
      closeEditModal();
    }
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
      await deleteLineReview(selectedReviewId);

      // 삭제 성공 시 리뷰 목록에서 제거
      setReviews((prev) =>
        prev.filter((review) => review.id !== selectedReviewId)
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

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <div css={styles.container()} className={reviews.length ? "" : "centered"}>
      {/* 리뷰 데이터가 없는 경우 EmptyLineReview를 렌더링 */}
      {reviews.length === 0 && <EmptyLineReview />}

      {/* 리뷰 데이터가 있을 경우 렌더링 */}
      {reviews.length > 0 &&
        reviews.map((review) => (
          <div key={review.id} css={styles.reviewCard()}>
            {/* 영화 포스터 이미지 */}
            <div className="poster" onClick={() => handleMovieClick(review.movie.movieId)}>
              {review.movie?.moviePosterUrl ? (
                <img
                  src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${review.movie.moviePosterUrl}`}
                  alt={review.movie.movieTitle || "제목 없음"}
                />
              ) : (
                <div className="poster"
                  style={{
                    backgroundColor: "#D9D9D9",
                    width: "60px",
                    height: "100%"
                  }}
                >
                  포스터 없음
                </div>
              )}
            </div>

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
                <span>{review.movie?.movieTitle || "제목 없음"}</span>
                <div className="round" />
                <span>{formatDate(review.createdAt)}</span>
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
                  onSave={handleSave} // 저장 후 부모 상태 업데이트
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
import styles, {
  Star,
  StarContainer,
  StarRating,
  LoadingContainer,
  ModalWrapper,
} from "./index.styles";
import EmptyReview from "@assets/icons/my-page/empty-review.svg?react";

import ThumbsUpSvg from "@assets/icons/thumbs_up_mini.svg?react";
import ThumbsDownSvg from "@assets/icons/thumbs_down_mini.svg?react";

import { Modal } from "@stories/modal";
import { Toast } from "@stories/toast";
import EditReviewModal from "../edit-review-modal";
import Loading from "@components/loading";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import {
  deleteLineReview,
  fetchLineReviewsByUser,
  updateLineReview,
} from "@api/linereview";
import { useRecoilValue } from "recoil";
import { isLogin } from "@/recoil/atoms/isLoginState";
import { useLineReviewsByUserQuery } from "@hooks/review";
import { LineReviewType } from "@type/api/profile/reviews";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { SwiperClass } from "swiper/react";

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

// 날짜 포맷팅 함수 - 한국 시간 (KST) 기준
const formatToKST = (dateString: string) => {
  const date = new Date(dateString); // UTC 기준
  const KST_OFFSET = 9 * 60 * 60 * 1000; // 9시간(밀리초 단위)
  const kstDate = new Date(date.getTime() + KST_OFFSET);

  return kstDate.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

function LineReviewContent({
  nickname,
  swiper,
}: {
  nickname: string;
  swiper: React.MutableRefObject<SwiperClass | null>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false); // 삭제 모달 상태 관리
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null); // 선택된 리뷰 ID 관리
  const [toast, setToast] = useState<{
    message: string;
    direction: "none" | "up" | "down";
  } | null>(null);

  const navigate = useNavigate();
  const [reviews, setReviews] = useState<LineReviewData[]>([]);

  const {
    data: lineReviews,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = useLineReviewsByUserQuery(nickname);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 수정 모달 상태 관리
  const [selectedReview, setSelectedReview] = useState<LineReviewType | null>(
    null
  );

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}/review`); // 클릭 시 영화 상세 페이지로 이동
  };

  const showToast = (
    message: string,
    direction: "none" | "up" | "down"
  ): Promise<void> => {
    return new Promise((resolve) => {
      setToast({ message, direction });
      setTimeout(() => {
        setToast(null);
        resolve();
      }, 1500);
    });
  };

  const openEditModal = (review: LineReviewType) => {
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
      const updatedData = await updateLineReview(
        selectedReview.id,
        updatedReview
      );
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
    if (!selectedReviewId) return; // 선택된 리뷰 ID가 없으면 반환

    try {
      // DELETE API 호출
      await deleteLineReview(selectedReviewId);

      // 성공적으로 삭제되면 UI 상태 업데이트
      setReviews((prev) =>
        prev.filter((review) => review.id !== selectedReviewId)
      );

      await showToast("한줄평 삭제가 완료되었습니다.", "none");
    } catch (err) {
      console.error("한줄평 삭제 중 오류 발생:", err);
      await showToast("한줄평 삭제에 실패했습니다.", "none");
    } finally {
      handleModalClose(); // 모달 닫기
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

  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (swiper.current) {
      swiper.current.updateAutoHeight();
    }
  }, [lineReviews]);

  if (isLoading) {
    return (
      <div
        style={{
          marginTop: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <div
      css={styles.container()}
      className={lineReviews?.pages[0]?.data?.content?.length ? "" : "centered"}
    >
      {/* 리뷰 데이터가 없는 경우 EmptyLineReview를 렌더링 */}
      {lineReviews?.pages[0]?.data?.content?.length === 0 && (
        <div>
          <EmptyLineReview />
        </div>
      )}

      {Array.isArray(lineReviews?.pages) &&
        lineReviews?.pages.map((page, idx) => (
          <React.Fragment key={idx}>
            {Array.isArray(page.data.content) &&
              page.data.content.map((review: LineReviewType) => (
                <div key={review.id} css={styles.reviewCard()}>
                  {/* 영화 포스터 이미지 */}
                  <div
                    className="poster"
                    onClick={() => handleMovieClick(review.movie.movieId)}
                  >
                    {review.movie?.moviePosterUrl ? (
                      <LazyLoadImage
                        src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${
                          review.movie.moviePosterUrl
                        }`}
                        alt={review.movie.movieTitle || "제목 없음"}
                      />
                    ) : (
                      <div
                        className="poster"
                        style={{
                          backgroundColor: "#D9D9D9",
                          width: "60px",
                          height: "100%",
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
                      <span>{formatToKST(review.createdAt)}</span>
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

                  {/* 수정/삭제 버튼 렌더링 조건 */}
                  {review.isAuthor === true ? (
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
                  ) : null}
                </div>
              ))}
          </React.Fragment>
        ))}

      {/* 삭제 모달 */}
      {isModalOpen &&
        ReactDOM.createPortal(
          <div css={styles.modalContainer()} onClick={handleModalClose}>
            <ModalWrapper>
              <Modal
                message="삭제하시겠습니까?"
                confirmText="삭제하기"
                cancelText="취소"
                onConfirm={confirmDelete}
                onCancel={handleModalClose}
              />
            </ModalWrapper>
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

      <div ref={ref} style={{ height: "10px" }} />
    </div>
  );
}

export default LineReviewContent;

{
  /* 리뷰 데이터가 있을 경우 렌더링 */
}
// {reviews.length > 0 &&
//   reviews.map((review) => (
//   ))}

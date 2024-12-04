import styles, { Star, StarContainer, StarRating } from "./index.styles";
import EmptyReview from "@assets/icons/my-page/empty-review.svg?react";

import ThumbsUpSvg from "@assets/icons/thumbs_up_mini.svg?react";
import ThumbsDownSvg from "@assets/icons/thumbs_down_mini.svg?react";
import DeleteCircle from "@assets/icons/my-page/delete.svg?react";

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

// 사용자가 게시글을 하나도 등록하지 않았을 경우
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
            <div css={styles.reviewDeleteBtn()}>
              <DeleteCircle />
            </div>
          </div>
        ))}
    </div>
  );
}

export default LineReviewContent;

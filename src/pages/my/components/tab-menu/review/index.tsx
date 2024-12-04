import styles from "./index.styles";
import EmptyReview from "@assets/icons/my-page/empty-review.svg?react";

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

function LineReviewContent({ data }: LineReviewContentProps) {
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
            <div css={styles.reviewInfo()}></div>

            {/* 삭제 버튼 */}
          </div>
        ))}
    </div>
  );
}

export default LineReviewContent;

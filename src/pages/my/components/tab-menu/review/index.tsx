import styles from "./index.styles";
import EmptyReview from "@assets/icons/my-page/empty-review.svg?react";

export interface LineReviewData {
  id: number;
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
          <div css={styles.reviewCard()}>
            {/* 영화 포스터 이미지 */}
            <div>
              <img src="" alt="" />
            </div>

            {/* 리뷰 정보 */}
            <div></div>

            {/* 삭제 버튼 */}
          </div>
        ))}
    </div>
  );
}

export default LineReviewContent;

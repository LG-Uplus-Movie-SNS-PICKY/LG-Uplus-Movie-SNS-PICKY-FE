import styles from "./index.styles";

import EmptyLike from "@assets/icons/my-page/empty-like.svg?react";

interface LikeMovieData {
  id: number;
}

interface LikeMovieContentProps {
  data: LikeMovieData[];
}

// 사용자가 좋아요를 누른 영화가 하나도 등록하지 않았을 경우
function EmptyLikeMovie() {
  return (
    <>
      <EmptyLike />
      <h3>좋아요 누른 영화 없음</h3>
    </>
  );
}

function LikeMovieContent({ data }: LikeMovieContentProps) {
  return (
    <div css={styles.container()} className={data.length ? "" : "centered"}>
      {data.length === 0 && <EmptyLikeMovie />}
    </div>
  );
}

export default LikeMovieContent;

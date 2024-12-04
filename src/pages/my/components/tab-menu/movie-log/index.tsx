import EmptyFeed from "@assets/icons/my-page/empty-feed.svg?react";
import styles from "./index.styles";

export interface MovieLogData {
  id: number;
}

interface MovieLogContentProps {
  data: MovieLogData[];
}

// 사용자가 게시글을 하나도 등록하지 않았을 경우
function EmptyMovieLog() {
  return (
    <>
      <EmptyFeed />
      <h3>게시글 없음</h3>
    </>
  );
}

function MovieLogContnent({ data }: MovieLogContentProps) {
  return (
    <div css={styles.container()} className={data.length ? "" : "centered"}>
      {data.length === 0 && <EmptyMovieLog />}
      {data.length > 0 &&
        data.map((element) => <div className="movie-log"></div>)}
    </div>
  );
}

export default MovieLogContnent;

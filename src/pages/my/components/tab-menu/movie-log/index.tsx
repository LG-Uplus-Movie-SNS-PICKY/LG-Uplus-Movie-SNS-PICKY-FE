import { useEffect, useState } from "react";
import EmptyFeed from "@assets/icons/my-page/empty-feed.svg?react";
import styles from "./index.styles";
import { fetchUserMovieLogs } from "@api/movie";

export interface MovieLogData {
  boardId: number;
  contents: {
    contentUrl: string; // 영화 포스터 URL
    boardContentType: string;
  }[];
}

interface MovieLogContentProps {
  nickname: string; // 닉네임을 프로퍼티로 전달
}

function EmptyMovieLog() {
  return (
    <>
      <EmptyFeed />
      <h3>게시글 없음</h3>
    </>
  );
}

function MovieLogContent({ nickname }: MovieLogContentProps) {
  const [data, setData] = useState<MovieLogData[]>([]);
  const [lastBoardId, setLastBoardId] = useState<number | undefined>(undefined);

  const loadMovieLogs = async () => {
    try {
      const response = await fetchUserMovieLogs(nickname, 10, lastBoardId);
      const newLogs = response.content || [];
      setData((prev) => [...prev, ...newLogs]);

      // 마지막 boardId 업데이트
      if (newLogs.length > 0) {
        setLastBoardId(newLogs[newLogs.length - 1].boardId);
      }
    } catch (error) {
      console.error("게시글 조회 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    loadMovieLogs();
  }, [nickname]);

  return (
    <div css={styles.container()} className={data.length ? "" : "centered"}>
      {data.length === 0 && <EmptyMovieLog />}
      {data.length > 0 &&
        data.map((element) => {
          // contents 중 첫 번째 이미지만 사용
          const posterUrl =
            element.contents.find(
              (content) => content.boardContentType === "IMAGE"
            )?.contentUrl || "";

          return (
            <div key={element.boardId} className="movie-log">
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt="movie-poster"
                  style={{ width: "100px", height: "150px" }}
                />
              ) : (
                <EmptyFeed /> // 포스터가 없으면 대체 이미지
              )}
            </div>
          );
        })}
      {data.length > 0 && (
        <button onClick={loadMovieLogs} style={{ marginTop: "20px" }}>
          더 불러오기
        </button>
      )}
    </div>
  );
}

export default MovieLogContent;

import { useEffect, useState } from "react";
import EmptyFeed from "@assets/icons/my-page/empty-feed.svg?react";
import styles from "./index.styles";
import { fetchUserMovieLogs } from "@api/movie";
import { useNavigate } from "react-router-dom";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        marginTop: "120px",
      }}
    >
      <EmptyFeed />
      <h3>게시글 없음</h3>
    </div>
  );
}

function MovieLogContent({ nickname }: MovieLogContentProps) {
  const [data, setData] = useState<MovieLogData[]>([]);
  const [lastBoardId, setLastBoardId] = useState<number | undefined>(undefined);
  const navigate = useNavigate();

  const loadMovieLogs = async () => {
    try {
      const response = await fetchUserMovieLogs(nickname, 10, lastBoardId);
      const newLogs = response.data.content || [];
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

  // 게시글 클릭 시 상세 페이지로 이동
  const handleNavigateMovieLog = (boardId: number) => {
    navigate(`/movie-log/detail/${boardId}`);
  };

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
            <div
              key={element.boardId}
              className="movie-log"
              onClick={() => handleNavigateMovieLog(element.boardId)} // boardId 전달
              style={{ cursor: "pointer" }} // 클릭 가능한 UI 추가
            >
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt="movie-poster"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <EmptyFeed /> // 포스터가 없으면 대체 이미지
              )}
            </div>
          );
        })}
    </div>
  );
}

export default MovieLogContent;

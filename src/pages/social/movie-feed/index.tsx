import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieLogs } from "@api/movie"; // 새로 만든 API 함수
import { MovieLog } from "@stories/movie-log";

interface BoardContent {
  boardId: number;
  writerNickname: string;
  writerProfileUrl: string;
  context: string;
  isSpoiler: boolean;
  createdDate: string;
  likesCount: number;
  commentsCount: number;
  contents: {
    contentUrl: string;
    boardContentType: string;
  }[];
}

export default function MovieFeed() {
  const { movieId } = useParams<{ movieId: string }>(); // 라우터 파라미터에서 movieId 가져오기
  const [logs, setLogs] = useState<BoardContent[]>([]);
  const [lastBoardId, setLastBoardId] = useState<number | undefined>(undefined);

  // 데이터 로딩
  const loadMovieLogs = async () => {
    try {
      const response = await fetchMovieLogs(Number(movieId), 10, lastBoardId);
      const newLogs = response.content || [];
      setLogs((prev) => [...prev, ...newLogs]);

      // 마지막 boardId 업데이트
      if (newLogs.length > 0) {
        setLastBoardId(newLogs[newLogs.length - 1].boardId);
      }
    } catch (error) {
      console.error("무비로그 조회 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (movieId) loadMovieLogs();
  }, [movieId]);

  return (
    <div>
      <h1>Movie Logs</h1>
      <div>
        {logs.map((log) => (
          <div key={log.boardId} style={{ marginBottom: "20px" }}>
            <h3>{log.writerNickname}</h3>
            <p>{log.context}</p>
            <p>
              Likes: {log.likesCount} | Comments: {log.commentsCount}
            </p>

            <MovieLog
              boardContent={log.contents.map((content, index) => ({
                board_content_id: index,
                board_content_url: content.contentUrl,
                board_content_type:
                  content.boardContentType === "VIDEO" ? "Video" : "Image",
              }))}
            />
          </div>
        ))}
      </div>
      <button onClick={loadMovieLogs}>더 불러오기</button>
    </div>
  );
}

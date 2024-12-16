import { useEffect, useState } from "react";
import { fetchUserBoards } from "@api/linereview"; // API 파일에서 가져오기
import EmptyFeed from "@assets/icons/my-page/empty-feed.svg?react";
import styles from "./index.styles";

export interface MovieLogData {
  id: number;
  contentUrl: string;
}

interface MovieLogContentProps {
  nickname: string; // 닉네임을 외부에서 전달받도록 설정
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUserBoards(nickname);
        const fetchedData = response.content.map((item: any) => ({
          id: item.boardId,
          contentUrl: item.contents[0]?.contentUrl || "", // 첫 번째 이미지 URL
        }));

        setData(fetchedData);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [nickname]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div css={styles.container()} className={data.length ? "" : "centered"}>
      {data.length === 0 && <EmptyMovieLog />}
      {data.length > 0 &&
        data.map((element) => (
          <div key={element.id} className="movie-log">
            {/* contentUrl 이미지를 렌더링 */}
            {element.contentUrl ? (
              <img
                src={element.contentUrl}
                alt={`게시글 ${element.id}`}
                style={{ width: "100%", height: "auto", marginBottom: "10px" }}
              />
            ) : (
              <p>이미지가 없습니다.</p>
            )}
          </div>
        ))}
    </div>
  );
}

export default MovieLogContent;

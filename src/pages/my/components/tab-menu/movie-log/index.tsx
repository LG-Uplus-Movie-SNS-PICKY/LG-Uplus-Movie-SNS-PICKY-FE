import React, { useEffect, useState } from "react";
import EmptyFeed from "@assets/icons/my-page/empty-feed.svg?react";
import styles from "./index.styles";
import { useNavigate } from "react-router-dom";
import { useFetchUserMovieLogsQuery } from "@hooks/movie-log";
import Loading from "@components/loading";
import { MovieLogDataType } from "@type/api/profile/movie-log";

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
  const navigate = useNavigate();

  const {
    data: movieLogs,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useFetchUserMovieLogsQuery(nickname);

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </div>
    );
  }

  useEffect(() => {
    if (!isLoading) {
      console.log(movieLogs);
      console.log(movieLogs?.pages[0]?.data?.content?.length);
    }
  }, [isLoading]);

  return (
    <div
      css={styles.container()}
      className={
        movieLogs?.pages[0]?.data?.content?.length !== 0 ? "" : "centered"
      }
    >
      {movieLogs?.pages[0]?.data?.content?.length === 0 && <EmptyMovieLog />}
      {Array.isArray(movieLogs?.pages) &&
        movieLogs.pages.map((page, idx) => (
          <React.Fragment key={idx}>
            {Array.isArray(page.data.content) &&
              page.data.content.map((movieLog: MovieLogDataType) => {
                // 프로필 페이지에서 보여지는 Movie Log는 첫 번째 이미지만 보여준다.
                const firstPosterUrl =
                  movieLog.contents.find(
                    (content) => content.boardContentType === "IMAGE"
                  )?.contentUrl || "";

                return <div key={movieLog.boardId}></div>;
              })}
          </React.Fragment>
        ))}
      {/* {data.length > 0 &&
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
              onClick={() => {
                // http://localhost:5173/movie-log/detail/24}
                console.log(element);
                console.log(element.boardId);

                navigate(`/movie-log/detail/${element.boardId}`, {
                  state: element,
                });
              }} // boardId 전달
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
        })} */}
    </div>
  );
}

export default MovieLogContent;

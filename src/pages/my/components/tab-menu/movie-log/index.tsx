import React, { useEffect, useState } from "react";
import EmptyFeed from "@assets/icons/my-page/empty-feed.svg?react";
import styles from "./index.styles";
import { useNavigate } from "react-router-dom";
import { useFetchUserMovieLogsQuery } from "@hooks/movie-log";
import Loading from "@components/loading";
import { MovieLogDataType } from "@type/api/profile/movie-log";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useInView } from "react-intersection-observer";
import { SwiperClass } from "swiper/react";

interface MovieLogContentProps {
  nickname: string; // 닉네임을 프로퍼티로 전달
  swiper: React.MutableRefObject<SwiperClass | null>;
}

function ImageWithFallback({ src, title }: { src: string; title: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <LazyLoadImage
        src={src}
        effect="blur"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(false)}
        className="images"
      />
      {!isLoaded && <span className="alt">{title}</span>}
    </>
  );
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

function MovieLogContent({ nickname, swiper }: MovieLogContentProps) {
  const navigate = useNavigate();

  const {
    data: movieLogs,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useFetchUserMovieLogsQuery(nickname);

  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (swiper.current) {
      swiper.current.updateAutoHeight();
    }
  }, [movieLogs]);

  if (isLoading) {
    return (
      <div
        style={{
          marginTop: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <div
      css={styles.container()}
      className={
        movieLogs?.pages[0]?.data?.content?.length !== 0 ? "" : "centered"
      }
    >
      {movieLogs?.pages[0]?.data?.content?.length === 0 && <EmptyMovieLog />}

      {/* API 호출로 인해 받아온 무비로그 데이터들을 렌더링 시킨다. */}
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

                return (
                  // Movie Log 아이템 카드
                  <div
                    key={movieLog.boardId}
                    css={styles.movieLog()}
                    onClick={() =>
                      navigate(`/movie-log/detail/${movieLog.boardId}`, {
                        state: movieLog,
                      })
                    }
                  >
                    {/* 이미지가 있을 경우에는 해당 이미지를 Lazy Loading 기법을 통해 이미지를 불러온다. */}
                    {firstPosterUrl ? (
                      <ImageWithFallback
                        src={firstPosterUrl}
                        title={movieLog.context}
                      />
                    ) : (
                      // 이미지가 없을 경우 텍스트만 출력한다.
                      <span className="empty">{movieLog.context}</span>
                    )}
                  </div>
                );
              })}
          </React.Fragment>
        ))}

      <div ref={ref} style={{ width: "100%", height: "10px" }} />
    </div>
  );
}

export default MovieLogContent;

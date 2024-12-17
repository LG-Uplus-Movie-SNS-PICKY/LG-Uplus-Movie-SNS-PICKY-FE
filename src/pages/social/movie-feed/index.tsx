import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchMovieLogByIdQuery } from "@hooks/movie-log";
import { useInView } from "react-intersection-observer";
import LikeFeed from "@assets/icons/like_feed.svg?react";
import LikeFeedActive from "@assets/icons/like_feed_active.svg?react";
import CommentFeed from "@assets/icons/comment_feed.svg?react";
import ReportButton from "@assets/icons/report_button.svg?react";
import Loading from "@components/loading";
import { MovieLog } from "@stories/movie-log";
import { Toast } from "@stories/toast";
import {
  wrapper,
  feedContainer,
  feedItem,
  profileSection,
  textSection,
  timeSection,
  contentSection,
  reactionsContainer,
  moreOptions,
  movieTitle,
  spoilerText,
  blurredContent,
  blurredImage,
  carouselWrapper,
  reactionsSection,
} from "./index.styles";

// 게시글 데이터 타입
interface BoardContent {
  boardId: number;
  writerNickname: string;
  writerProfileUrl: string;
  movieTitle: string;
  createdDate: string;
  context: string;
  isSpoiler: boolean;
  isLike: boolean;
  likesCount: number;
  commentsCount: number;
  contents: {
    contentUrl: string;
    boardContentType: string;
  }[];
}

export default function MovieLogList() {
  const { movieId } = useParams<{ movieId: string }>();
  const navigate = useNavigate();
  const [revealedSpoilers, setRevealedSpoilers] = useState<number[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { ref, inView } = useInView({ threshold: 0.8 });

  const {
    data: board,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
  } = useFetchMovieLogByIdQuery(Number(movieId));

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  const revealSpoiler = (boardId: number) => {
    setRevealedSpoilers((prev) => [...prev, boardId]);
  };

  return (
    <div css={wrapper}>
      <div css={feedContainer}>
        {isLoading && <Loading />}
        {board?.pages.flatMap((page) =>
          page.content.map((log: BoardContent) => {
            const isSpoilerRevealed = revealedSpoilers.includes(log.boardId);
            return (
              <div key={log.boardId} css={feedItem}>
                {/* 프로필 및 사용자 정보 */}
                <div
                  css={profileSection}
                  onClick={() => navigate(`/user/${log.writerNickname}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={log.writerProfileUrl || "/default-profile.png"}
                    alt="프로필"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                  <div css={textSection}>
                    {log.writerNickname}
                    <span css={movieTitle}>{log.movieTitle}</span>
                  </div>
                </div>

                {/* 작성 시간 */}
                <div css={timeSection}>
                  {new Date(log.createdDate).toLocaleDateString()}
                </div>

                {/* 게시글 내용 */}
                <div
                  css={[
                    contentSection,
                    log.isSpoiler && !isSpoilerRevealed && blurredContent,
                  ]}
                  onClick={() =>
                    navigate(`/movie-log/detail/${log.boardId}`, { state: log })
                  }
                >
                  {log.context}
                </div>

                {/* 미디어 콘텐츠 */}
                <div
                  css={carouselWrapper}
                  onClick={() =>
                    log.isSpoiler && !isSpoilerRevealed
                      ? revealSpoiler(log.boardId)
                      : navigate(`/movie-log/detail/${log.boardId}`, {
                          state: log,
                        })
                  }
                >
                  <div
                    css={[
                      carouselWrapper,
                      log.isSpoiler && !isSpoilerRevealed && blurredImage,
                    ]}
                  >
                    <MovieLog
                      boardContent={log.contents.map(
                        (content, index: number) => ({
                          board_content_id: index,
                          board_content_url: content.contentUrl,
                          board_content_type:
                            content.boardContentType === "VIDEO"
                              ? "VIDEO"
                              : "IMAGE",
                        })
                      )}
                    />
                  </div>
                  {/* 스포일러 알림 */}
                  {log.isSpoiler && !isSpoilerRevealed && (
                    <div css={spoilerText}>
                      🚨스포주의🚨 <br /> <p>탭해서 보기</p>
                    </div>
                  )}
                </div>

                {/* 리액션 및 옵션 */}
                <div css={reactionsContainer}>
                  <div css={reactionsSection}>
                    <span>
                      {log.isLike ? <LikeFeedActive /> : <LikeFeed />}
                      <span>{log.likesCount}</span>
                    </span>
                    <span>
                      <CommentFeed />
                      <span>{log.commentsCount}</span>
                    </span>
                  </div>
                  <div css={moreOptions}>
                    <ReportButton />
                  </div>
                </div>
              </div>
            );
          })
        )}
        {/* 로딩 감지기 */}
        <div ref={ref} style={{ width: "100%", height: "10px" }} />
      </div>
      {showToast && <Toast message={toastMessage} direction="up" />}
    </div>
  );
}

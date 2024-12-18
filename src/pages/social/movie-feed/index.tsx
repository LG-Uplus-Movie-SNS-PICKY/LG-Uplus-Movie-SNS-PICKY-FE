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
  banner,
  infoSection,
} from "./index.styles";
import axios, { AxiosError } from "axios";
import MovieLogBanner from "@assets/images/banner.jpg";

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
  console.log(movieId);
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
  useEffect(() => {
    if (!isLoading) {
      console.log("Loading is End");
      console.log(board);
    } else {
      console.log("none");
    }
  }, [isLoading]);

  const calculateTimeAgo = (createdDate: string) => {
    const now = new Date();
    const created = new Date(createdDate);
    const diff = Math.floor((now.getTime() - created.getTime()) / 1000);

    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };

  return (
    <div css={wrapper}>
      <div css={banner}>
        <img src={MovieLogBanner} alt="배너 이미지" style={{ width: "100%" }} />
      </div>
      <div css={feedContainer}>
        {isLoading && <Loading />}
        {Array.isArray(board?.pages) &&
          board.pages.map((page, idx) => (
            <React.Fragment key={idx}>
              {Array.isArray(page.data.content) &&
                page.data.content.map((board: BoardContent) => {
                  const isSpoilerRevealed = revealedSpoilers.includes(
                    board.boardId
                  );

                  return (
                    <>
                      <div key={board.boardId} css={feedItem}>
                        {/* 프로필 및 사용자 정보 */}
                        <div
                          css={infoSection}
                          onClick={() =>
                            navigate(`/user/${board.writerNickname}`)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <div css={profileSection}>
                            <img
                              src={
                                board.writerProfileUrl || "/default-profile.png"
                              }
                              alt="프로필"
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                              }}
                            />
                          </div>
                          <div css={textSection}>
                            {board.writerNickname}
                            <span css={movieTitle}>{board.movieTitle}</span>
                          </div>
                        </div>

                        <div css={timeSection}>
                          {calculateTimeAgo(board.createdDate)}
                        </div>
                      </div>

                      {/* 게시글 내용 */}
                      <div
                        css={[
                          contentSection,
                          board.isSpoiler &&
                            !isSpoilerRevealed &&
                            blurredContent,
                        ]}
                        onClick={() =>
                          navigate(`/movie-log/detail/${board.boardId}`, {
                            state: board,
                          })
                        }
                      >
                        {board.context}
                      </div>

                      {/* 미디어 콘텐츠 */}
                      <div
                        css={carouselWrapper}
                        onClick={() =>
                          board.isSpoiler && !isSpoilerRevealed
                            ? revealSpoiler(board.boardId)
                            : navigate(`/movie-log/detail/${board.boardId}`, {
                                state: board,
                              })
                        }
                      >
                        <div
                          css={[
                            carouselWrapper,
                            board.isSpoiler &&
                              !isSpoilerRevealed &&
                              blurredImage,
                          ]}
                        >
                          <MovieLog
                            boardContent={board.contents.map(
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
                        {board.isSpoiler && !isSpoilerRevealed && (
                          <div css={spoilerText}>
                            🚨스포주의🚨 <br /> <p>탭해서 보기</p>
                          </div>
                        )}
                      </div>

                      {/* 리액션 및 옵션 */}
                      <div css={reactionsContainer}>
                        <div css={reactionsSection}>
                          <span>
                            {board.isLike ? <LikeFeedActive /> : <LikeFeed />}
                            <span>{board.likesCount}</span>
                          </span>
                          <span>
                            <CommentFeed />
                            <span>{board.commentsCount}</span>
                          </span>
                        </div>
                        <div css={moreOptions}>
                          <ReportButton />
                        </div>
                      </div>
                    </>
                  );
                })}
            </React.Fragment>
          ))}

        {/* 로딩 감지기 */}
        <div ref={ref} style={{ width: "100%", height: "20px" }} />
      </div>
      {showToast && <Toast message={toastMessage} direction="up" />}
    </div>
  );
}

// {
//   board?.pages.flatMap((page) =>
//     page.content.map((log: BoardContent) => {
//       const isSpoilerRevealed = revealedSpoilers.includes(log.boardId);
//       return (
//         <div key={log.boardId} css={feedItem}>

//         </div>
//       );
//     })
//   );
// }

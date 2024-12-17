import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  banner,
  feedContainer,
  feedItem,
  profileSection,
  textSection,
  timeSection,
  contentSection,
  carouselSection,
  reactionsSection,
  wrapper,
  infoSection,
  movieTitle,
  moreOptions,
  modalOverlay,
  reactionsContainer,
  spoilerText,
  blurredContent,
  blurredImage,
  carouselWrapper,
  modalContent,
} from "./index.styles";
import LikeFeed from "@assets/icons/like_feed.svg?react";
import LikeFeedActive from "@assets/icons/like_feed_active.svg?react";
import CommentFeed from "@assets/icons/comment_feed.svg?react";
import ReportButton from "@assets/icons/report_button.svg?react";
import EditPost from "@assets/icons/edit_post.svg?react";
import DeletePost from "@assets/icons/delete_post.svg?react";
import { Modal } from "@stories/modal";
import SEO from "@components/seo";
import { fetchAllData, deletePost, toggleLike } from "@api/movie";
import { Toast } from "@stories/toast";
import { useFetchAllMovieLogQuery } from "@hooks/movie-log";
import { useInView } from "react-intersection-observer";
import { MovieLog } from "@stories/movie-log";

interface BoardContent {
  boardId: number;
  writerProfileUrl: string;
  writerNickname: string;
  movieTitle: string;
  createdDate: string;
  context: string;
  isAuthor: boolean;
  isSpoiler: boolean;
  isLike: boolean;
  likesCount: number;
  commentsCount: number;
  writerId: number;
  contents: {
    contentUrl: string;
    boardContentType: string;
  }[];
}

export default function SocialFeed() {
  const [boardData, setBoardData] = useState<BoardContent[]>([]);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<BoardContent | null>(null);
  const [revealedSpoilers, setRevealedSpoilers] = useState<number[]>([]);
  const navigate = useNavigate();
  const myUserId = 7; // 현재 사용자 ID 설정
  const [showToast, setShowToast] = useState(false); // 토스트 메시지 상태

  const {
    data: board,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
  } = useFetchAllMovieLogQuery();

  useEffect(() => {
    if (!isLoading) console.log(board);
  }, [isLoading]);

  // React Intersection Observer -> 뷰포트 마지막을 감지하는 라이브러리르
  const { ref, inView } = useInView({
    threshold: 1.0, // 마지막 요소가 100% 뷰포트에 들어왔을 때 true
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  // 게시글 데이터를 가져오는 함수
  const loadBoardData = async () => {
    try {
      const lastBoardId = 0; // 첫 호출 시 기본값 설정
      const response = await fetchAllData(lastBoardId);
      console.log(response); // 응답 구조 확인
      const contentArray = response.data?.content || [];
      setBoardData(Array.isArray(contentArray) ? contentArray : []);
    } catch (error) {
      console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
      setBoardData([]);
    }
  };

  useEffect(() => {
    loadBoardData();
  }, []);

  // 게시글 좋아요 처리
  const handleToggleLike = async (boardId: number) => {
    try {
      await toggleLike(boardId);
      setBoardData((prevData) =>
        prevData.map((board) =>
          board.boardId === boardId
            ? {
                ...board,
                likesCount: board.isLike
                  ? board.likesCount - 1
                  : board.likesCount + 1,
                isLike: !board.isLike,
              }
            : board
        )
      );
    } catch (error) {
      console.error("좋아요 요청 중 오류 발생:", error);
    }
  };

  // 옵션 모달 열기
  const handleOptionsModal = (board: BoardContent) => {
    setSelectedBoard(board);
    setIsOptionsModalOpen(true);
  };

  // 게시글 삭제 확인 모달 표시
  const handleDeletePost = () => {
    setIsOptionsModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  // 게시글 삭제 처리
  const confirmDeletePost = async () => {
    if (!selectedBoard || !selectedBoard.isAuthor) {
      alert("권한이 없습니다. 삭제할 수 없습니다.");
      return;
    }

    try {
      await deletePost(selectedBoard.boardId);
      setBoardData((prevData) =>
        prevData.filter((board) => board.boardId !== selectedBoard.boardId)
      );
    } catch (error) {
      console.error("게시글 삭제 중 오류 발생:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  // 스포일러 표시 처리
  const revealSpoiler = (boardId: number) => {
    setRevealedSpoilers((prev) => [...prev, boardId]);
  };

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
    <>
      <SEO
        title="PICKY: MOVIE LOG"
        description="MOVIE LOG는 PICKY에 등록된 영화 팬들을 위한 최적의 커뮤니티 서비스입니다."
        url="http://localhost:5173/movie-log"
      />
      <div css={wrapper}>
        <div css={banner}></div>
        <div css={feedContainer}>
          {boardData.map((board) => {
            const isSpoilerRevealed = revealedSpoilers.includes(board.boardId);
            return (
              <>
                <div key={board.boardId} css={feedItem}>
                  <div css={infoSection}>
                    <div css={profileSection}>
                      <img
                        src={board.writerProfileUrl || "/default-profile.png"}
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

                <div
                  css={[
                    contentSection,
                    board.isSpoiler && !isSpoilerRevealed && blurredContent,
                  ]}
                  onClick={() =>
                    navigate(`/movie-log/detail/${board.boardId}`, {
                      state: board,
                    })
                  }
                >
                  {board.context}
                </div>

                <div
                  css={carouselWrapper}
                  onClick={() =>
                    navigate(`/movie-log/detail/${board.boardId}`, {
                      state: board,
                    })
                  }
                >
                  <div
                    css={[
                      carouselSection,
                      board.isSpoiler && !isSpoilerRevealed && blurredImage,
                    ]}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (board.isSpoiler && !isSpoilerRevealed)
                        revealSpoiler(board.boardId);
                    }}
                  >
                    <MovieLog
                      boardContent={board.contents.map((content, index) => ({
                        board_content_id: index, // index를 고유 ID로 사용 (숫자)
                        board_content_url: content.contentUrl, // URL
                        board_content_type:
                          content.boardContentType === "VIDEO"
                            ? "VIDEO"
                            : "IMAGE", // 타입 설정
                      }))}
                    />
                  </div>
                  {board.isSpoiler && !isSpoilerRevealed && (
                    <div css={spoilerText}>
                      🚨스포주의🚨 <br /> <p>탭해서 보기</p>
                    </div>
                  )}
                </div>

                <div css={reactionsContainer}>
                  <div css={reactionsSection}>
                    <span onClick={() => handleToggleLike(board.boardId)}>
                      {board.isLike ? <LikeFeedActive /> : <LikeFeed />}
                      {board.likesCount}
                    </span>
                    <span
                      onClick={() =>
                        navigate(`/movie-log/detail/${board.boardId}`, {
                          state: board,
                        })
                      }
                    >
                      <CommentFeed />
                      {board.commentsCount}
                    </span>
                  </div>
                  <div
                    css={moreOptions}
                    onClick={() => handleOptionsModal(board)}
                  >
                    <ReportButton />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      <div ref={ref} style={{ height: "10px" }} />

      {isOptionsModalOpen && selectedBoard && (
        <div css={modalOverlay} onClick={() => setIsOptionsModalOpen(false)}>
          <div css={modalContent} onClick={(e) => e.stopPropagation()}>
            {selectedBoard.isAuthor ? (
              <>
                <button
                  onClick={() =>
                    navigate(`/movie-log/edit/${selectedBoard.boardId}`, {
                      state: {
                        boardId: selectedBoard.boardId,
                        movieTitle: selectedBoard.movieTitle,
                        contents: selectedBoard.contents,
                        boardContext: selectedBoard.context,
                        isSpoiler: selectedBoard.isSpoiler,
                      },
                    })
                  }
                  style={{ color: "#000" }}
                >
                  <EditPost /> 수정하기
                </button>
                <button onClick={handleDeletePost}>
                  <DeletePost /> 삭제하기
                </button>
              </>
            ) : (
              <>
                <button onClick={() => alert("욕설 신고가 접수되었습니다!")}>
                  욕설 신고
                </button>
                <button
                  onClick={() => alert("스포일러 신고가 접수되었습니다!")}
                >
                  스포일러 신고
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div css={modalOverlay}>
          <Modal
            message="게시글을 삭제하시겠습니까?"
            confirmText="삭제"
            cancelText="취소"
            onConfirm={confirmDeletePost}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        </div>
      )}
      {showToast && <Toast message="게시글이 삭제되었습니다." direction="up" />}
    </>
  );
}

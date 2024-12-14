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
import { Toast } from "@stories/toast";
import SEO from "@components/seo";
import { fetchAllData, deletePost, toggleLike } from "@api/movie";

interface BoardContent {
  boardId: number;
  writerProfileUrl: string;
  writerNickname: string;
  movieTitle: string;
  createdDate: string;
  context: string;
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedBoard, setSelectedBoard] = useState<BoardContent | null>(null);
  const [revealedSpoilers, setRevealedSpoilers] = useState<number[]>([]); // 스포일러 해제된 게시글 ID 저장
  const navigate = useNavigate();
  const myUserId = 7; // 현재 사용자 ID 설정

  // 게시글 데이터를 가져오는 함수
  const loadBoardData = async () => {
    try {
      const response = await fetchAllData();
      console.log(response); // 응답 구조 확인
      const contentArray = response.data?.content || []; // 응답에서 content 배열 추출
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

      // 좋아요 상태 업데이트
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
      setToastMessage("좋아요 요청에 실패했습니다.");
      setShowToast(true);
    }
  };

  // 삭제 확인 모달 표시
  const handleDeletePost = (board: BoardContent) => {
    setSelectedBoard(board);
    setIsDeleteModalOpen(true);
  };

  // 게시글 삭제 처리
  const confirmDeletePost = async () => {
    if (!selectedBoard) return;

    try {
      await deletePost(selectedBoard.boardId);

      // 성공 시 상태 업데이트
      setBoardData((prevData) =>
        prevData.filter((board) => board.boardId !== selectedBoard.boardId)
      );
      setToastMessage("게시글이 삭제되었습니다.");
      setShowToast(true);
    } catch (error) {
      console.error("게시글 삭제 중 오류 발생:", error);
      setToastMessage("게시글 삭제에 실패했습니다.");
      setShowToast(true);
    } finally {
      setIsDeleteModalOpen(false); // 모달 닫기
    }
  };

  // 신고 처리
  const handleReport = () => {
    setToastMessage("신고가 완료되었습니다.");
    setShowToast(true);
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
                    <div
                      style={{
                        width: "360px",
                        height: "360px",
                        background: "gray",
                      }}
                    ></div>
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
                    </span>
                    <span>{board.likesCount}</span>
                    <span>{board.commentsCount}</span>
                  </div>
                  <div css={moreOptions}>
                    {board.writerId === myUserId && (
                      <>
                        <button onClick={() => handleDeletePost(board)}>
                          <DeletePost /> 삭제하기
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/movie-log/edit/${board.boardId}`)
                          }
                        >
                          <EditPost /> 수정하기
                        </button>
                      </>
                    )}
                    <button onClick={handleReport}>
                      <ReportButton /> 신고하기
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isDeleteModalOpen && (
        <div css={modalOverlay}>
          <div css={modalContent}>
            <p>게시글을 삭제하시겠습니까?</p>
            <button onClick={confirmDeletePost}>삭제</button>
            <button onClick={() => setIsDeleteModalOpen(false)}>취소</button>
          </div>
        </div>
      )}

      {showToast && <Toast message={toastMessage} direction="up" />}
    </>
  );
}

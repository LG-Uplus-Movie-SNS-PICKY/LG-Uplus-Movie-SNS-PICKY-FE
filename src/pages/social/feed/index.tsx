import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
import { Toast } from "@stories/toast";
import { MovieLog } from "@stories/movie-log";
import SEO from "@components/seo";

interface Content {
  board_content_id: number;
  board_content_url: string;
  board_content_type: "Photo" | "Video";
}

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
  contents: Content[];
}

export default function SocialFeed() {
  const param = useParams();

  const [boardData, setBoardData] = useState<BoardContent[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedBoard, setSelectedBoard] = useState<BoardContent | null>(null);
  const [revealedSpoilers, setRevealedSpoilers] = useState<number[]>([]); // 스포일러 해제된 게시글 ID 저장
  const navigate = useNavigate();
  const myUserId = 6; // 현재 사용자 ID 설정 (예: 6)

  // API 호출
  useEffect(() => {
    const { id } = param;

    const fetchMovieData = async () => {
      console.log("Hekllo");
    };

    const fetchAllData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/board/all`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`, //_없는 accessToken
            },
          }
        );
        setBoardData(response.data.data || []);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    id ? fetchMovieData() : fetchAllData();
  }, []);

  const calculateTimeAgo = (createdDate: string) => {
    const now = new Date();
    const created = new Date(createdDate);
    const diff = Math.floor((now.getTime() - created.getTime()) / 1000);

    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
  };

  const toggleLike = async (boardId: number) => {
    try {
      // API 요청: 좋아요 상태 변경
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/board/${boardId}/likes`,
        null,
        {
          headers: {
            Authorization: `Bearer`,
          },
        }
      );

      // 좋아요 상태 업데이트
      setBoardData((prevData) =>
        prevData.map((board) =>
          board.boardId === boardId
            ? {
                ...board,
                likesCount: board.isLike
                  ? board.likesCount - 1 // 이미 눌려있다면 좋아요 감소
                  : board.likesCount + 1, // 안 눌려있다면 좋아요 증가
                isLike: !board.isLike, // 좋아요 상태 토글
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

  const revealSpoiler = (boardId: number) => {
    setRevealedSpoilers((prev) => [...prev, boardId]);
  };

  const handleOptionsModal = (board: BoardContent) => {
    setSelectedBoard(board);
    setIsOptionsModalOpen(true);
  };

  const handleDeletePost = () => {
    setIsOptionsModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  const confirmDeletePost = async () => {
    if (!selectedBoard) return;

    try {
      // API 호출로 게시글 삭제
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/board/${
          selectedBoard.boardId
        }`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`, //_없는 accessToken
          },
        }
      );

      // 삭제 성공 시 상태 업데이트
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
      setIsDeleteModalOpen(false); // 삭제 모달 닫기
    }
  };

  const handleReport = () => {
    setToastMessage("신고가 완료되었습니다.");
    setShowToast(true);
    setIsOptionsModalOpen(false);
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
              <div key={board.boardId}>
                <div css={feedItem}>
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
                    {/* <MovieLog
                      boardContent={board.contents.map((content) => ({
                        ...content,
                        board_content_type: content.board_content_type,
                      }))}
                    /> */}
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
                    <span onClick={() => toggleLike(board.boardId)}>
                      {board.isLike ? <LikeFeedActive /> : <LikeFeed />}
                      <span>{board.likesCount}</span>
                    </span>
                    <span
                      onClick={() =>
                        navigate(`/movie-log/detail/${board.boardId}`, {
                          state: board,
                        })
                      }
                    >
                      <CommentFeed />
                      <span>{board.commentsCount}</span>
                    </span>
                  </div>
                  <div
                    css={moreOptions}
                    onClick={() => handleOptionsModal(board)}
                  >
                    <ReportButton />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isOptionsModalOpen && selectedBoard && (
        <div css={modalOverlay} onClick={() => setIsOptionsModalOpen(false)}>
          <div css={modalContent} onClick={(e) => e.stopPropagation()}>
            {selectedBoard.writerId === myUserId ? (
              <>
                <button
                  onClick={() =>
                    navigate(`/movie-log/edit/${selectedBoard.boardId}`)
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
                <button onClick={handleReport}>욕설 신고</button>
                <button onClick={handleReport}>스포일러 신고</button>
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

      {showToast && <Toast message={toastMessage} direction="up" />}
    </>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
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
  modalContent,
  reactionsContainer,
  commentSection,
  commentItem,
  commentProfileSection,
  commentTextSection,
  commentTimeSection,
  commentProfileDetails,
  commentInputSection,
  inputWrapper,
  registerImage,
  commentBox,
  CommentInfoSection,
  carouselWrapper,
} from "./index.styles";
import Profile from "@assets/icons/profile.svg?react";
import LikeFeed from "@assets/icons/like_feed.svg?react";
import LikeFeedActive from "@assets/icons/like_feed_active.svg?react";
import CommentFeed from "@assets/icons/comment_feed.svg?react";
import ReportButton from "@assets/icons/report_button.svg?react";
import CommentReportButton from "@assets/icons/comment_report_button.svg?react";
import RegistComment from "@assets/icons/regist_comment.svg?react";
import RegistCommentActive from "@assets/icons/regist_comment_active.svg?react";
import EditPost from "@assets/icons/edit_post.svg?react";
import DeletePost from "@assets/icons/delete_post.svg?react";
import { Modal } from "@stories/modal";
import { Toast } from "@stories/toast";
import { MovieLog, BoardContentTypes } from "@stories/movie-log";

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
  contents: Content[];
}

interface Comment {
  commentId: number;
  writerId: number;
  writerNickname: string;
  writerProfileUrl: string;
  context: string;
  createdDate: string;
  updatedDate: string;
}

export default function FeedComment() {
  const { boardId } = useParams<{ boardId: string }>();
  const location = useLocation();
  const [boardData, setBoardData] = useState<BoardContent | null>(
    location.state || null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCommentDeleteModalOpen, setIsCommentDeleteModalOpen] =
    useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  );
  const [isLiked, setIsLiked] = useState(boardData?.isLike || false);
  const [likeCountValue, setLikeCountValue] = useState(
    boardData?.likesCount || 0
  );
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 데이터
  const [comment, setComment] = useState("");
  const [myUserId] = useState<number>(6); // 현재 사용자 ID
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/board/${boardId}/comments`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setComments(response.data.data || []);
      } catch (error) {
        console.error("댓글 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    if (boardId) fetchComments();
  }, [boardId]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCountValue(isLiked ? likeCountValue - 1 : likeCountValue + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/board/${boardId}/comment`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      // 댓글 생성 후, 로컬 상태 업데이트
      setComments((prevComments) => [
        ...prevComments,
        {
          commentId: response.data.commentId,
          writerId: myUserId,
          writerNickname: "현재 사용자 닉네임", // 실제 데이터에 맞게 설정 필요
          writerProfileUrl: "", // 사용자 프로필 URL 설정 필요
          context: comment,
          createdDate: new Date().toISOString(),
          updatedDate: new Date().toISOString(),
        },
      ]);
      setComment("");
      setToastMessage("댓글이 성공적으로 작성되었습니다.");
      setShowToast(true);
    } catch (error) {
      console.error("댓글 작성 중 오류 발생:", error);
      setToastMessage("댓글 작성에 실패했습니다.");
      setShowToast(true);
    }
  };

  const handleDeleteComment = (commentId: string) => {
    setSelectedCommentId(commentId);
    setIsCommentDeleteModalOpen(true);
  };

  const confirmDeleteComment = async () => {
    if (!selectedCommentId) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/board/${boardId}/comments`,
        {
          params: { commentId: selectedCommentId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      // 댓글 삭제 성공 시, 로컬 상태에서 댓글 제거
      setComments((prevComments) =>
        prevComments.filter(
          (comment) => comment.commentId.toString() !== selectedCommentId
        )
      );

      setToastMessage("댓글이 성공적으로 삭제되었습니다.");
      setShowToast(true);
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
      setToastMessage("댓글 삭제에 실패했습니다.");
      setShowToast(true);
    } finally {
      setIsCommentDeleteModalOpen(false);
      setSelectedCommentId(null); // 선택된 댓글 ID 초기화
    }
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

  if (!boardData) {
    return <div>게시글 데이터를 불러오는 중...</div>;
  }

  return (
    <div css={wrapper}>
      <div css={feedContainer}>
        <div css={feedItem}>
          <div css={infoSection}>
            <div css={profileSection}>
              <img
                src={boardData.writerProfileUrl || "/default-profile.png"}
                alt="프로필"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div css={textSection}>
              {boardData.writerNickname}
              <span css={movieTitle}>{boardData.movieTitle}</span>
            </div>
          </div>
          <div css={timeSection}>{calculateTimeAgo(boardData.createdDate)}</div>
        </div>
        <div css={contentSection}>{boardData.context}</div>

        <div css={carouselWrapper}>
          <div css={carouselSection}>
            {/* <MovieLog boardContent={boardData.contents} /> */}
            <div
              style={{ width: "360px", height: "360px", background: "gray" }}
            ></div>
          </div>
        </div>

        <div css={reactionsContainer}>
          <div css={reactionsSection}>
            <span className="reaction" onClick={toggleLike}>
              {isLiked ? <LikeFeedActive /> : <LikeFeed />}
              <span className="like-number">{likeCountValue}</span>
            </span>
            <span className="reaction">
              <CommentFeed />
              <span className="comment-number">{boardData.commentsCount}</span>
            </span>
          </div>
          <div css={moreOptions} onClick={toggleModal}>
            <ReportButton />
          </div>
        </div>
      </div>
      <div css={commentSection}>
        {comments.map((comment, index) => (
          <div css={commentItem} key={`comment-${comment.commentId}`}>
            <div css={commentProfileSection}>
              <div css={commentProfileDetails}>
                <img
                  src={comment.writerProfileUrl || "/default-profile.png"}
                  alt="댓글 작성자 프로필"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                  }}
                />
                <div css={CommentInfoSection}>
                  <div css={commentBox}>
                    <span css={commentTimeSection}>
                      {comment.writerNickname}
                    </span>
                    <span>{calculateTimeAgo(comment.createdDate)}</span>
                  </div>
                  <div css={commentTextSection}>
                    <p>{comment.context}</p>
                  </div>
                </div>
              </div>
              <CommentReportButton
                onClick={() =>
                  handleDeleteComment(comment.commentId.toString())
                }
              />
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <div key="no-comments">댓글이 없습니다. 첫 댓글을 작성해보세요!</div>
        )}
      </div>

      {/* 댓글 입력 섹션 */}
      <div css={commentInputSection}>
        <img
          src="/default-profile.png" // 사용자 프로필 이미지 추가 가능
          alt="내 프로필"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
          }}
        />
        <div css={inputWrapper}>
          <input
            type="text"
            placeholder="댓글 추가..."
            value={comment}
            onChange={handleInputChange}
          />
          {comment.trim() ? (
            <RegistCommentActive
              css={registerImage}
              onClick={handleCommentSubmit}
            />
          ) : (
            <RegistComment css={registerImage} onClick={handleCommentSubmit} />
          )}
        </div>
      </div>
      {/* 모달 및 토스트 */}
      {showToast && <Toast message={toastMessage} direction="up" />}
      {/* 모달 및 토스트 */}
      {/* {isModalOpen && (
        <div css={modalOverlay} onClick={toggleModal}>
          <div css={modalContent} onClick={(e) => e.stopPropagation()}>
            {postUserId === myUserId ? (
              <>
                <button onClick={() => navigate(`/movie-log/edit/${boardId}`)}>
                  <EditPost /> 게시글 수정
                </button>
                <button onClick={() => setIsDeleteModalOpen(true)}>
                  <DeletePost /> 삭제하기
                </button>
              </>
            ) : (
              <>
                <button>욕설 신고</button>
                <button>스포일러 신고</button>
              </>
            )}
          </div>
        </div>
      )} */}
      {/* 댓글 삭제 확인 모달 */}
      {isCommentDeleteModalOpen && (
        <div css={modalOverlay}>
          <Modal
            message={`댓글을 삭제하시겠습니까?`}
            confirmText="삭제"
            cancelText="취소"
            onConfirm={confirmDeleteComment}
            onCancel={() => setIsCommentDeleteModalOpen(false)}
          />
        </div>
      )}
      {showToast && <Toast message={toastMessage} direction="up" />}
    </div>
  );
}

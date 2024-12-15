import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { Modal } from "@stories/modal";
import { Toast } from "@stories/toast";
import { fetchComments, addComment, deleteComment } from "@api/movie";

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
  const [comments, setComments] = useState<Comment[]>([]); // 댓글 데이터
  const [comment, setComment] = useState<string>(""); // 입력 중인 댓글
  const [isCommentDeleteModalOpen, setIsCommentDeleteModalOpen] =
    useState(false); // 댓글 삭제 모달
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  ); // 삭제할 댓글 ID
  const [showToast, setShowToast] = useState(false); // 토스트 메시지 상태
  const [toastMessage, setToastMessage] = useState(""); // 토스트 메시지 내용
  const myUserId = 2; // 현재 사용자 ID

  // 댓글 데이터 로드
  useEffect(() => {
    const loadComments = async () => {
      try {
        if (!boardId) return;
        const response = await fetchComments(Number(boardId)); // API 호출
        setComments(response.content || []); // 댓글 데이터 설정
      } catch (error) {
        console.error("댓글 데이터를 불러오는 중 오류 발생:", error);
        setComments([]);
      }
    };

    loadComments();
  }, [boardId]);

  // 댓글 작성 핸들러
  const handleCommentSubmit = async () => {
    if (!comment.trim() || !boardId) return;

    try {
      const newComment = await addComment(Number(boardId), comment); // API 호출
      setComments((prev) => [
        ...prev,
        {
          commentId: newComment.commentId,
          writerId: myUserId,
          writerNickname: "현재 사용자 닉네임", // 실제 사용자 닉네임으로 대체 필요
          writerProfileUrl: "", // 사용자 프로필 URL
          context: comment,
          createdDate: new Date().toISOString(),
          updatedDate: new Date().toISOString(),
        },
      ]);
      setComment(""); // 입력 필드 초기화
      setToastMessage("댓글이 성공적으로 작성되었습니다.");
      setShowToast(true);
    } catch (error) {
      console.error("댓글 작성 중 오류 발생:", error);
      setToastMessage("댓글 작성에 실패했습니다.");
      setShowToast(true);
    }
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = (commentId: number, writerId: number) => {
    if (writerId !== myUserId) {
      setToastMessage("다른 사용자의 댓글은 삭제할 수 없습니다.");
      setShowToast(true);
      return;
    }

    setSelectedCommentId(commentId);
    setIsCommentDeleteModalOpen(true);
  };

  // 댓글 삭제 API 호출
  const confirmDeleteComment = async () => {
    if (!selectedCommentId || !boardId) return;

    try {
      await deleteComment(Number(boardId), selectedCommentId); // API 호출
      setComments((prev) =>
        prev.filter((comment) => comment.commentId !== selectedCommentId)
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

  // 시간 계산 함수
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
      {/* 댓글 목록 */}
      <div css={commentSection}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div css={commentItem} key={comment.commentId}>
              <div css={commentProfileSection}>
                <img
                  src={comment.writerProfileUrl || "/default-profile.png"}
                  alt="프로필"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                  }}
                />
                <div css={commentProfileDetails}>
                  <span>{comment.writerNickname}</span>
                  <span css={commentTimeSection}>
                    {calculateTimeAgo(comment.createdDate)}
                  </span>
                </div>
              </div>
              <div css={commentTextSection}>{comment.context}</div>
              <CommentReportButton
                onClick={() =>
                  handleDeleteComment(comment.commentId, comment.writerId)
                }
              />
            </div>
          ))
        ) : (
          <p>댓글이 없습니다. 첫 댓글을 작성해보세요!</p>
        )}
      </div>

      {/* 댓글 입력 */}
      <div css={commentInputSection}>
        <input
          type="text"
          placeholder="댓글을 작성하세요..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
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

      {/* 댓글 삭제 확인 모달 */}
      {isCommentDeleteModalOpen && (
        <div css={modalOverlay}>
          <Modal
            message="댓글을 삭제하시겠습니까?"
            confirmText="삭제"
            cancelText="취소"
            onConfirm={confirmDeleteComment}
            onCancel={() => setIsCommentDeleteModalOpen(false)}
          />
        </div>
      )}

      {/* 토스트 메시지 */}
      {showToast && <Toast message={toastMessage} direction="up" />}
    </div>
  );
}

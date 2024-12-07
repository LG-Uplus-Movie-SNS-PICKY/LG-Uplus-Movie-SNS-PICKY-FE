import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { MovieLog, BoardContentTypes } from "@stories/movie-log";
import { Toast } from "@stories/toast";

export default function FeedComment() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 게시글 수정/삭제 모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 게시글 삭제 확인 모달
  const [isCommentDeleteModalOpen, setIsCommentDeleteModalOpen] =
    useState(false); // 댓글 삭제 확인 모달
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  ); // 삭제할 댓글 ID
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
  const [likeCountValue, setLikeCountValue] = useState(100);
  const [comment, setComment] = useState("");
  const [postUserId] = useState("12345"); // 게시글 작성자의 userId
  const [myUserId] = useState("12345"); // 현재 사용자의 userId
  const [showToast, setShowToast] = useState(false); // 토스트 메시지 상태
  const [toastMessage, setToastMessage] = useState(""); // 토스트 메시지 관리 상태

  const navigate = useNavigate();

  const boardContent: BoardContentTypes[] = [
    {
      board_content_id: 1,
      board_content_url:
        "https://upload.wikimedia.org/wikipedia/ko/thumb/f/f2/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg/220px-%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg",
      board_content_type: "Photo",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      alert("댓글 작성이 완료되었습니다.");
      setComment("");
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDeleteComment = (commentId: string) => {
    setSelectedCommentId(commentId); // 삭제할 댓글 ID 설정
    setIsCommentDeleteModalOpen(true); // 댓글 삭제 확인 모달 열기
  };

  const confirmDeleteComment = () => {
    setIsCommentDeleteModalOpen(false);
    setToastMessage(`댓글 ${selectedCommentId}이(가) 삭제되었습니다.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // 3초 후 토스트 메시지 숨기기
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCountValue(isLiked ? likeCountValue - 1 : likeCountValue + 1);
  };

  const handleDeletePost = () => {
    setIsDeleteModalOpen(false);
    setToastMessage("게시글이 삭제되었습니다.");
    setShowToast(true);
  };

  const handleReport = () => {
    setToastMessage("신고가 완료되었습니다.");
    setShowToast(true);
    setIsModalOpen(false); // 신고 모달 닫기
  };

  return (
    <div css={wrapper}>
      <div css={feedContainer}>
        <div css={feedItem}>
          <div css={infoSection}>
            <div css={profileSection}>
              <Profile />
            </div>
            <div css={textSection}>
              경원쨩
              <span css={movieTitle}>어벤져스 엔드게임</span>
            </div>
          </div>
          <div css={timeSection}>4시간 전</div>
        </div>
        <div css={contentSection}>이 영화 정말 재미있었어요! 꼭 보세요! 👍</div>

        {/* MovieLog Section */}
        <div css={carouselWrapper}>
          <div css={carouselSection}>
            <MovieLog boardContent={boardContent} />
          </div>
        </div>

        <div css={reactionsContainer}>
          <div css={reactionsSection}>
            <span className="reaction" onClick={toggleLike}>
              {isLiked ? <LikeFeedActive /> : <LikeFeed />}
              <span className="like-number">{likeCountValue}</span>
            </span>
            <span
              className="reaction"
              onClick={() => navigate("/movie-log/detail")}
            >
              <CommentFeed />
              <span className="comment-number">20</span>
            </span>
          </div>
          <div css={moreOptions} onClick={toggleModal}>
            <ReportButton />
          </div>
        </div>
      </div>

      <div css={commentSection}>
        {[1, 2, 3, 4, 5].map((id) => (
          <div css={commentItem} key={id}>
            <div css={commentProfileSection}>
              <div css={commentProfileDetails}>
                <Profile width={"32px"} height={"32px"} />
                <div css={CommentInfoSection}>
                  <div css={commentBox}>
                    <span css={commentTimeSection}>경원쨩</span>
                    3시간 전
                  </div>
                  <div css={commentTextSection}>
                    <p>
                      출바아아아알ㄹㄹㄹ~~~ <br />
                      너무 너무 재밌어 미쳐따 <br />
                      진짜 손성욱 미쳤따 This is you!!!!
                    </p>
                  </div>
                </div>
              </div>
              <CommentReportButton
                onClick={() => handleDeleteComment(id.toString())}
              />
            </div>
          </div>
        ))}
      </div>

      <div css={commentInputSection}>
        <Profile width="36px" height="36px" />
        <div css={inputWrapper}>
          <input
            type="text"
            placeholder="댓글 추가.."
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

      {isCommentDeleteModalOpen && (
        <div css={modalOverlay}>
          <Modal
            message={`댓글 ${selectedCommentId}을(를) 삭제하시겠습니까?`}
            confirmText="삭제"
            cancelText="취소"
            onConfirm={confirmDeleteComment}
            onCancel={() => setIsCommentDeleteModalOpen(false)}
          />
        </div>
      )}

      {/* 기존 모달 */}
      {isModalOpen && (
        <div css={modalOverlay} onClick={toggleModal}>
          <div css={modalContent} onClick={(e) => e.stopPropagation()}>
            {postUserId === myUserId ? (
              <>
                <button
                  style={{ color: "#000" }}
                  onClick={() => navigate("/movie-log/edit?boardId=")}
                >
                  <EditPost /> 게시글 수정
                </button>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsDeleteModalOpen(true);
                  }}
                >
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
            onConfirm={handleDeletePost}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        </div>
      )}

      {showToast && <Toast message={toastMessage} direction="up" />}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
import { fetchComments, createComment, deleteComment } from "@api/movie";

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
  const [comments, setComments] = useState<Comment[]>([]); // 빈 배열로 초기화
  const [comment, setComment] = useState("");
  const myUserId = 2;
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndSetComments = async () => {
      if (!boardId) return;

      try {
        const response = await fetchComments(Number(boardId), 10);
        console.log("댓글 API 응답 데이터:", response);

        // 응답 데이터에서 댓글 리스트를 정확히 추출
        const fetchedComments =
          response?.content || response?.data?.content || [];
        if (Array.isArray(fetchedComments)) {
          setComments(fetchedComments);
        } else {
          console.error("댓글 데이터가 배열이 아닙니다:", fetchedComments);
          setComments([]);
        }
      } catch (error) {
        console.error("댓글 데이터를 불러오는 중 오류 발생:", error);
        setComments([]);
      }
    };

    fetchAndSetComments();
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
    if (!comment.trim() || !boardId) return;

    try {
      const response = await createComment(Number(boardId), comment);

      // 댓글 생성 후, 로컬 상태 업데이트
      setComments((prevComments) => [
        ...prevComments,
        {
          commentId: response.commentId,
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

  const handleDeleteComment = async (commentId: string, writerId: number) => {
    if (writerId !== myUserId) {
      setToastMessage("다른 유저의 댓글은 삭제할 수 없습니다.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // 3초 후 토스트 메시지 숨기기
      return;
    }
    setSelectedCommentId(commentId);
    setIsCommentDeleteModalOpen(true);

    try {
      await deleteComment(Number(boardId), Number(commentId));
      setComments((prevComments) =>
        prevComments.filter(
          (comment) => comment.commentId !== Number(commentId)
        )
      );
      setToastMessage("댓글이 성공적으로 삭제되었습니다.");
      setShowToast(true);
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
      setToastMessage("댓글 삭제에 실패했습니다.");
      setShowToast(true);
    }
    console.log("isCommentDeleteModalOpen:", isCommentDeleteModalOpen); // 상태 확인
  };

  const confirmDeleteComment = async () => {
    if (!selectedCommentId || !boardId) return;

    try {
      await deleteComment(Number(boardId), Number(selectedCommentId)); // API 호출
      setComments((prevComments) =>
        prevComments.filter(
          (comment) => comment.commentId.toString() !== selectedCommentId
        )
      ); // 로컬 상태에서 삭제
      setToastMessage("댓글이 성공적으로 삭제되었습니다.");
      setShowToast(true);
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
      setToastMessage("댓글 삭제에 실패했습니다.");
      setShowToast(true);
    } finally {
      setIsCommentDeleteModalOpen(false); // 모달 닫기
      setSelectedCommentId(null); // 선택된 댓글 ID 초기화
    }
  };

  if (!boardData) {
    return <div>게시글 데이터를 불러오는 중...</div>;
  }
  useEffect(() => {
    console.log("댓글 데이터 업데이트:", comments);
  }, [comments]);
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
          <div css={timeSection}></div>
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
        {Array.isArray(comments) && comments.length > 0 ? (
          comments.map((comment) => (
            <div css={commentItem} key={`comment-${comment.commentId}`}>
              <div css={commentProfileSection}>
                <div css={commentProfileDetails}>
                  <img
                    src={"/default-profile.png"}
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
                      {/* <span>{calculateTimeAgo(comment.createdDate)}</span> */}
                    </div>
                    <div css={commentTextSection}>
                      <p>{comment.context}</p>
                    </div>
                  </div>
                </div>
                <CommentReportButton
                  onClick={() =>
                    handleDeleteComment(
                      comment.commentId.toString(),
                      comment.writerId
                    )
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <div key="no-comments">댓글이 없습니다. 첫 댓글을 작성해보세요!</div>
        )}
        {isCommentDeleteModalOpen && (
          <div css={modalOverlay}>
            <Modal
              message="댓글을 삭제하시겠습니까?"
              confirmText="삭제"
              cancelText="취소"
              onConfirm={confirmDeleteComment} // 삭제 API 호출
              onCancel={() => setIsCommentDeleteModalOpen(false)} // 모달 닫기
            />
          </div>
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
            <RegistComment css={registerImage} />
          )}
        </div>
      </div>
      {/* 모달 및 토스트 */}
      {showToast && <Toast message={toastMessage} direction="down" />}
    </div>
  );
}

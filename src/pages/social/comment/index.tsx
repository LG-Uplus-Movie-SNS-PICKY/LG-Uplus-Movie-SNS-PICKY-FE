import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  spoilerImageWrapper,
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
import SEO from "@components/seo";

export default function FeedComment() {
  const location = useLocation();

  const [id, setId] = useState(""); // 게시물의 아이디

  const [isModalOpen, setIsModalOpen] = useState(false); // 게시글 수정/삭제 모달
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 게시글 삭제 확인 모달
  const [isCommentDeleteModalOpen, setIsCommentDeleteModalOpen] =
    useState(false); // 댓글 삭제 확인 모달
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  ); // 삭제할 댓글 ID
  const [showSpoiler, setShowSpoiler] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
  const [likeCountValue, setLikeCountValue] = useState(100);
  const [comment, setComment] = useState("");
  const [postUserId] = useState("12345"); // 게시글 작성자의 userId
  const [myUserId] = useState("12345"); // 현재 사용자의 userId
  const navigate = useNavigate();

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

  const handleDeletePost = () => {
    setIsModalOpen(false); // 기존 모달 닫기
    setIsDeleteModalOpen(true); // 게시글 삭제 확인 모달 열기
  };

  const handleDeleteComment = (commentId: string) => {
    setSelectedCommentId(commentId); // 삭제할 댓글 ID 설정
    setIsCommentDeleteModalOpen(true); // 댓글 삭제 확인 모달 열기
  };

  const confirmDeletePost = () => {
    setIsDeleteModalOpen(false);
    alert("게시글이 삭제되었습니다.");
    // 게시글 삭제 로직 추가
  };

  const confirmDeleteComment = () => {
    setIsCommentDeleteModalOpen(false);
    alert(`댓글 ${selectedCommentId}이(가) 삭제되었습니다.`);
    // 댓글 삭제 로직 추가
  };

  const revealSpoiler = () => {
    setShowSpoiler(true);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCountValue(isLiked ? likeCountValue - 1 : likeCountValue + 1);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const boardId = searchParams.get("boardId");

    if (boardId) {
      setId(boardId);
    }
  }, [location]);

  return (
    <>
      <SEO
        title={`경원쨩님의 어벤져스: 엔드게임(2024)`}
        description="이 영화 정말 재미있었어요! 꼭 보세요! 👍"
        url={`http://location:5173/movie-log/detail?boardId=${id}`}
        image="https://upload.wikimedia.org/wikipedia/ko/thumb/f/f2/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg/220px-%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg"
      />

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
          <div css={contentSection}>
            이 영화 정말 재미있었어요! 꼭 보세요! 👍
          </div>

          <div css={carouselSection}>
            <div css={spoilerImageWrapper} onClick={revealSpoiler}>
              <img
                css={showSpoiler}
                src="https://upload.wikimedia.org/wikipedia/ko/thumb/f/f2/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg/220px-%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg"
                alt="사진 1"
                style={{ width: "360px" }}
              />
            </div>
          </div>
          <div css={reactionsContainer}>
            <div css={reactionsSection}>
              <span onClick={toggleLike}>
                {isLiked ? <LikeFeedActive /> : <LikeFeed />}{" "}
                {isLiked ? "101" : "100"}
              </span>
              <span>
                <CommentFeed />
                20
              </span>
            </div>
            <div css={moreOptions} onClick={toggleModal}>
              <ReportButton />
            </div>
          </div>
        </div>

        {/* 댓글 리스트 추가 */}
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

        {/* 댓글 작성 섹션 */}
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
              <RegistComment
                css={registerImage}
                onClick={handleCommentSubmit}
              />
            )}
          </div>
        </div>

        {/* 신고 / 수정 모달 */}
        {isModalOpen && (
          <div css={modalOverlay} onClick={toggleModal}>
            <div css={modalContent} onClick={(e) => e.stopPropagation()}>
              {postUserId === myUserId ? (
                <>
                  <button
                    style={{ color: "#000" }}
                    onClick={() => navigate("/edit-post")}
                  >
                    <EditPost /> 게시글 수정
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

        {/* 게시글 삭제 확인 모달 */}
        {isDeleteModalOpen && (
          <div css={modalOverlay}>
            <Modal
              message="댓글을 삭제하시겠습니까?"
              confirmText="삭제"
              cancelText="취소"
              onConfirm={confirmDeletePost}
              onCancel={() => setIsDeleteModalOpen(false)}
            />
          </div>
        )}

        {/* 댓글 삭제 확인 모달 */}
        {isCommentDeleteModalOpen && (
          <div css={modalOverlay}>
            <Modal
              message="정말로 댓글을 삭제하시겠습니까?"
              confirmText="삭제"
              cancelText="취소"
              onConfirm={confirmDeleteComment}
              onCancel={() => setIsCommentDeleteModalOpen(false)}
            />
          </div>
        )}
      </div>
    </>
  );
}

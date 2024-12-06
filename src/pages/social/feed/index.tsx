import { useState } from "react";
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
  modalContent,
  reactionsContainer,
  spoilerImageWrapper,
  blurredImage,
  spoilerText,
  blurredContent,
} from "./index.styles";
import Profile from "@assets/icons/profile.svg?react";
import LikeFeed from "@assets/icons/like_feed.svg?react";
import LikeFeedActive from "@assets/icons/like_feed_active.svg?react";
import CommentFeed from "@assets/icons/comment_feed.svg?react";
import ReportButton from "@assets/icons/report_button.svg?react";
import EditPost from "@assets/icons/edit_post.svg?react";
import DeletePost from "@assets/icons/delete_post.svg?react";
import { Modal } from "@stories/modal";
import SEO from "@components/seo";

export default function SocialFeed() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 삭제 확인 모달 상태
  const [showSpoiler, setShowSpoiler] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCountValue, setLikeCountValue] = useState(100);
  const [postUserId] = useState("12345"); // 게시글 작성자의 userId
  const [myUserId] = useState("1231"); // 나의 userId
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const revealSpoiler = () => {
    setShowSpoiler(true);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCountValue(isLiked ? likeCountValue - 1 : likeCountValue + 1);
  };

  const goToCommentPage = () => {
    navigate(`/movie-log/detail?boardId=1`);
  };

  const handleEditPost = () => {
    navigate("/edit-post");
  };

  const handleDeletePost = () => {
    setIsModalOpen(false); // 기존 모달 닫기
    setIsDeleteModalOpen(true); // 삭제 확인 모달 열기
  };

  const confirmDelete = () => {
    setIsDeleteModalOpen(false);
    alert("게시글이 삭제되었습니다.");
    // 게시글 삭제 로직 추가
  };

  return (
    <>
      <SEO
        title={`PICKY: MOVIE LOG`}
        description="MOVIE LOG는 PICKY에 등록된 영화 팬들을 위한 최적의 커뮤니티 서비스입니다. 이곳에서 영화와 관련된 게시물을 올리고, 다른 사용자들과 소통해보세요."
        url="http://localhost:5173/movie-log"
      />

      <div css={wrapper}>
        <div css={banner}></div>
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
          <div css={[contentSection, !showSpoiler && blurredContent]}>
            이 영화 정말 재미있었어요! 꼭 보세요! 👍
          </div>

          <div css={carouselSection}>
            <div css={spoilerImageWrapper} onClick={revealSpoiler}>
              <img
                css={showSpoiler ? undefined : blurredImage}
                src="https://upload.wikimedia.org/wikipedia/ko/thumb/f/f2/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg/220px-%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg"
                alt="사진 1"
                style={{ width: "360px" }}
              />
              {!showSpoiler && (
                <div css={spoilerText}>
                  🚨스포주의🚨 <br /> <p>탭해서 보기</p>
                </div>
              )}
            </div>
          </div>

          <div css={reactionsContainer}>
            <div css={reactionsSection}>
              <span onClick={toggleLike}>
                {isLiked ? <LikeFeedActive /> : <LikeFeed />}{" "}
                {isLiked ? "101" : "100"}
              </span>
              <span onClick={goToCommentPage}>
                <CommentFeed />
                20
              </span>
            </div>
            <div css={moreOptions} onClick={toggleModal}>
              <ReportButton />
            </div>
          </div>
        </div>

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
              <span onClick={goToCommentPage}>
                <CommentFeed />
                20
              </span>
            </div>
            <div css={moreOptions} onClick={toggleModal}>
              <ReportButton />
            </div>
          </div>
        </div>

        {/* 기존 모달 */}
        {isModalOpen && !isDeleteModalOpen && (
          <div css={modalOverlay} onClick={toggleModal}>
            <div css={modalContent} onClick={(e) => e.stopPropagation()}>
              {postUserId === myUserId ? (
                <>
                  <button onClick={handleEditPost} style={{ color: "#000" }}>
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

        {/* 삭제 확인 모달 */}
        {isDeleteModalOpen && (
          <div css={modalOverlay}>
            <Modal
              message="게시글을 삭제하시겠습니까?"
              confirmText="삭제"
              cancelText="취소"
              onConfirm={confirmDelete}
              onCancel={() => setIsDeleteModalOpen(false)}
            />
          </div>
        )}
      </div>
    </>
  );
}

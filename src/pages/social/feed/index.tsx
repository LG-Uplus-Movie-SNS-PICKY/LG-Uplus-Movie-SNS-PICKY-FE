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
  spoilerText,
  blurredContent,
  blurredImage,
  carouselWrapper,
} from "./index.styles";
import Profile from "@assets/icons/profile.svg?react";
import LikeFeed from "@assets/icons/like_feed.svg?react";
import LikeFeedActive from "@assets/icons/like_feed_active.svg?react";
import CommentFeed from "@assets/icons/comment_feed.svg?react";
import ReportButton from "@assets/icons/report_button.svg?react";
import EditPost from "@assets/icons/edit_post.svg?react";
import DeletePost from "@assets/icons/delete_post.svg?react";
import { Modal } from "@stories/modal";
import { MovieLog, BoardContentTypes } from "@stories/movie-log";
import { Toast } from "@stories/toast";
import SEO from "@components/seo";

export default function SocialFeed() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 삭제 확인 모달 상태
  const [spoiler, setSpoiler] = useState(true); // spoiler 상태 (true: 블러 처리, false: 블러 해제)
  const [isLiked, setIsLiked] = useState(false);
  const [likeCountValue, setLikeCountValue] = useState(100);
  const [postUserId] = useState("12345"); // 게시글 작성자의 userId
  const [myUserId] = useState("12345"); // 나의 userId
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
    {
      board_content_id: 2,
      board_content_url:
        "https://upload.wikimedia.org/wikipedia/ko/thumb/f/f2/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg/220px-%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg",
      board_content_type: "Photo",
    },
  ];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const revealSpoiler = () => {
    setSpoiler(false); // 스포일러 해제
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
          <div
            onClick={() => navigate("/movie-log/detail")}
            css={[contentSection, spoiler && blurredContent]}
          >
            이 영화 정말 재미있었어요! 꼭 보세요! 👍
          </div>

          {/* MovieLog Section */}
          <div
            css={carouselWrapper}
            onClick={() => {
              if (!spoiler) navigate("/movie-log/detail");
            }}
          >
            <div
              css={[carouselSection, spoiler && blurredImage]}
              onClick={spoiler ? revealSpoiler : undefined}
            >
              <MovieLog boardContent={boardContent} />
            </div>
            {/* 스포주의 텍스트 */}
            {spoiler && (
              <div css={spoilerText}>
                🚨스포주의🚨 <br /> <p>탭해서 보기</p>
              </div>
            )}
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

          {/* MovieLog Section */}
          <div css={carouselWrapper}>
            <div css={carouselSection}>
              <MovieLog boardContent={boardContent} />
            </div>
          </div>

          <div css={reactionsContainer}>
            <div css={reactionsSection}>
              <span onClick={toggleLike}>
                {isLiked ? <LikeFeedActive /> : <LikeFeed />}{" "}
                {isLiked ? "101" : "100"}
              </span>
              <span onClick={() => navigate("/movie-log/detail")}>
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
    </>
  );
}

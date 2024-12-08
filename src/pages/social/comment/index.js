import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { feedContainer, feedItem, profileSection, textSection, timeSection, contentSection, carouselSection, reactionsSection, wrapper, infoSection, movieTitle, moreOptions, modalOverlay, modalContent, reactionsContainer, commentSection, commentItem, commentProfileSection, commentTextSection, commentTimeSection, commentProfileDetails, commentInputSection, inputWrapper, registerImage, commentBox, CommentInfoSection, carouselWrapper, } from "./index.styles";
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
import { MovieLog } from "@stories/movie-log";
import { Toast } from "@stories/toast";
export default function FeedComment() {
    const [isModalOpen, setIsModalOpen] = useState(false); // 게시글 수정/삭제 모달
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 게시글 삭제 확인 모달
    const [isCommentDeleteModalOpen, setIsCommentDeleteModalOpen] = useState(false); // 댓글 삭제 확인 모달
    const [selectedCommentId, setSelectedCommentId] = useState(null); // 삭제할 댓글 ID
    const [isLiked, setIsLiked] = useState(false); // 좋아요 상태
    const [likeCountValue, setLikeCountValue] = useState(100);
    const [comment, setComment] = useState("");
    const [postUserId] = useState("12345"); // 게시글 작성자의 userId
    const [myUserId] = useState("12345"); // 현재 사용자의 userId
    const [showToast, setShowToast] = useState(false); // 토스트 메시지 상태
    const [toastMessage, setToastMessage] = useState(""); // 토스트 메시지 관리 상태
    const navigate = useNavigate();
    const boardContent = [
        {
            board_content_id: 1,
            board_content_url: "https://upload.wikimedia.org/wikipedia/ko/thumb/f/f2/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg/220px-%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg",
            board_content_type: "Photo",
        },
    ];
    const handleInputChange = (e) => {
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
    const handleDeleteComment = (commentId) => {
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
    return (_jsxs("div", { css: wrapper, children: [_jsxs("div", { css: feedContainer, children: [_jsxs("div", { css: feedItem, children: [_jsxs("div", { css: infoSection, children: [_jsx("div", { css: profileSection, children: _jsx(Profile, {}) }), _jsxs("div", { css: textSection, children: ["\uACBD\uC6D0\uCA29", _jsx("span", { css: movieTitle, children: "\uC5B4\uBCA4\uC838\uC2A4 \uC5D4\uB4DC\uAC8C\uC784" })] })] }), _jsx("div", { css: timeSection, children: "4\uC2DC\uAC04 \uC804" })] }), _jsx("div", { css: contentSection, children: "\uC774 \uC601\uD654 \uC815\uB9D0 \uC7AC\uBBF8\uC788\uC5C8\uC5B4\uC694! \uAF2D \uBCF4\uC138\uC694! \uD83D\uDC4D" }), _jsx("div", { css: carouselWrapper, children: _jsx("div", { css: carouselSection, children: _jsx(MovieLog, { boardContent: boardContent }) }) }), _jsxs("div", { css: reactionsContainer, children: [_jsxs("div", { css: reactionsSection, children: [_jsxs("span", { className: "reaction", onClick: toggleLike, children: [isLiked ? _jsx(LikeFeedActive, {}) : _jsx(LikeFeed, {}), _jsx("span", { className: "like-number", children: likeCountValue })] }), _jsxs("span", { className: "reaction", onClick: () => navigate("/movie-log/detail"), children: [_jsx(CommentFeed, {}), _jsx("span", { className: "comment-number", children: "20" })] })] }), _jsx("div", { css: moreOptions, onClick: toggleModal, children: _jsx(ReportButton, {}) })] })] }), _jsx("div", { css: commentSection, children: [1, 2, 3, 4, 5].map((id) => (_jsx("div", { css: commentItem, children: _jsxs("div", { css: commentProfileSection, children: [_jsxs("div", { css: commentProfileDetails, children: [_jsx(Profile, { width: "32px", height: "32px" }), _jsxs("div", { css: CommentInfoSection, children: [_jsxs("div", { css: commentBox, children: [_jsx("span", { css: commentTimeSection, children: "\uACBD\uC6D0\uCA29" }), "3\uC2DC\uAC04 \uC804"] }), _jsx("div", { css: commentTextSection, children: _jsxs("p", { children: ["\uCD9C\uBC14\uC544\uC544\uC544\uC54C\u3139\u3139\u3139~~~ ", _jsx("br", {}), "\uB108\uBB34 \uB108\uBB34 \uC7AC\uBC0C\uC5B4 \uBBF8\uCCD0\uB530 ", _jsx("br", {}), "\uC9C4\uC9DC \uC190\uC131\uC6B1 \uBBF8\uCCE4\uB530 This is you!!!!"] }) })] })] }), _jsx(CommentReportButton, { onClick: () => handleDeleteComment(id.toString()) })] }) }, id))) }), _jsxs("div", { css: commentInputSection, children: [_jsx(Profile, { width: "36px", height: "36px" }), _jsxs("div", { css: inputWrapper, children: [_jsx("input", { type: "text", placeholder: "\uB313\uAE00 \uCD94\uAC00..", value: comment, onChange: handleInputChange }), comment.trim() ? (_jsx(RegistCommentActive, { css: registerImage, onClick: handleCommentSubmit })) : (_jsx(RegistComment, { css: registerImage, onClick: handleCommentSubmit }))] })] }), isCommentDeleteModalOpen && (_jsx("div", { css: modalOverlay, children: _jsx(Modal, { message: `댓글 ${selectedCommentId}을(를) 삭제하시겠습니까?`, confirmText: "\uC0AD\uC81C", cancelText: "\uCDE8\uC18C", onConfirm: confirmDeleteComment, onCancel: () => setIsCommentDeleteModalOpen(false) }) })), isModalOpen && (_jsx("div", { css: modalOverlay, onClick: toggleModal, children: _jsx("div", { css: modalContent, onClick: (e) => e.stopPropagation(), children: postUserId === myUserId ? (_jsxs(_Fragment, { children: [_jsxs("button", { style: { color: "#000" }, onClick: () => navigate("/movie-log/edit?boardId="), children: [_jsx(EditPost, {}), " \uAC8C\uC2DC\uAE00 \uC218\uC815"] }), _jsxs("button", { onClick: () => {
                                    setIsModalOpen(false);
                                    setIsDeleteModalOpen(true);
                                }, children: [_jsx(DeletePost, {}), " \uC0AD\uC81C\uD558\uAE30"] })] })) : (_jsxs(_Fragment, { children: [_jsx("button", { onClick: handleReport, children: "\uC695\uC124 \uC2E0\uACE0" }), _jsx("button", { onClick: handleReport, children: "\uC2A4\uD3EC\uC77C\uB7EC \uC2E0\uACE0" })] })) }) })), isDeleteModalOpen && (_jsx("div", { css: modalOverlay, children: _jsx(Modal, { message: "\uAC8C\uC2DC\uAE00\uC744 \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?", confirmText: "\uC0AD\uC81C", cancelText: "\uCDE8\uC18C", onConfirm: handleDeletePost, onCancel: () => setIsDeleteModalOpen(false) }) })), showToast && _jsx(Toast, { message: toastMessage, direction: "up" })] }));
}

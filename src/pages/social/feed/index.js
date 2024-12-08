import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { banner, feedContainer, feedItem, profileSection, textSection, timeSection, contentSection, carouselSection, reactionsSection, wrapper, infoSection, movieTitle, moreOptions, modalOverlay, modalContent, reactionsContainer, spoilerText, blurredContent, blurredImage, carouselWrapper, } from "./index.styles";
import Profile from "@assets/icons/profile.svg?react";
import LikeFeed from "@assets/icons/like_feed.svg?react";
import LikeFeedActive from "@assets/icons/like_feed_active.svg?react";
import CommentFeed from "@assets/icons/comment_feed.svg?react";
import ReportButton from "@assets/icons/report_button.svg?react";
import EditPost from "@assets/icons/edit_post.svg?react";
import DeletePost from "@assets/icons/delete_post.svg?react";
import { Modal } from "@stories/modal";
import { MovieLog } from "@stories/movie-log";
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
    const boardContent = [
        {
            board_content_id: 1,
            board_content_url: "https://upload.wikimedia.org/wikipedia/ko/thumb/f/f2/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg/220px-%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg",
            board_content_type: "Photo",
        },
        {
            board_content_id: 2,
            board_content_url: "https://upload.wikimedia.org/wikipedia/ko/thumb/f/f2/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg/220px-%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg",
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
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { title: `PICKY: MOVIE LOG`, description: "MOVIE LOG\uB294 PICKY\uC5D0 \uB4F1\uB85D\uB41C \uC601\uD654 \uD32C\uB4E4\uC744 \uC704\uD55C \uCD5C\uC801\uC758 \uCEE4\uBBA4\uB2C8\uD2F0 \uC11C\uBE44\uC2A4\uC785\uB2C8\uB2E4. \uC774\uACF3\uC5D0\uC11C \uC601\uD654\uC640 \uAD00\uB828\uB41C \uAC8C\uC2DC\uBB3C\uC744 \uC62C\uB9AC\uACE0, \uB2E4\uB978 \uC0AC\uC6A9\uC790\uB4E4\uACFC \uC18C\uD1B5\uD574\uBCF4\uC138\uC694.", url: "http://localhost:5173/movie-log" }), _jsxs("div", { css: wrapper, children: [_jsx("div", { css: banner }), _jsxs("div", { css: feedContainer, children: [_jsxs("div", { css: feedItem, children: [_jsxs("div", { css: infoSection, children: [_jsx("div", { css: profileSection, children: _jsx(Profile, {}) }), _jsxs("div", { css: textSection, children: ["\uACBD\uC6D0\uCA29", _jsx("span", { css: movieTitle, children: "\uC5B4\uBCA4\uC838\uC2A4 \uC5D4\uB4DC\uAC8C\uC784" })] })] }), _jsx("div", { css: timeSection, children: "4\uC2DC\uAC04 \uC804" })] }), _jsx("div", { onClick: () => navigate("/movie-log/detail"), css: [contentSection, spoiler && blurredContent], children: "\uC774 \uC601\uD654 \uC815\uB9D0 \uC7AC\uBBF8\uC788\uC5C8\uC5B4\uC694! \uAF2D \uBCF4\uC138\uC694! \uD83D\uDC4D" }), _jsxs("div", { css: carouselWrapper, onClick: () => {
                                    if (!spoiler)
                                        navigate("/movie-log/detail");
                                }, children: [_jsx("div", { css: [carouselSection, spoiler && blurredImage], onClick: spoiler ? revealSpoiler : undefined, children: _jsx(MovieLog, { boardContent: boardContent }) }), spoiler && (_jsxs("div", { css: spoilerText, children: ["\uD83D\uDEA8\uC2A4\uD3EC\uC8FC\uC758\uD83D\uDEA8 ", _jsx("br", {}), " ", _jsx("p", { children: "\uD0ED\uD574\uC11C \uBCF4\uAE30" })] }))] }), _jsxs("div", { css: reactionsContainer, children: [_jsxs("div", { css: reactionsSection, children: [_jsxs("span", { className: "reaction", onClick: toggleLike, children: [isLiked ? _jsx(LikeFeedActive, {}) : _jsx(LikeFeed, {}), _jsx("span", { className: "like-number", children: likeCountValue })] }), _jsxs("span", { className: "reaction", onClick: () => navigate("/movie-log/detail"), children: [_jsx(CommentFeed, {}), _jsx("span", { className: "comment-number", children: "20" })] })] }), _jsx("div", { css: moreOptions, onClick: toggleModal, children: _jsx(ReportButton, {}) })] })] }), _jsxs("div", { css: feedContainer, children: [_jsxs("div", { css: feedItem, children: [_jsxs("div", { css: infoSection, children: [_jsx("div", { css: profileSection, children: _jsx(Profile, {}) }), _jsxs("div", { css: textSection, children: ["\uACBD\uC6D0\uCA29", _jsx("span", { css: movieTitle, children: "\uC5B4\uBCA4\uC838\uC2A4 \uC5D4\uB4DC\uAC8C\uC784" })] })] }), _jsx("div", { css: timeSection, children: "4\uC2DC\uAC04 \uC804" })] }), _jsx("div", { css: contentSection, children: "\uC774 \uC601\uD654 \uC815\uB9D0 \uC7AC\uBBF8\uC788\uC5C8\uC5B4\uC694! \uAF2D \uBCF4\uC138\uC694! \uD83D\uDC4D" }), _jsx("div", { css: carouselWrapper, children: _jsx("div", { css: carouselSection, children: _jsx(MovieLog, { boardContent: boardContent }) }) }), _jsxs("div", { css: reactionsContainer, children: [_jsxs("div", { css: reactionsSection, children: [_jsxs("span", { onClick: toggleLike, children: [isLiked ? _jsx(LikeFeedActive, {}) : _jsx(LikeFeed, {}), " ", isLiked ? "101" : "100"] }), _jsxs("span", { onClick: () => navigate("/movie-log/detail"), children: [_jsx(CommentFeed, {}), "20"] })] }), _jsx("div", { css: moreOptions, onClick: toggleModal, children: _jsx(ReportButton, {}) })] })] }), isModalOpen && (_jsx("div", { css: modalOverlay, onClick: toggleModal, children: _jsx("div", { css: modalContent, onClick: (e) => e.stopPropagation(), children: postUserId === myUserId ? (_jsxs(_Fragment, { children: [_jsxs("button", { style: { color: "#000" }, onClick: () => navigate("/movie-log/edit?boardId="), children: [_jsx(EditPost, {}), " \uAC8C\uC2DC\uAE00 \uC218\uC815"] }), _jsxs("button", { onClick: () => {
                                            setIsModalOpen(false);
                                            setIsDeleteModalOpen(true);
                                        }, children: [_jsx(DeletePost, {}), " \uC0AD\uC81C\uD558\uAE30"] })] })) : (_jsxs(_Fragment, { children: [_jsx("button", { onClick: handleReport, children: "\uC695\uC124 \uC2E0\uACE0" }), _jsx("button", { onClick: handleReport, children: "\uC2A4\uD3EC\uC77C\uB7EC \uC2E0\uACE0" })] })) }) })), isDeleteModalOpen && (_jsx("div", { css: modalOverlay, children: _jsx(Modal, { message: "\uAC8C\uC2DC\uAE00\uC744 \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?", confirmText: "\uC0AD\uC81C", cancelText: "\uCDE8\uC18C", onConfirm: handleDeletePost, onCancel: () => setIsDeleteModalOpen(false) }) })), showToast && _jsx(Toast, { message: toastMessage, direction: "up" })] })] }));
}

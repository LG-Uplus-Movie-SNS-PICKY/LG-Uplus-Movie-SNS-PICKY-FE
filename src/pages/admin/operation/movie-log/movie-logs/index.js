import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { useState } from "react";
import styles from "./index.styles";
// Swiper Lib Import
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Comment from "@assets/icons/feed-comment.svg?react";
import image1 from "@assets/images/dummy/image1.jpeg";
import image2 from "@assets/images/dummy/image2.jpeg";
import image3 from "@assets/images/dummy/image3.jpeg";
const dummyData = [image1, image2, image3];
const dummyCommentData = [
    {
        profile: {
            image: image1,
            name: "꼬미",
        },
        comment: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis est omnis inventore laboriosam laudantium consectetur, aperiam quisquam fugiat, suscipit aut voluptas sapiente atque dolor vitae autem labore ullam excepturi iste.",
        created_at: "4시간 전",
    },
    {
        profile: {
            image: image2,
            name: "Coming",
        },
        comment: "왈왈!",
        created_at: "4시간 전",
    },
    {
        profile: {
            image: image3,
            name: "왈왈왈",
        },
        comment: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis est omnis inventore laboriosam laudantium consectetur, aperiam quisquam fugiat",
        created_at: "4시간 전",
    },
];
function MovieLogsOpertionPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [toggled, setToggled] = useState(false);
    return (_jsx(_Fragment, { children: _jsxs("div", { css: styles.reportContainer(), children: [_jsxs("div", { css: styles.reportCard(), children: [_jsxs("div", { css: styles.reportCardHeader(), children: [_jsx("div", { style: { display: "flex", gap: "16px", alignItems: "center" }, children: _jsxs("div", { css: styles.profilePanel(), children: [_jsx("div", { className: "profile_image", children: _jsx("img", {}) }), _jsxs("div", { className: "profile_info", children: [_jsx("span", { children: "Amanda" }), _jsx("span", { children: "Eternal Sunshine" })] })] }) }), _jsx("button", { css: styles.toggleBtn(), onClick: () => setToggled(!toggled), className: toggled ? "toggled" : "", children: _jsx("div", { className: "thumb" }) })] }), _jsx("div", { css: styles.line() }), _jsxs("div", { css: styles.reportInfoContainer(), children: [_jsxs("div", { css: styles.reportMessageBox(), children: [_jsx("p", { className: "description", children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus itaque maiores iusto dignissimos saepe sequi assumenda, nesciunt molestiae magni libero earum reprehenderit explicabo nisi eius laborum. Impedit aliquid fuga cum." }), _jsx(Swiper, { slidesPerView: "auto", spaceBetween: 10, direction: "horizontal", freeMode: true, modules: [FreeMode, Mousewheel], mousewheel: {
                                                forceToAxis: true,
                                            }, css: styles.swiperContainer(), children: dummyData.map((data, idx) => {
                                                return (_jsx(SwiperSlide, { children: _jsx("img", { src: data, alt: idx.toString() }) }, idx));
                                            }) })] }), _jsxs("div", { css: styles.commentContainer(), onClick: () => setModalOpen(true), children: [_jsx(Comment, {}), _jsx("span", { children: "24" })] })] })] }), modalOpen ? (_jsx("div", { css: styles.modalOuterContainer(), onClick: () => setModalOpen(false), children: _jsxs("div", { css: styles.modalContainer(), onClick: (event) => event.stopPropagation(), children: [_jsx("div", { css: styles.modalHeader(), children: _jsxs("div", { className: "profile", children: [_jsx("div", { className: "profile_image", children: _jsx("img", {}) }), _jsxs("div", { className: "profile_info", children: [_jsx("span", { children: "Amanda" }), _jsx("span", { children: "Eternal Sunshine" })] })] }) }), _jsx("div", { css: styles.line() }), _jsx("div", { css: styles.modalContent(), children: dummyCommentData.length ? (dummyCommentData.map((comment) => (_jsxs("div", { css: styles.modalCommentCard(), children: [_jsxs("div", { className: "profile", children: [_jsx("div", { className: "profile_image", children: _jsx("img", { src: comment.profile.image }) }), _jsxs("div", { className: "profile_info", children: [_jsxs("div", { className: "profile_info-created", children: [_jsx("span", { children: comment.profile.name }), _jsx("span", { className: "date", children: comment.created_at })] }), _jsx("p", { className: "comment", children: comment.comment })] })] }), _jsx("button", { css: styles.miniToggleBtn(), onClick: () => setToggled(!toggled), className: toggled ? "toggled" : "", children: _jsx("div", { className: "thumb" }) })] })))) : (_jsx("div", { className: "no-reviews", children: "\uD604\uC7AC \uAC8C\uC2DC\uBB3C\uC5D0\uB294 \uC544\uBB34 \uB313\uAE00\uC774 \uB2EC\uB9AC\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4." })) })] }) })) : null] }) }));
}
export default MovieLogsOpertionPage;

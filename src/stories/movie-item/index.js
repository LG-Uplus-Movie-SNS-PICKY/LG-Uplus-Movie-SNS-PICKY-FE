import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import styles from "./index.styles";
import Star from "@assets/icons/star.svg?react";
import Like from "@assets/icons/like.svg?react";
import Comment from "@assets/icons/comment.svg?react";
import Checked from "@assets/icons/checked-movie.svg?react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// 평점을 보여주는 컴포넌트
function RateComponent({ rate }) {
    return (_jsxs("div", { css: styles.movieItemRate(), children: [_jsx("span", { children: "\uD3C9\uC810" }), _jsx(Star, { width: "12px" }), _jsx("span", { children: rate })] }));
}
// 좋아요와 댓글의 개수를 보여주는 컴포넌트
function InfoComponent({ like, comment }) {
    return (_jsxs("div", { css: styles.movieItemAllInfo(), children: [_jsxs("div", { className: "item_layout", children: [_jsx(Like, { width: "12px" }), _jsx("span", { children: like })] }), _jsxs("div", { className: "item_layout", children: [_jsx(Comment, { width: "12px" }), _jsx("span", { children: comment })] })] }));
}
export function MovieItem({ type, src, title, rate = 0, like = 0, comment = 0, state = "abouttime", name, }) {
    return (_jsxs("div", { css: styles.movieItemContainer(), children: [_jsxs("div", { css: styles.movieItemThumbnail(type === "basic" && state === name), children: [type === "basic" && state === name ? _jsx(Checked, {}) : null, _jsx(LazyLoadImage, { src: src, alt: name, effect: "blur" })] }), _jsx("span", { className: "movie-title", children: title }), type !== "basic" && _jsx(RateComponent, { rate: rate }), type === "all" && _jsx(InfoComponent, { like: like, comment: comment }), _jsx("div", {})] }));
}

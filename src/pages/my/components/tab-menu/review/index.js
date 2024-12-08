import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import styles, { Star, StarContainer, StarRating } from "./index.styles";
import EmptyReview from "@assets/icons/my-page/empty-review.svg?react";
import ThumbsUpSvg from "@assets/icons/thumbs_up_mini.svg?react";
import ThumbsDownSvg from "@assets/icons/thumbs_down_mini.svg?react";
import DeleteCircle from "@assets/icons/my-page/delete.svg?react";
// 사용자가 한줄평을 하나도 등록하지 않았을 경우
function EmptyLineReview() {
    return (_jsxs(_Fragment, { children: [_jsx(EmptyReview, {}), _jsx("h3", { children: "\uD55C\uC904\uD3C9 \uC5C6\uC74C" })] }));
}
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // 24시간 형식
    });
};
function LineReviewContent({ data }) {
    const renderStars = (rating) => {
        return (_jsxs(StarContainer, { children: [Array.from({ length: 5 }).map((_, idx) => {
                    const filled = rating > idx;
                    return _jsx(Star, { filled: filled }, idx);
                }), _jsx(StarRating, { children: rating.toFixed(1) })] }));
    };
    return (_jsxs("div", { css: styles.container(), className: data.length ? "" : "centered", children: [data.length === 0 && _jsx(EmptyLineReview, {}), data.length > 0 &&
                data.map((data, idx) => (_jsxs("div", { css: styles.reviewCard(), children: [_jsx("div", { className: "poster", children: _jsx("img", { src: data.movie.movie_poster_src, alt: data.movie.movie_title }) }), _jsxs("div", { css: styles.reviewInfo(), children: [renderStars(data.line_review_rating), _jsxs("div", { className: "line-review-info", children: [_jsx("div", { children: "\uAD00\uB78C\uD3C9" }), _jsx("p", { children: data.line_review_content })] }), _jsxs("div", { className: "sub-info", children: [_jsx("span", { children: data.movie.movie_title }), _jsx("div", { className: "round" }), _jsx("span", { children: formatDate(data.created_at) })] }), _jsxs("div", { className: "reaction-info", children: [_jsxs("div", { className: "reaction-buttons", children: [_jsx(ThumbsUpSvg, {}), _jsx("span", { children: data.line_review_like })] }), _jsxs("div", { className: "reaction-buttons", children: [_jsx(ThumbsDownSvg, {}), _jsx("span", { children: data.line_review_hate })] })] })] }), _jsx("div", { css: styles.reviewDeleteBtn(), children: _jsx(DeleteCircle, {}) })] }, data.line_review_id)))] }));
}
export default LineReviewContent;

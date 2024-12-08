import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import EmptyFeed from "@assets/icons/my-page/empty-feed.svg?react";
import styles from "./index.styles";
// 사용자가 게시글을 하나도 등록하지 않았을 경우
function EmptyMovieLog() {
    return (_jsxs(_Fragment, { children: [_jsx(EmptyFeed, {}), _jsx("h3", { children: "\uAC8C\uC2DC\uAE00 \uC5C6\uC74C" })] }));
}
function MovieLogContnent({ data }) {
    return (_jsxs("div", { css: styles.container(), className: data.length ? "" : "centered", children: [data.length === 0 && _jsx(EmptyMovieLog, {}), data.length > 0 &&
                data.map((element) => _jsx("div", { className: "movie-log" }))] }));
}
export default MovieLogContnent;

import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./index.styles";
import EmptyLike from "@assets/icons/my-page/empty-like.svg?react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useState } from "react";
// 사용자가 좋아요를 누른 영화가 하나도 등록하지 않았을 경우
function EmptyLikeMovie() {
    return (_jsxs(_Fragment, { children: [_jsx(EmptyLike, {}), _jsx("h3", { children: "\uC88B\uC544\uC694 \uB204\uB978 \uC601\uD654 \uC5C6\uC74C" })] }));
}
function ImageWithFallback({ src, title }) {
    const [isLoaded, setIsLoaded] = useState(false);
    return (_jsxs(_Fragment, { children: [_jsx(LazyLoadImage, { src: src, alt: title, effect: "blur", onLoad: () => setIsLoaded(true) }), !isLoaded && _jsx("span", { children: title })] }));
}
function LikeMovieContent({ data }) {
    return (_jsxs("div", { css: styles.container(), className: data.length ? "" : "centered", children: [data.length === 0 && _jsx(EmptyLikeMovie, {}), data.length > 0 &&
                data.map((movie) => (_jsx("div", { css: styles.movieCard(), children: _jsx(ImageWithFallback, { src: movie.movie_poster_url, title: movie.movie_title }) }, movie.movie_id)))] }));
}
export default LikeMovieContent;

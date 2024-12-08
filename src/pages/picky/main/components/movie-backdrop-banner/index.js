import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import styles from "./index.styles";
function MovieBackdropBanner({ movie }) {
    return (
    // Movie Backdrop Banner (Best Movie 평점 1등)
    _jsx("div", { css: styles.backdropBanner(movie.movie_backdrop_url), children: _jsx("div", { className: "shadow-box", children: _jsxs("div", { className: "movie-info", children: [_jsx("h3", { children: movie.movie_title }), _jsxs("div", { children: [_jsxs("span", { children: ["\uBCC4\uC810: \u2605 ", movie.movie_total_rating.toFixed(1)] }), _jsx("span", { children: movie.movie_genres.join(", ") })] })] }) }) }));
}
export default MovieBackdropBanner;

import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import styles from "./index.styles";
import teddy from "@assets/images/teddy.png";
import bestMovies from "@pages/main/constants";
// 공통 컴포넌트 import
import { MovieItem } from "@stories/movie-item";
import Emoji from "@pages/signup/components/emoji";
import GenreButtons from "@components/genre";
function GenresMovie() {
    return (_jsx("div", { css: styles.genreContainer(), children: _jsxs("div", { css: styles.genreCard(), children: [_jsxs("div", { className: "title", children: [_jsx(Emoji, { src: teddy, alt: "teddy", width: "16px", height: "16px" }), _jsx("span", { children: "PICKY\uAC00 \uCD94\uCC9C\uD558\uB294 \uC7A5\uB974\uBCC4 \uB9DE\uCDA4 \uC601\uD654" })] }), _jsx("div", { className: "genres", children: _jsx(GenreButtons, {}) }), _jsx("div", { className: "select-genre", children: bestMovies.length > 0 &&
                        bestMovies
                            .slice(0, 6)
                            .map((movie, idx) => (_jsx(MovieItem, { type: "rate", src: movie.src, title: movie.title, name: movie.name, rate: movie.rate, like: movie.like, comment: movie.comment }, idx))) })] }) }));
}
export default GenresMovie;

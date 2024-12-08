import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Top10 from "@assets/icons/top10.svg?react";
import Info from "@assets/icons/info.svg?react";
import styles from "./index.styles";
import { MovieItem } from "@stories/movie-item";
import bestMovies from "@pages/main/constants";
function FamousMovie({ isLogin }) {
    return (_jsxs("div", { css: styles.famousContainer(), children: [_jsxs("div", { css: styles.titleWrapper(), children: [_jsxs("div", { className: "title", children: [_jsx(Top10, {}), _jsx("h3", { children: "picky top 10" })] }), _jsx(Info, {})] }), _jsx(Swiper, { slidesPerView: 3.8, spaceBetween: 10, direction: "horizontal", freeMode: true, modules: [FreeMode, Mousewheel], mousewheel: {
                    forceToAxis: true,
                }, css: styles.swiperContainer(), children: bestMovies.length > 0 &&
                    bestMovies.map((movie, idx) => {
                        return (_jsx(SwiperSlide, { children: _jsx(MovieItem, { type: isLogin ? "all" : "rate", src: movie.src, title: movie.title, name: movie.name, rate: movie.rate, like: movie.like, comment: movie.comment }) }, idx));
                    }) })] }));
}
export default FamousMovie;

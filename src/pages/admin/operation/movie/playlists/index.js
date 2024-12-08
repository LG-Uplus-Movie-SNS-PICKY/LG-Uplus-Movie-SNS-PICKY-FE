import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import styles from "./index.styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import AddCircleIcon from "@assets/icons/add_circle_small.svg?react";
import image3 from "@assets/images/dummy/image3.jpeg";
import { MovieItem } from "@stories/movie-item";
const dummyMoviePlaylistData = [
    {
        poster: image3,
        name: "꼬미 시리즈 1",
    },
    {
        poster: image3,
        name: "꼬미 시리즈 2",
    },
    {
        poster: image3,
        name: "꼬미 시리즈 3",
    },
    {
        poster: image3,
        name: "꼬미 시리즈 4",
    },
    {
        poster: image3,
        name: "꼬미 시리즈 5",
    },
    {
        poster: image3,
        name: "꼬미 시리즈 6",
    },
    {
        poster: image3,
        name: "꼬미 시리즈 7",
    },
    {
        poster: image3,
        name: "꼬미 시리즈 8",
    },
    {
        poster: image3,
        name: "꼬미 시리즈 9",
    },
    {
        poster: image3,
        name: "꼬미 시리즈 10",
    },
    {
        poster: image3,
        name: "꼬미 시리즈 11",
    },
    {
        poster: image3,
        name: "꼬미 시리즈 12",
    },
];
function MoviePlaylistOpertionPage() {
    return (_jsxs(_Fragment, { children: [_jsx("div", { css: styles.titleHeaderContainer(), children: _jsxs("div", { className: "container", children: [_jsxs("div", { className: "section total", children: [_jsx("h3", { children: "Total Playlist:" }), _jsx("span", { children: "36" })] }), _jsx("div", { className: "section add", children: _jsxs("button", { children: [_jsx(AddCircleIcon, { width: "16px", height: "16px" }), _jsx("span", { children: "\uCD94\uAC00" })] }) })] }) }), _jsx("div", { css: styles.playlistContainer(), children: _jsxs("div", { css: styles.playlistCard(), children: [_jsxs("div", { css: styles.playlistCardHeader(), children: [_jsx("h3", { className: "playlist-title", children: "\uBE68\uAC04\uC548\uACBD \uC774\uB3D9\uC9C4\uC758 \uD53D Pick" }), _jsxs("div", { css: styles.actionButton(), children: [_jsx("button", { children: "\uC218\uC815" }), _jsx("button", { children: "\uC0AD\uC81C" })] })] }), _jsx("div", { css: styles.reportInfoContainer(), children: _jsx(Swiper, { slidesPerView: "auto", spaceBetween: 10, direction: "horizontal", freeMode: true, modules: [FreeMode, Mousewheel], mousewheel: {
                                    forceToAxis: true,
                                }, css: styles.swiperContainer(), children: dummyMoviePlaylistData.map((data, idx) => {
                                    return (_jsx(SwiperSlide, { children: _jsx(MovieItem, { type: "basic", src: data.poster, title: data.name, name: data.name }) }, idx));
                                }) }) })] }) })] }));
}
export default MoviePlaylistOpertionPage;

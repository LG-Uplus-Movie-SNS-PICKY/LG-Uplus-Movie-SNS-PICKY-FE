import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import Netflix from "@assets/icons/netflix.svg?react";
import Watcha from "@assets/icons/watcha.svg?react";
import styles from "./index.styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
const dummyData = [
    {
        poster: "https://i.namu.wiki/i/55Y_mFY2MGI2pKrhXVfgXi27wSvdg3F4IovLwH-i5gf1nhWb-IL-6ZVAJW_MsnNahUNYljq7ep1uskFK-OiRkg.webp",
        title: "티파니에서 아침을",
        rate: 4.2,
        genres: ["드라마", "로맨스", "코미디"],
        service: [
            "netflix",
            "watcha",
            "tving",
            "disneyplus",
            "coupangplay",
            "wavve",
        ],
    },
    {
        poster: "https://i.namu.wiki/i/55Y_mFY2MGI2pKrhXVfgXi27wSvdg3F4IovLwH-i5gf1nhWb-IL-6ZVAJW_MsnNahUNYljq7ep1uskFK-OiRkg.webp",
        title: "티파니에서 아침을",
        rate: 4.2,
        genres: ["드라마", "로맨스", "코미디"],
        service: ["netflix", "watcha", "tving", "disneyplus", "coupangplay"],
    },
    {
        poster: "https://i.namu.wiki/i/55Y_mFY2MGI2pKrhXVfgXi27wSvdg3F4IovLwH-i5gf1nhWb-IL-6ZVAJW_MsnNahUNYljq7ep1uskFK-OiRkg.webp",
        title: "티파니에서 아침을",
        rate: 4.2,
        genres: ["드라마", "로맨스", "코미디"],
        service: ["netflix", "watcha", "tving", "disneyplus"],
    },
    {
        poster: "https://i.namu.wiki/i/55Y_mFY2MGI2pKrhXVfgXi27wSvdg3F4IovLwH-i5gf1nhWb-IL-6ZVAJW_MsnNahUNYljq7ep1uskFK-OiRkg.webp",
        title: "티파니에서 아침을",
        rate: 4.2,
        genres: ["드라마", "로맨스", "코미디"],
        service: ["netflix", "watcha", "tving"],
    },
    {
        poster: "https://i.namu.wiki/i/55Y_mFY2MGI2pKrhXVfgXi27wSvdg3F4IovLwH-i5gf1nhWb-IL-6ZVAJW_MsnNahUNYljq7ep1uskFK-OiRkg.webp",
        title: "티파니에서 아침을",
        rate: 4.2,
        genres: ["드라마", "로맨스", "코미디"],
        service: ["netflix", "watcha"],
    },
];
const posterDummySrc = "https://i.namu.wiki/i/55Y_mFY2MGI2pKrhXVfgXi27wSvdg3F4IovLwH-i5gf1nhWb-IL-6ZVAJW_MsnNahUNYljq7ep1uskFK-OiRkg.webp";
/**
 * 사용자 맞춤 영화를 보여주는 슬라이더
 * @returns
 */
function RecommendMovieSlider() {
    return (_jsx(Swiper, { slidesPerView: "auto", spaceBetween: 30, centeredSlides: true, modules: [Autoplay], loop: true, touchRatio: 0, autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        }, css: styles.swiperContainer(), children: dummyData.length > 0 &&
            dummyData.map((data, idx) => (_jsx(SwiperSlide, { children: _jsxs("div", { css: styles.sliderItem(data.poster), children: [_jsx("div", { className: "background" }), _jsxs("div", { css: styles.content(), children: [_jsx("div", { css: styles.badgeContainer(), children: _jsx("div", { className: "badge", children: "PICKY \uCD94\uCC9C \uC601\uD654" }) }), _jsx("div", { css: styles.moviePosterContainer(), children: _jsx("img", { src: data.poster, alt: "image" }) }), _jsxs("div", { css: styles.movieInfoContainer(), children: [_jsxs("div", { className: "movie-info", children: [_jsx("h3", { children: "\uD2F0\uD30C\uB2C8\uC5D0\uC11C \uC544\uCE68\uC744" }), _jsxs("div", { className: "movie-sub-info", children: [_jsxs("span", { className: "rate", children: ["\uBCC4\uC810: \u2605 ", data.rate] }), _jsx("span", { className: "genres", children: data.genres.join(", ") })] })] }), _jsxs("div", { className: "ott-service", children: [_jsx("div", { className: "badge", children: _jsx(Netflix, { width: 32, height: 32 }) }), _jsx("div", { className: "badge", children: _jsx(Watcha, { width: 32, height: 32 }) }), _jsx("div", { className: "badge more-service", children: "2+" })] })] })] })] }) }, idx))) }));
}
export default RecommendMovieSlider;

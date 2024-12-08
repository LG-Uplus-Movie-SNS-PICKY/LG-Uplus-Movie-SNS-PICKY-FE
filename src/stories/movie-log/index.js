import { jsx as _jsx } from "@emotion/react/jsx-runtime";
// Swiper Lib Import
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./index.styles";
export function MovieLog({ boardContent }) {
    return (_jsx(Swiper, { slidesPerView: "auto", spaceBetween: 4, direction: "horizontal", modules: [Pagination, Mousewheel], pagination: {
            dynamicBullets: true,
        }, mousewheel: {
            forceToAxis: true,
        }, css: styles.swiper(), children: boardContent.map((content, idx) => (_jsx(SwiperSlide, { children: _jsx("img", { src: content.board_content_url, alt: content.board_content_id.toString() }) }, content.board_content_id))) }));
}

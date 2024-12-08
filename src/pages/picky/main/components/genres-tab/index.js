import { Fragment as _Fragment, jsx as _jsx } from "@emotion/react/jsx-runtime";
import styles from "./index.styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useRecoilValueLoadable } from "recoil";
import { genresSelector } from "@recoil/selectors/genresSelector";
import { GenreTabButton } from "@stories/genre-tab";
import { useNavigate } from "react-router-dom";
function GenreTab() {
    const navigate = useNavigate();
    const loadable = useRecoilValueLoadable(genresSelector);
    if (loadable.state === "loading")
        return _jsx(_Fragment, {});
    if (loadable.state === "hasError")
        return _jsx(_Fragment, {});
    const genres = loadable.contents.data;
    return ((genres === null || genres === void 0 ? void 0 : genres.length) > 0 && (_jsx(Swiper, { slidesPerView: "auto", spaceBetween: 10, direction: "horizontal", freeMode: true, modules: [FreeMode, Mousewheel], mousewheel: {
            forceToAxis: true,
        }, css: styles.swiperContainer(), children: genres.map((genre) => (_jsx(SwiperSlide, { children: _jsx(GenreTabButton, { label: genre.name, emoji: genre.name, btnType: "Round", padding: "8px 16px", onClick: () => navigate(`/genre/${genre.id}`) }) }, genre.id))) }, crypto.randomUUID())));
}
export default GenreTab;

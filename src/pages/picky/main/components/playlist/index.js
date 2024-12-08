var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./index.styles";
import { MovieItem } from "@stories/movie-item";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
// 리액트 쿼리 queryFn
function fetchMovies(pageParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data } = yield axios.get(`${import.meta.env.VITE_SERVER_URL}/api/movie/playlist?page=${pageParam}&limit=3`);
        return data;
    });
}
function PlayListSection() {
    // 리액트 쿼리를 이용한 스크롤 데이터 업데이트
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error, } = useInfiniteQuery({
        queryKey: ["playlist"],
        queryFn: ({ pageParam = 1 }) => fetchMovies(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            var _a;
            return (_a = lastPage.nextPage) !== null && _a !== void 0 ? _a : undefined;
        },
    });
    // React Intersection Observer -> 뷰포트 마지막을 감지하는 라이브러리르
    const { ref, inView } = useInView({
        threshold: 1.0, // 마지막 요소가 100% 뷰포트에 들어왔을 때 true
    });
    // 뷰포트 마지막을 감지할 경우 더 가져올 데이터가 있을 경우에 플레이리스트 데이터 업데이트
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
    if (isLoading)
        return _jsx("div", { children: "\uB85C\uB529 \uC911..." });
    if (isError)
        return _jsxs("div", { children: ["\uC5D0\uB7EC\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. ", error.message] });
    return (_jsxs("div", { css: styles.container(), children: [Array.isArray(data === null || data === void 0 ? void 0 : data.pages) &&
                (data === null || data === void 0 ? void 0 : data.pages.map((page, index) => (_jsx(React.Fragment, { children: Array.isArray(page === null || page === void 0 ? void 0 : page.data) &&
                        (page === null || page === void 0 ? void 0 : page.data.map((list) => (_jsxs("div", { css: styles.playlistCard(), children: [_jsx("h3", { children: list.movie_playlist_title }), _jsx(Swiper, { slidesPerView: "auto", spaceBetween: 10, direction: "horizontal", freeMode: true, modules: [FreeMode, Mousewheel], mousewheel: {
                                        forceToAxis: true,
                                    }, css: styles.swiperContainer(), children: list.movie_playlist_item.length > 0 &&
                                        list.movie_playlist_item.map((item) => (_jsx(SwiperSlide, { children: _jsx(MovieItem, { type: "basic", src: `https://image.tmdb.org/t/p/original${item.movie_poster_url}`, title: item.movie_title, name: item.movie_title }) }, item.movie_id))) })] }, list.movie_playlist_id)))) }, index)))), _jsx("div", { ref: ref, children: isFetchingNextPage
                    ? "불러오는 중..."
                    : hasNextPage
                        ? "더 이상 데이터가 없습니다"
                        : "" })] }));
}
export default PlayListSection;

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
// pages/movie-detail/reviews/index.tsx
import { useEffect, useState } from "react";
import MovieHeader from "../components/movie-header";
import MovieReviewsPoster from "./components/movie-poster";
import ReviewGraph from "./components/review-graph";
import ReviewRegist from "./components/review-regist";
import MovieReview from "../components/movie-review";
import { MovieReviewContainer, InfoContainer, Title, DetailContainer, DetailText, ReviewsWrapper, FilterContainer, SortContainer, SortOption, SpoilerToggleContainer, SpoilerToggleText, SpoilerToggleButton, } from "./index.styles";
import AgeAllSvg from "../../../assets/icons/age_all.svg?react";
import Age12Svg from "../../../assets/icons/age_12.svg?react";
import Age15Svg from "../../../assets/icons/age_15.svg?react";
import Age19Svg from "../../../assets/icons/age_19.svg?react";
import SpoilerToggleSvg from "@assets/icons/spoiler_toggle.svg?react";
import SpoilerToggleActiveSvg from "@assets/icons/spoiler_toggle_active.svg?react";
import SEO from "@components/seo";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
const fetchReviews = (_a) => __awaiter(void 0, [_a], void 0, function* ({ pageParam = 1, sortBy, }) {
    const response = yield axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/linereview/movie/1`, {
        headers: { Authorization: "123" },
        params: {
            page: pageParam,
            limit: 10,
            sortType: sortBy,
        },
    });
    return response.data;
});
const ReviewsPage = () => {
    const [includeSpoilers, setIncludeSpoilers] = useState(false);
    const [sortBy, setSortBy] = useState("likes");
    const [movieInfo, setMovieInfo] = useState({
        imageUrl: "https://upload.wikimedia.org/wikipedia/ko/thumb/f/f2/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg/1200px-%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%A0%9C%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg",
        title: "어벤져스: 엔드게임",
        year: "2019",
        age: "12",
        runtime: 181,
    });
    const { data: allReviewsData, fetchNextPage: fetchAllReviewsNextPage, hasNextPage: hasAllReviewsNextPage, } = useInfiniteQuery({
        queryKey: ["allReviews"], // 스포일러 토글 상태와 무관한 데이터
        queryFn: ({ pageParam = 1 }) => fetchReviews({ pageParam, sortBy: "latest" }), // 최신순 데이터 전체 가져오기
        initialPageParam: 1,
        getNextPageParam: (lastPage) => { var _a; return (_a = lastPage.nextPage) !== null && _a !== void 0 ? _a : undefined; },
    });
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, } = useInfiniteQuery({
        queryKey: ["reviews", { sortBy, includeSpoilers }], // 스포일러 토글 상태에 따라 데이터 가져오기
        queryFn: ({ pageParam = 1 }) => fetchReviews({ pageParam, sortBy }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => { var _a; return (_a = lastPage.nextPage) !== null && _a !== void 0 ? _a : undefined; },
    });
    const { ref, inView } = useInView({
        threshold: 1.0,
    });
    // 모든 페이지를 병합
    useEffect(() => {
        if (hasAllReviewsNextPage) {
            fetchAllReviewsNextPage(); // 다음 페이지 요청
        }
    }, [allReviewsData, fetchAllReviewsNextPage, hasAllReviewsNextPage]);
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
    const handleToggleSpoilers = () => {
        setIncludeSpoilers(!includeSpoilers);
    };
    const allReviews = (allReviewsData === null || allReviewsData === void 0 ? void 0 : allReviewsData.pages.flatMap((page) => page.data)) || [];
    const filteredReviews = includeSpoilers
        ? allReviews // 스포일러 포함 시 모든 리뷰
        : allReviews.filter((review) => !review.isSpoiler); // 스포일러 제외
    const sortedReviews = [...filteredReviews].sort((a, b) => {
        if (sortBy === "likes") {
            return b.likes - a.likes; // 좋아요 순 정렬
        }
        if (sortBy === "latest") {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // 최신순 정렬
        }
        return 0;
    });
    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}시간 ${mins}분`;
    };
    console.log("모든 리뷰 데이터 개수:", allReviews.length); // 예상 값: 28
    console.log("필터링된 리뷰 데이터 개수:", filteredReviews.length); // 스포일러 필터링 후 개수
    console.log("현재 렌더링 중인 데이터 개수:", sortedReviews.length); // 정렬된 데이터 개수
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { title: `${movieInfo.title}(${movieInfo.year})`, description: `${movieInfo.title}(${movieInfo.year})의 ${(filteredReviews === null || filteredReviews === void 0 ? void 0 : filteredReviews.length) || 0}개의 모든 리뷰를 확인해보세요`, image: movieInfo.imageUrl, url: `http://localhost:5173/${location.pathname}` }), _jsx("div", { style: { width: "100%" }, children: _jsxs(MovieReviewContainer, { children: [_jsx(MovieHeader, {}), _jsx(MovieReviewsPoster, { imageUrl: movieInfo.imageUrl }), _jsxs(InfoContainer, { children: [_jsx(Title, { children: movieInfo.title }), _jsxs(DetailContainer, { children: [_jsx(DetailText, { children: movieInfo.year }), movieInfo.age === "all" && _jsx(AgeAllSvg, {}), movieInfo.age === "12" && _jsx(Age12Svg, {}), movieInfo.age === "15" && _jsx(Age15Svg, {}), movieInfo.age === "19" && _jsx(Age19Svg, {}), _jsx(DetailText, { children: formatRuntime(movieInfo.runtime) })] })] }), _jsx(ReviewGraph, { reviews: allReviews }), _jsx(ReviewRegist, {}), _jsxs(ReviewsWrapper, { children: [_jsxs(FilterContainer, { children: [_jsxs(SortContainer, { children: [_jsx(SortOption, { onClick: () => setSortBy("likes"), active: sortBy === "likes", children: "\uACF5\uAC10\uC21C" }), _jsx(SortOption, { onClick: () => setSortBy("latest"), active: sortBy === "latest", children: "\uCD5C\uC2E0\uC21C" })] }), _jsxs(SpoilerToggleContainer, { children: [_jsx(SpoilerToggleText, { children: "\uC2A4\uD3EC\uC77C\uB7EC \uD3EC\uD568" }), _jsx(SpoilerToggleButton, { onClick: handleToggleSpoilers, children: includeSpoilers ? (_jsx(SpoilerToggleActiveSvg, {})) : (_jsx(SpoilerToggleSvg, {})) })] })] }), _jsx(MovieReview, { reviews: sortedReviews || [], lastReviewRef: ref }), isFetchingNextPage && _jsx("div", { children: "\uB85C\uB529 \uC911..." }), !hasNextPage && _jsx("div", { children: "\uB354 \uC774\uC0C1 \uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." })] })] }) })] }));
};
export default ReviewsPage;

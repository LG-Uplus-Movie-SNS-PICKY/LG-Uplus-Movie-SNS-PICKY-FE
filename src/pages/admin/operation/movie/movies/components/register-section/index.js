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
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import axios from "axios";
import styles from "./index.styles";
import Search from "@assets/icons/search.svg?react";
import AddCircle from "@assets/icons/add_circle.svg?react";
import Logo from "@assets/icons/logo.svg?react";
import Netflix from "@assets/icons/netflix.svg?react";
import Watcha from "@assets/icons/watcha.svg?react";
import Tving from "@assets/icons/tving.svg?react";
import Diesney from "@assets/icons/disneyplus.svg?react";
import Coupang from "@assets/icons/coupangplay.svg?react";
import Wavve from "@assets/icons/wavve.svg?react";
import Check from "@assets/icons/check.svg?react";
import { TMDB_API_KEY, } from "@api/constants";
const ottDummyData = [
    { icon: Netflix, name: "netflix" },
    { icon: Watcha, name: "watcha" },
    { icon: Tving, name: "tving" },
    { icon: Diesney, name: "disneyplus" },
    { icon: Coupang, name: "coupangplay" },
    { icon: Wavve, name: "wavve" },
];
console.log(import.meta.env.VITE_SERVER_URL);
function RegistMovieSection() {
    const [movieSearch, setMovieSearch] = useState("");
    const [isInputFocus, setIsInputFocus] = useState(false); // 입력창 포커스(활성화 도중에만 자동완성 검색 결과 보이기)
    const [movieInfo, setMovieInfo] = useState(null);
    const [activeOttBtn, setActiveOttBtn] = useState({
        netflix: false,
        watcha: false,
        tving: false,
        disneyplus: false,
        coupangplay: false,
        wavve: false,
    });
    // lodash debounce 함수 정의 -> debounce: 짧은 시간 간격으로 발생하는 이벤트를 바로 호출하는 것이 아닌 마지막 이벤트 핸들러만 호출
    const handleSearch = debounce((value) => setMovieSearch(value), 300);
    // 검색어 Input Change Event Handler
    const handleChange = (event) => {
        const value = event.target.value;
        handleSearch(value);
    };
    const fetchAllPages = () => __awaiter(this, void 0, void 0, function* () {
        const { data } = yield axios.get("https://api.themoviedb.org/3/search/movie", {
            params: {
                query: movieSearch,
                language: "ko-KR",
            },
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${TMDB_API_KEY}`,
            },
        });
        return data.results || [];
    });
    const detailMovieInfo = (movieId) => __awaiter(this, void 0, void 0, function* () {
        const { data } = yield axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: {
                append_to_response: "credits",
                language: "ko-KR",
            },
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${TMDB_API_KEY}`,
            },
        });
        setMovieInfo(data);
    });
    // React Query v5의 useQuery 사용
    const { data: result = [], isLoading, isError, } = useQuery({
        queryKey: ["movies", movieSearch],
        queryFn: fetchAllPages,
        enabled: !!movieSearch,
        staleTime: 1000 * 60 * 5, // 5분 동안 데이터 캐시 유지 (옵션)
    });
    return (_jsx(_Fragment, { children: _jsxs("form", { onSubmit: (event) => event.preventDefault(), css: styles.registerForm(), children: [_jsxs("div", { css: styles.registerContainer(), children: [_jsxs("div", { css: styles.registerSearch(), children: [_jsxs("div", { className: "search", children: [_jsx("input", { type: "text", placeholder: "\uB4F1\uB85D\uD560 \uC601\uD654 \uC81C\uBAA9 \uC785\uB825", onChange: handleChange, onFocus: () => setIsInputFocus(true), onBlur: () => setIsInputFocus(false) }), _jsx("button", { children: _jsx(Search, { width: "18px", height: "18px" }) })] }), isInputFocus && movieSearch !== "" && (_jsxs("ul", { css: styles.movieAutoCompleteContainer(result.length > 0), children: [isLoading && _jsx("li", { className: "loading", children: "Loading" }), isError && _jsx("li", { className: "error", children: "Error" }), result.length > 0 &&
                                            result.slice(0, 5).map((element) => (_jsxs("li", { className: "list-item", onMouseDown: () => detailMovieInfo(element.id), children: [_jsxs("div", { children: [_jsx("div", { className: "poster", children: _jsx("img", { src: `https://image.tmdb.org/t/p/original/${element.backdrop_path}` }) }), _jsxs("div", { className: "title", children: [_jsx("h3", { children: element.title }), _jsxs("div", { children: [_jsx("span", { children: element.original_title }), _jsx("span", { children: element.release_date })] })] })] }), _jsx(AddCircle, { width: "24px", height: "24px" })] }, element.id)))] }))] }), _jsx("button", { css: styles.registerButton(), children: "\uB4F1\uB85D\uD558\uAE30" })] }), _jsx("div", { css: styles.movieDetailContainer(), children: !movieInfo ? (_jsxs("div", { className: "no-detail-movie-info", children: [_jsx(Logo, {}), _jsx("h3", { children: "\uAC80\uC0C9\uCC3D\uC5D0 \uC601\uD654 \uC81C\uBAA9 \uAC80\uC0C9 \uD6C4 \uB9AC\uC2A4\uD2B8 \uC911 \uD558\uB098\uB97C \uC120\uD0DD\uD574\uC8FC\uC138\uC694" })] })) : (_jsx("div", { css: styles.movieDetailInfoContainer(), children: _jsxs("div", { className: "movie-detail-info", children: [_jsxs("div", { css: styles.movieDetailTop(), children: [_jsxs("div", { className: "detail", children: [_jsxs("div", { className: "info", children: [_jsx("h3", { children: "\uC81C\uBAA9" }), _jsxs("span", { children: [movieInfo.title, "(", movieInfo.original_title, ")"] })] }), _jsxs("div", { className: "info", children: [_jsx("h3", { children: "\uC7A5\uB974" }), _jsx("span", { children: movieInfo.genres.map((genre) => genre.name).join(", ") })] }), _jsxs("div", { className: "info", children: [_jsx("h3", { children: "\uCD9C\uC2DC\uB144\uB3C4" }), _jsx("span", { children: movieInfo.release_date })] })] }), _jsx("div", { className: "movie-poster", children: _jsx("img", { src: `https://image.tmdb.org/t/p/original/${movieInfo.poster_path}`, alt: movieInfo.original_title }) })] }), _jsxs("div", { className: "desciprtion", children: [_jsx("h3", { children: "\uC18C\uAC1C" }), _jsx("p", { children: movieInfo.overview })] }), _jsxs("div", { css: styles.inputContainer(), children: [_jsxs("div", { className: "input", children: [_jsx("label", { htmlFor: "ost", children: "OST" }), _jsxs("div", { children: [_jsx("input", { type: "text", id: "ost", placeholder: "\uC601\uD654\uC758 OST\uB97C Youtube \uC7AC\uC0DD\uBAA9\uB85D List Param \uAC12\uC744 \uC791\uC131\uD574\uC8FC\uC138\uC694." }), _jsx("span", { children: "* Youtube \uC7AC\uC0DD\uBAA9\uB85D\uC758 List Param \uAC12\uC744 \uAE30\uC785\uD574\uC8FC\uC138\uC694." })] })] }), _jsxs("div", { className: "input", children: [_jsx("label", { htmlFor: "behind", children: "\uBE44\uD558\uC778\uB4DC" }), _jsxs("div", { children: [_jsx("input", { type: "text", id: "behind", placeholder: "\uC601\uD654\uC758 \uBE44\uD558\uC778\uB4DC Youtube \uC7AC\uC0DD\uBAA9\uB85D List Param \uAC12\uC744 \uC791\uC131\uD574\uC8FC\uC138\uC694." }), _jsx("span", { children: "* Youtube \uC7AC\uC0DD\uBAA9\uB85D\uC758 List Param \uAC12\uC744 \uAE30\uC785\uD574\uC8FC\uC138\uC694." })] })] })] }), _jsx("div", { className: "select-box", children: ottDummyData.map((data) => {
                                        return (_jsxs("div", { className: "icon-btn", onClick: () => setActiveOttBtn((prev) => (Object.assign(Object.assign({}, prev), { [data.name]: !activeOttBtn[data.name] }))), children: [activeOttBtn[data.name] && (_jsx("div", { className: "selected", children: _jsx(Check, {}) })), React.createElement(data.icon)] }));
                                    }) })] }) })) })] }) }));
}
export default RegistMovieSection;

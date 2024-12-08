import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import React, { useState } from "react";
import styles from "./index.styles";
import Search from "@assets/icons/search_small.svg?react";
import Netflix from "@assets/icons/netflix.svg?react";
import Watcha from "@assets/icons/watcha.svg?react";
import Tving from "@assets/icons/tving.svg?react";
import Diesney from "@assets/icons/disneyplus.svg?react";
import Coupang from "@assets/icons/coupangplay.svg?react";
import Wavve from "@assets/icons/wavve.svg?react";
import Check from "@assets/icons/check.svg?react";
const ottDummyData = [
    { icon: Netflix, name: "netflix" },
    { icon: Watcha, name: "watcha" },
    { icon: Tving, name: "tving" },
    { icon: Diesney, name: "disneyplus" },
    { icon: Coupang, name: "coupangplay" },
    { icon: Wavve, name: "wavve" },
];
const movieInfo = {
    title: "이터널 선샤인",
    original_title: "Eternal Sunshine of the Spotless Mind",
    genres: [
        { id: 1, name: "SF" },
        { id: 2, name: "드라마" },
        { id: 3, name: "로맨스" },
    ],
    release_date: "2004-03-19",
    poster_path: "https://image.tmdb.org/t/p/original/6HNRo7VYpvM5x5O921bEF2BG7f4.jpg",
    overview: "조엘은 아픈 기억만을 지워준다는 라쿠나사를 찾아가 헤어진 연인 클레멘타인의 기억을 지우기로 결심한다. 기억이 사라져 갈수록 조엘은 사랑이 시작되던 순간, 행복한 기억들, 가슴 속에 각인된 추억들을 지우기 싫어지기만 하는데... 당신을 지우면 이 아픔도 사라질까요? 사랑은 그렇게 다시 기억된다.",
    ost: "lSQKCla2410PSwe",
    behind: "OQPS1245xSCasw",
    service: ["netflix", "disneyplus", "wavve"],
};
function TotalMoviesSection() {
    const [watchServiceUpdateActive, setWatchServiceUpdateActive] = useState(false);
    return (_jsx(_Fragment, { children: _jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "16px" }, children: [_jsxs("div", { css: styles.titleHeaderContainer(), children: [_jsxs("div", { className: "container", children: [_jsxs("div", { className: "section total", children: [_jsx("h3", { children: "Total Movies:" }), _jsx("span", { children: "305" })] }), _jsxs("div", { className: "section search", children: [_jsx("input", { type: "text", placeholder: "\uB4F1\uB85D\uD55C \uC601\uD654\uB97C \uAC80\uC0C9\uD574\uC8FC\uC138\uC694." }), _jsx("button", { children: _jsx(Search, {}) })] })] }), _jsx("div", { className: "gerens", children: _jsx("button", { children: "\uC561\uC158" }) })] }), _jsx("div", { css: styles.movieContainer(), children: _jsxs("div", { css: styles.movieCard(), children: [_jsxs("div", { css: styles.movieDetailTop(), children: [_jsxs("div", { className: "detail", children: [_jsxs("div", { className: "info", children: [_jsx("h3", { children: "\uC81C\uBAA9" }), _jsxs("span", { children: [movieInfo.title, "(", movieInfo.original_title, ")"] })] }), _jsxs("div", { className: "info", children: [_jsx("h3", { children: "\uC7A5\uB974" }), _jsx("span", { children: movieInfo.genres.map((genre) => genre.name).join(", ") })] }), _jsxs("div", { className: "info", children: [_jsx("h3", { children: "\uCD9C\uC2DC\uB144\uB3C4" }), _jsx("span", { children: movieInfo.release_date })] })] }), _jsx("div", { className: "movie-poster", children: _jsx("img", { src: movieInfo.poster_path, alt: movieInfo.original_title }) })] }), _jsxs("div", { css: styles.movieDetailDescription(), children: [_jsx("h3", { children: "\uC18C\uAC1C" }), _jsx("p", { children: movieInfo.overview })] }), _jsxs("div", { css: styles.movieDetailInput(), children: [_jsxs("div", { className: "input-container", children: [_jsx("label", { htmlFor: "ost", children: "OST" }), _jsxs("div", { className: "input", children: [_jsxs("div", { className: "update", children: [_jsx("input", { type: "text", id: "ost", placeholder: "\uC601\uD654\uC758 OST\uB97C Youtube \uC7AC\uC0DD\uBAA9\uB85D List Param \uAC12\uC744 \uC791\uC131\uD574\uC8FC\uC138\uC694.", value: movieInfo.ost, readOnly: true }), _jsx("button", { children: "\uC218\uC815" })] }), _jsx("span", { children: "* Youtube \uC7AC\uC0DD\uBAA9\uB85D\uC758 List Param \uAC12\uC744 \uAE30\uC785\uD574\uC8FC\uC138\uC694." })] })] }), _jsxs("div", { className: "input-container", children: [_jsx("label", { htmlFor: "behind", children: "\uBE44\uD558\uC778\uB4DC" }), _jsxs("div", { className: "input", children: [_jsxs("div", { className: "update", children: [_jsx("input", { type: "text", id: "behind", placeholder: "\uC601\uD654\uC758 \uBE44\uD558\uC778\uB4DC Youtube \uC7AC\uC0DD\uBAA9\uB85D List Param \uAC12\uC744 \uC791\uC131\uD574\uC8FC\uC138\uC694.", value: movieInfo.behind, readOnly: true }), _jsx("button", { children: "\uC218\uC815" })] }), _jsx("span", { children: "* Youtube \uC7AC\uC0DD\uBAA9\uB85D\uC758 List Param \uAC12\uC744 \uAE30\uC785\uD574\uC8FC\uC138\uC694." })] })] })] }), _jsxs("div", { css: styles.movieDetailWatchService(), children: [_jsxs("div", { className: "title", children: [_jsx("h3", { children: "\uC2DC\uCCAD\uD560 \uC218 \uC788\uB294 \uC11C\uBE44\uC2A4" }), _jsx("div", { className: "update", children: _jsx("button", { onClick: () => setWatchServiceUpdateActive(true), children: "\uC218\uC815" }) })] }), _jsx("div", { className: "service", children: ottDummyData.map((data, idx) => {
                                            return (_jsxs("div", { className: `icon-btn ${watchServiceUpdateActive ? "to-updated" : ""}`, children: [movieInfo.service.includes(data.name) && (_jsx("div", { className: "selected", children: _jsx(Check, {}) })), React.createElement(data.icon)] }, idx));
                                        }) })] })] }) })] }) }));
}
export default TotalMoviesSection;

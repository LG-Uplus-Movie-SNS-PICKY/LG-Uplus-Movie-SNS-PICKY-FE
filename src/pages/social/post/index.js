import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // navigate를 위해 추가
import MovieSearch from "@assets/icons/movie_search.svg?react";
import DelButton from "@assets/icons/delete.svg?react";
import BackPost from "@assets/icons/back_post.svg?react";
import Review from "@assets/icons/review.svg?react";
import { Button } from "@stories/button";
import { Modal } from "@stories/modal";
import { wrapper, postContainer, searchBox, searchSection, searchInputWithPadding, movieSearchIcon, autocompleteBox, autocompleteItem, modalOverlay, reviewSection, reviewContainer, reviewInput, charCount, spoilerSection, spoilerContainer, pText, buttonContainer, buttonStyle, activeButtonStyle, shareButton, searchContainer, deleteIcon, backButton, movieInfo, movieTitle, movieDetails, movieGenres, highlightedText, modalContainer, movieCountry, activeAutocompleteItem, reviewIcon, } from "./index.styles";
import { FileInput } from "@stories/file-input";
const mockMovies = [
    {
        title: "아이언맨1",
        releaseDate: "2008.04.30",
        country: "미국",
        genres: ["액션", "SF", "모험"],
    },
    {
        title: "아이언맨2",
        releaseDate: "2008.04.30",
        country: "미국",
        genres: ["액션", "SF", "모험"],
    },
    {
        title: "아이언맨3",
        releaseDate: "2008.04.30",
        country: "미국",
        genres: ["액션", "SF", "모험"],
    },
    {
        title: "어벤져스: 엔드게임",
        releaseDate: "2019.04.24",
        country: "미국",
        genres: ["액션", "SF", "모험"],
    },
    {
        title: "부산행",
        releaseDate: "2016.07.20",
        country: "한국",
        genres: ["스릴러", "드라마", "좀비"],
    },
];
export default function SocialPost() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBackModalOpen, setIsBackModalOpen] = useState(false); // 뒤로가기 모달 상태
    const [selectedMovieData, setSelectedMovieData] = useState(null);
    const [reviewText, setReviewText] = useState("");
    const [selectedSpoiler, setSelectedSpoiler] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1); // 활성화된 항목 인덱스
    const navigate = useNavigate();
    const handleMovieSelect = (movie) => {
        setSelectedMovieData(movie); // 선택한 영화 설정
        setSearchTerm(movie.title);
        setFilteredMovies([]);
        setIsModalOpen(false);
    };
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value) {
            const results = mockMovies.filter((movie) => movie.title.toLowerCase().includes(value.toLowerCase()));
            setFilteredMovies(results);
            setActiveIndex(-1); // 입력 변경 시 인덱스 초기화
        }
        else {
            setFilteredMovies([]);
        }
    };
    const handleKeyDown = (e) => {
        if (filteredMovies.length === 0)
            return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prevIndex) => prevIndex < filteredMovies.length - 1 ? prevIndex + 1 : 0);
        }
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : filteredMovies.length - 1);
        }
        else if (e.key === "Enter") {
            e.preventDefault();
            if (activeIndex >= 0) {
                handleMovieSelect(filteredMovies[activeIndex]);
            }
        }
    };
    const handleOverlayClick = () => {
        setIsModalOpen(false);
        setFilteredMovies([]);
    };
    const handleInputChange = (e) => {
        setReviewText(e.target.value);
    };
    const handleSpoilerClick = (type) => {
        setSelectedSpoiler(type);
    };
    const handleClearSearch = () => {
        setSearchTerm("");
        setFilteredMovies([]);
    };
    const handleBackClick = () => {
        setIsBackModalOpen(true);
    };
    const highlightMatch = (text, query) => {
        const regex = new RegExp(`(${query})`, "gi");
        const parts = text.split(regex);
        return parts.map((part, index) => part.toLowerCase() === query.toLowerCase() ? (_jsx("span", { css: highlightedText, children: part }, index)) : (part));
    };
    return (_jsxs("div", { css: wrapper, children: [isModalOpen && _jsx("div", { css: modalOverlay, onClick: handleOverlayClick }), isBackModalOpen && (_jsxs(_Fragment, { children: [_jsx("div", { css: modalOverlay, onClick: () => setIsBackModalOpen(false) }), _jsx("div", { css: modalContainer, children: _jsx(Modal, { message: "\uACF5\uC720\uD558\uC9C0 \uC54A\uACE0 \uD654\uBA74\uC744 \uB098\uAC00\uBA74 \uC791\uC131 \uC911\uC778 \uB9AC\uBDF0\uAC00 \uC0AD\uC81C\uB420 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uB098\uAC00\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?", confirmText: "\uB098\uAC00\uAE30", cancelText: "\uCDE8\uC18C", onConfirm: () => navigate(-1), onCancel: () => setIsBackModalOpen(false) }) })] })), selectedMovieData ? (_jsxs("div", { css: movieInfo, children: [_jsx("div", { css: backButton, onClick: handleBackClick, children: _jsx(BackPost, {}) }), _jsx("h2", { css: movieTitle, children: selectedMovieData.title }), _jsx("div", { css: movieDetails, children: _jsxs("p", { children: ["\uD83D\uDD51 ", selectedMovieData.releaseDate] }) }), _jsx("div", { css: movieCountry, children: _jsx("p", { children: selectedMovieData.country }) }), _jsx("div", { css: movieGenres, children: selectedMovieData.genres.map((genre, index) => (_jsx("span", { children: genre }, index))) })] })) : (_jsxs("div", { css: searchBox, children: [_jsx("div", { css: backButton, onClick: handleBackClick, children: _jsx(BackPost, {}) }), _jsxs("div", { css: searchContainer, children: [_jsxs("div", { css: searchSection, children: [_jsx("input", { css: searchInputWithPadding, type: "text", placeholder: "\uC601\uD654 \uC81C\uBAA9 \uAC80\uC0C9", value: searchTerm, onChange: handleSearchChange, onKeyDown: handleKeyDown, onFocus: () => setIsModalOpen(true) }), _jsx(MovieSearch, { css: movieSearchIcon }), isModalOpen && (_jsx("button", { css: deleteIcon, onClick: handleClearSearch, children: _jsx(DelButton, {}) }))] }), isModalOpen && filteredMovies.length > 0 && (_jsx("div", { css: autocompleteBox, children: filteredMovies.map((movie, index) => (_jsx("div", { css: [
                                        autocompleteItem,
                                        activeIndex === index && activeAutocompleteItem,
                                    ], onClick: () => handleMovieSelect(movie), children: highlightMatch(movie.title, searchTerm) }, movie.title))) }))] })] })), _jsx("div", { css: postContainer, children: _jsx(FileInput, { type: "media" }) }), _jsx("div", { css: reviewSection, children: _jsxs("div", { css: reviewContainer, children: [!reviewText && _jsx(Review, { css: reviewIcon }), _jsx("textarea", { placeholder: "        \uB9AC\uBDF0\uB97C \uC791\uC131\uD574\uC8FC\uC138\uC694...\r\n\r\n\uC695\uC124, \uBE44\uBC29, \uBA85\uC608\uD6FC\uC190\uC131 \uD45C\uD604\uC740 \uB204\uAD70\uAC00\uC5D0\uAC8C \uC0C1\uCC98\uAC00 \uB420 \uC218 \uC788\uC2B5\uB2C8\uB2E4.", css: reviewInput, value: reviewText, onChange: handleInputChange }), _jsxs("div", { css: charCount, children: [reviewText.length, " / 500"] })] }) }), _jsx("div", { css: spoilerSection, children: _jsxs("div", { css: spoilerContainer, children: [_jsx("p", { css: pText, children: "\uAC8C\uC2DC\uAE00\uC5D0 \uC2A4\uD3EC\uC77C\uB7EC\uAC00 \uD3EC\uD568\uB418\uC5B4\uC788\uB098\uC694?" }), _jsxs("div", { css: buttonContainer, children: [_jsx("button", { css: [
                                        buttonStyle,
                                        selectedSpoiler === "없음" && activeButtonStyle,
                                    ], onClick: () => handleSpoilerClick("없음"), children: "\uC5C6\uC74C" }), _jsx("button", { css: [
                                        buttonStyle,
                                        selectedSpoiler === "있음" && activeButtonStyle,
                                    ], onClick: () => handleSpoilerClick("있음"), children: "\uC788\uC74C" })] })] }) }), _jsx("div", { css: shareButton, children: _jsx(Button, { btnType: "Active", label: "\uACF5\uC720" }) })] }));
}

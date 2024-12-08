import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import ClawMachine from "@assets/icons/claw_machine.svg";
import backButton from "@assets/icons/backButton.svg";
import searchButton from "@assets/icons/searchButton.svg";
import timeIcon from "@assets/icons/time_icon.svg";
import closeButton from "@assets/icons/closeButton.svg";
import filterIcon from "@assets/icons/filter.svg";
import filterActiveIcon from "@assets/icons/filter_active.svg";
import filterMiniActiveIcon from "@assets/icons/filter_mini_active.svg";
import { containerStyle, headerStyle, backButtonStyle, searchButtonStyle, searchInputContainerStyle, filterContainerStyle, filterLabelStyle, filterModalStyle, filterOptionStyle, filterButtonStyle, searchInputStyle, recentSearchHeaderStyle, titleStyle, clearAllButtonStyle, emptyStateContainerStyle, emptyIconStyle, suggestionListStyle, recentSearchListStyle, emptyTextStyle, } from "@pages/search/index.styles";
import SEO from "@components/seo";
const suggestions = [
    { text: "어벤져스 어셈블", type: "영화" },
    { text: "어벤져스 컨피덴셜", type: "영화" },
    { text: "벤자민 버튼의 시간은 거꾸로 간다", type: "영화" },
    { text: "스칼렛 요한슨", type: "배우" },
    { text: "로버트 다우니 주니어", type: "배우" },
    { text: "사용자123", type: "유저" },
    { text: "프로필 설정", type: "유저" },
];
const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm.trim()) {
        return (_jsx("span", { style: { color: "#9D9D9D", fontSize: "16px", fontWeight: "400" }, children: text }));
    }
    const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());
    if (index === -1) {
        return (_jsx("span", { style: { color: "#9D9D9D", fontSize: "16px", fontWeight: "400" }, children: text }));
    }
    const before = text.slice(0, index);
    const match = text.slice(index, index + searchTerm.length);
    const after = text.slice(index + searchTerm.length);
    return (_jsxs(_Fragment, { children: [_jsx("span", { style: { color: "#9D9D9D", fontSize: "16px", fontWeight: "400" }, children: before }), _jsx("span", { style: { color: "#FF084A", fontSize: "16px", fontWeight: "600" }, children: match }), _jsx("span", { style: { color: "#9D9D9D", fontSize: "16px", fontWeight: "400" }, children: after })] }));
};
export default function SearchPage() {
    const [searchText, setSearchText] = useState("");
    const [recentSearches, setRecentSearches] = useState([]);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState("영화");
    const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
    const filterRef = useRef(null);
    useEffect(() => {
        const storedSearches = localStorage.getItem("recentSearches");
        if (storedSearches) {
            setRecentSearches(JSON.parse(storedSearches));
        }
        const handleOutsideClick = (e) => {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                setIsFilterActive(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);
    const saveToLocalStorage = (searches) => {
        localStorage.setItem("recentSearches", JSON.stringify(searches));
    };
    const matchingSuggestions = suggestions.filter((item) => {
        if (selectedFilter) {
            return (item.type === selectedFilter &&
                item.text.toLowerCase().startsWith(searchText.toLowerCase()));
        }
        return item.text.toLowerCase().startsWith(searchText.toLowerCase());
    });
    const handleSearch = () => {
        if (searchText.trim() === "")
            return;
        const updatedSearches = [...new Set([searchText, ...recentSearches])];
        setRecentSearches(updatedSearches);
        saveToLocalStorage(updatedSearches);
        setSearchText("");
    };
    const handleClearAll = () => {
        setRecentSearches([]);
        localStorage.removeItem("recentSearches");
    };
    const handleSuggestionClick = (suggestion) => {
        setSearchText(suggestion);
    };
    const handleDeleteSearch = (search) => {
        const updatedSearches = recentSearches.filter((item) => item !== search);
        setRecentSearches(updatedSearches);
        saveToLocalStorage(updatedSearches);
    };
    const handleFilterSelect = (filter) => {
        setSelectedFilter(filter);
        setIsFilterActive(false);
    };
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { title: "PICKY: SEARCH" }), _jsxs("div", { css: containerStyle, children: [_jsxs("div", { css: headerStyle, children: [_jsx("button", { css: backButtonStyle, children: _jsx("img", { src: backButton, alt: "backButton", width: "12", height: "25" }) }), _jsxs("div", { css: searchInputContainerStyle(isSearchInputFocused), children: [_jsx("div", { css: filterButtonStyle, onClick: () => setIsFilterActive((prev) => !prev), children: _jsxs("div", { css: filterContainerStyle, children: [_jsx("img", { src: selectedFilter
                                                        ? filterMiniActiveIcon
                                                        : isFilterActive
                                                            ? filterActiveIcon
                                                            : filterIcon, alt: "filterIcon" }), _jsx("span", { css: filterLabelStyle, children: selectedFilter })] }) }), _jsx("input", { css: searchInputStyle, placeholder: "\uC601\uD654, \uBC30\uC6B0, \uC720\uC800\uB97C \uAC80\uC0C9\uD574\uBCF4\uC138\uC694.", value: searchText, onChange: (e) => setSearchText(e.target.value), onFocus: () => setIsSearchInputFocused(true), onBlur: () => setIsSearchInputFocused(false), onKeyPress: (e) => {
                                            if (e.key === "Enter")
                                                handleSearch();
                                        } }), _jsx("button", { css: searchButtonStyle, onClick: handleSearch, children: _jsx("img", { src: searchButton, alt: "searchButton", width: "16", height: "16" }) })] })] }), isFilterActive && (_jsx("div", { css: filterModalStyle, ref: filterRef, children: ["영화", "배우", "유저"].map((filter) => (_jsx("div", { css: filterOptionStyle, onClick: () => handleFilterSelect(filter), children: filter }, filter))) })), _jsxs("div", { css: recentSearchHeaderStyle, children: [_jsx("div", { css: titleStyle, children: searchText.trim() === "" ? "최근검색어" : "연관검색어" }), _jsx("button", { css: clearAllButtonStyle, onClick: handleClearAll, children: "\uC804\uCCB4 \uC0AD\uC81C" })] }), searchText.trim() === "" && recentSearches.length === 0 && (_jsxs("div", { css: emptyStateContainerStyle, children: [_jsx("div", { css: emptyIconStyle, children: _jsx("img", { src: ClawMachine, alt: "Claw Machine", width: "100", height: "100" }) }), _jsx("p", { css: emptyTextStyle, children: "\uCD5C\uADFC \uAC80\uC0C9\uC5B4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." })] })), searchText.trim() !== "" && matchingSuggestions.length > 0 && (_jsx("ul", { css: suggestionListStyle, children: matchingSuggestions.map((suggestion, index) => (_jsxs("li", { onClick: () => handleSuggestionClick(suggestion.text), children: [_jsx("img", { src: searchButton, alt: "searchButton" }), _jsx("span", { children: highlightSearchTerm(suggestion.text, searchText) })] }, index))) })), searchText.trim() === "" && recentSearches.length > 0 && (_jsx("ul", { css: recentSearchListStyle, children: recentSearches.map((search, index) => (_jsxs("li", { onClick: () => handleSuggestionClick(search), children: [_jsxs("div", { children: [_jsx("img", { src: timeIcon, alt: "timeIcon" }), _jsx("span", { style: {
                                                fontSize: "16px",
                                                fontWeight: "600",
                                                color: "#9D9D9D",
                                            }, children: search })] }), _jsx("div", { children: _jsx("img", { src: closeButton, alt: "closeButton", onClick: (e) => {
                                            e.stopPropagation();
                                            handleDeleteSearch(search);
                                        } }) })] }, index))) }))] })] }));
}

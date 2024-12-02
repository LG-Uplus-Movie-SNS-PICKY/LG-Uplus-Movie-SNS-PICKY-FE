import { useState, useEffect } from "react";
import ClawMachine from "@assets/icons/claw_machine.svg";
import backButton from "@assets/icons/backButton.svg";
import searchButton from "@assets/icons/searchButton.svg";
import timeIcon from "@assets/icons/time_icon.svg";
import closeButton from "@assets/icons/closeButton.svg";
import {
  containerStyle,
  headerStyle,
  backButtonStyle,
  searchButtonStyle,
  searchInputContainerStyle,
  searchInputStyle,
  recentSearchHeaderStyle,
  titleStyle,
  clearAllButtonStyle,
  emptyStateContainerStyle,
  emptyIconStyle,
  suggestionListStyle,
  recentSearchListStyle,
  emptyTextStyle,
} from "@pages/search/index.styles";

const suggestions = [
  "어벤져스 어셈블",
  "어벤져스 컨피덴셜",
  "어벤져스: 엔드게임",
  "어벤져스: 시크릿 워즈",
  "어벤져스: 인피니티 워",
  "어벤져스 오브 저스티스",
  "어벤져스1",
  "어벤져스2",
];

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const saveToLocalStorage = (searches: string[]) => {
    localStorage.setItem("recentSearches", JSON.stringify(searches));
  };

  const matchingSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = () => {
    if (searchText.trim() === "") return;
    const updatedSearches = [...new Set([searchText, ...recentSearches])];
    setRecentSearches(updatedSearches);
    saveToLocalStorage(updatedSearches);
    setSearchText("");
  };

  const handleClearAll = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchText(suggestion);
  };

  const handleDeleteSearch = (search: string) => {
    const updatedSearches = recentSearches.filter((item) => item !== search);
    setRecentSearches(updatedSearches);
    saveToLocalStorage(updatedSearches);
  };

  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <button css={backButtonStyle}>
          <img src={backButton} alt="backButton" width="12" height="25" />
        </button>
        <div css={searchInputContainerStyle}>
          <input
            css={searchInputStyle}
            placeholder="콘텐츠, 인물, 유저를 검색해보세요."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button css={searchButtonStyle} onClick={handleSearch}>
            <img src={searchButton} alt="searchButton" width="16" height="16" />
          </button>
        </div>
      </div>

      <div css={recentSearchHeaderStyle}>
        <div css={titleStyle}>
          {searchText.trim() === "" ? "최근검색어" : "연관검색어"}
        </div>
        <button css={clearAllButtonStyle} onClick={handleClearAll}>
          전체 삭제
        </button>
      </div>

      {searchText.trim() === "" && recentSearches.length === 0 && (
        <div css={emptyStateContainerStyle}>
          <div css={emptyIconStyle}>
            <img
              src={ClawMachine}
              alt="Claw Machine"
              width="100"
              height="100"
            />
          </div>
          <p css={emptyTextStyle}>최근 검색어가 없습니다.</p>
        </div>
      )}

      {searchText.trim() !== "" && matchingSuggestions.length > 0 && (
        <ul css={suggestionListStyle}>
          {matchingSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              <img src={searchButton} alt="searchButton" />
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      )}

      {searchText.trim() === "" && recentSearches.length > 0 && (
        <ul css={recentSearchListStyle}>
          {recentSearches.map((search, index) => (
            <li key={index} onClick={() => handleSuggestionClick(search)}>
              <div>
                <img src={timeIcon} alt="timeIcon" />
                <span>{search}</span>
              </div>
              <div>
                <img
                  src={closeButton}
                  alt="closeButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSearch(search);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

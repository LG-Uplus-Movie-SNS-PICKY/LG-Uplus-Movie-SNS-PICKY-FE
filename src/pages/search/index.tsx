import { useState, useEffect } from "react";
import ClawMachine from "@assets/icons/claw_machine.svg";
import backButton from "@assets/icons/backButton.svg";
import searchButton from "@assets/icons/searchButton.svg";
import timeIcon from "@assets/icons/time_icon.svg";
import closeButton from "@assets/icons/closeButton.svg";
import filterIcon from "@assets/icons/filter.svg";
import filterActiveIcon from "@assets/icons/filter_active.svg";
import filterMiniActiveIcon from "@assets/icons/filter_mini_active.svg";
import {
  containerStyle,
  headerStyle,
  backButtonStyle,
  searchButtonStyle,
  searchInputContainerStyle,
  filterContainerStyle,
  filterLabelStyle,
  filterModalStyle,
  filterOptionStyle,
  filterButtonStyle,
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
  "벤자민 버튼의 시간은 거꾸로 간다"
];

// 검색어 하이라이트 함수
const highlightSearchTerm = (text: string, searchTerm: string) => {
  // 1. 검색어가 비어 있는 경우
  if (!searchTerm.trim()) {
    // 사용자가 검색어를 입력하지 않았거나 공백만 입력했을 경우,
    // 텍스트 전체를 기본 스타일(#9D9D9D, 회색)로 반환
    return <span style={{ color: "#9D9D9D", fontSize: "16px", fontWeight: "400" }}>{text}</span>;
  }

  // 2. 검색어의 첫 번째 등장 위치를 찾음
  const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());
  // 검색어와 텍스트를 소문자로 변환한 후 비교하여 대소문자를 구분하지 않음
  // 예: 검색어가 "벤"이고 텍스트가 "벤 어셈블"인 경우, index는 0
  // 예: 검색어가 "벤"이고 텍스트가 "어벤져스"인 경우, index는 1

  // 3. 검색어가 텍스트에 없을 경우
  if (index === -1) {
    // 검색어가 텍스트에 포함되지 않으면 텍스트 전체를 기본 스타일(#9D9D9D, 회색)로 반환
    return <span style={{ color: "#9D9D9D", fontSize: "16px", fontWeight: "400" }}>{text}</span>;
  }

  // 4. 텍스트를 세 부분으로 분리
  const before = text.slice(0, index); // 검색어 이전의 텍스트 부분
  const match = text.slice(index, index + searchTerm.length); // 검색어와 일치하는 부분
  const after = text.slice(index + searchTerm.length); // 검색어 이후의 텍스트 부분

  // 5. JSX로 각 부분에 스타일 적용
  return (
    <>
      {/* 검색어 이전의 텍스트에 기본 스타일(#9D9D9D, 회색) 적용 */}
      <span style={{ color: "#9D9D9D", fontSize: "16px", fontWeight: "400" }}>{before}</span>

      {/* 검색어와 일치하는 부분에 강조 스타일(#FF084A, 빨간색) 적용 */}
      <span style={{ color: "#FF084A", fontSize: "16px", fontWeight: "600" }}>{match}</span>

      {/* 검색어 이후의 텍스트에 기본 스타일(#9D9D9D, 회색) 적용 */}
      <span style={{ color: "#9D9D9D", fontSize: "16px", fontWeight: "400" }}>{after}</span>
    </>
  );
};

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFilterActive, setIsFilterActive] = useState(false); // 필터 활성 상태
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null); // 선택된 필터 상태
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);

  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const saveToLocalStorage = (searches: string[]) => {
    localStorage.setItem("recentSearches", JSON.stringify(searches));
  };

  // const matchingSuggestions = suggestions.filter((item) =>
  //   item.toLowerCase().includes(searchText.toLowerCase())
  // );

  const matchingSuggestions = suggestions.filter((item) =>
    item.toLowerCase().startsWith(searchText.toLowerCase()) // 검색어로 시작하는 항목만 필터링
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

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter); // 선택된 필터 업데이트
    setIsFilterActive(false); // 모달 닫기
  };

  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <button css={backButtonStyle}>
          <img src={backButton} alt="backButton" width="12" height="25" />
        </button>
        <div css={searchInputContainerStyle(isSearchInputFocused)}>
          {/* 필터 버튼 활성화 */}
          <div
            css={filterButtonStyle(isFilterActive)} // 조건부 스타일 적용
            onClick={() => setIsFilterActive((prev) => !prev)} // 활성 상태 토글
          >
            <div css={filterContainerStyle}>
              {/* 조건에 따라 필터 아이콘 변경 */}
              <img
                src={
                  selectedFilter
                    ? filterMiniActiveIcon // 필터 선택 시 활성화 아이콘
                    : isFilterActive
                      ? filterActiveIcon // 모달 활성화 시 작은 아이콘
                      : filterIcon // 기본 아이콘
                }
                alt="filterIcon"
              />
              {/* 선택된 필터 표시 */}
              <span css={filterLabelStyle}>{selectedFilter}</span>
            </div>
          </div>
          <input
            css={searchInputStyle}
            placeholder="영화, 인물, 유저를 검색해보세요."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsSearchInputFocused(true)} // 포커스 상태로 변경
            onBlur={() => setIsSearchInputFocused(false)} // 포커스 해제 상태로 변경
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button css={searchButtonStyle} onClick={handleSearch}>
            <img src={searchButton} alt="searchButton" width="16" height="16" />
          </button>
        </div>
      </div>

      {/* 모달창 렌더링 */}
      {isFilterActive && (
        <div css={filterModalStyle}>
          {["영화", "인물", "유저"].map((filter) => (
            <div
              key={filter}
              css={filterOptionStyle}
              onClick={() => handleFilterSelect(filter)} // 필터 선택
            >
              {filter}
            </div>
          ))}
        </div>
      )}


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
              {/* 검색어 하이라이트 */}
              <span>{highlightSearchTerm(suggestion, searchText)}</span>
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
                <span style={{ fontSize: "16px", fontWeight: "600", color: "#9D9D9D" }}>{search}</span>
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

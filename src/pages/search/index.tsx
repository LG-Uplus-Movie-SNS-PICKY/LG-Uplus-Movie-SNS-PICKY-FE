import { useState, useEffect, useRef } from "react";
import ClawMachine from "@assets/icons/claw_machine.svg";
import { useNavigate } from "react-router-dom";
import backButton from "@assets/icons/backButton.svg";
import searchButton from "@assets/icons/searchButton.svg";
import timeIcon from "@assets/icons/time_icon.svg";
import closeButton from "@assets/icons/closeButton.svg";
import filterIcon from "@assets/icons/filter.svg";
import filterActiveIcon from "@assets/icons/filter_active.svg";
import filterMiniActiveIcon from "@assets/icons/filter_mini_active.svg";
import { fetchMovieSearch, fetchUserSearch } from "@api/user";
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
import SEO from "@components/seo";

const highlightSearchTerm = (text: string, searchTerm: string) => {
  if (!searchTerm.trim()) {
    return (
      <span style={{ color: "#9D9D9D", fontSize: "16px", fontWeight: "400" }}>
        {text}
      </span>
    );
  }

  const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());

  if (index === -1) {
    return (
      <span style={{ color: "#9D9D9D", fontSize: "16px", fontWeight: "400" }}>
        {text}
      </span>
    );
  }

  const before = text.slice(0, index);
  const match = text.slice(index, index + searchTerm.length);
  const after = text.slice(index + searchTerm.length);

  return (
    <>
      <span style={{ color: "#9D9D9D", fontSize: "16px", fontWeight: "400" }}>
        {before}
      </span>
      <span style={{ color: "#FF084A", fontSize: "16px", fontWeight: "600" }}>
        {match}
      </span>
      <span style={{ color: "#9D9D9D", fontSize: "16px", fontWeight: "400" }}>
        {after}
      </span>
    </>
  );
};

interface Movie {
  movieId: number;
  movieTitle: string;
  moviePosterUrl: string;
}

interface User {
  userId: number;
  nickname: string;
}

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("영화");
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<
    { id: number; title?: string; nickname?: string; poster?: string }[]
  >([]);

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }

    const handleOutsideClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterActive(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const saveToLocalStorage = (searches: string[]) => {
    localStorage.setItem("recentSearches", JSON.stringify(searches));
  };

  const fetchSearchResults = async () => {
    if (!searchText.trim()) return;

    console.log("fetchSearchResults 호출됨 - 검색어:", searchText);
    console.log("선택된 필터:", selectedFilter);

    try {
      if (selectedFilter === "영화") {
        const movies = await fetchMovieSearch(searchText);
        console.log("API 응답(영화):", movies);

        if (Array.isArray(movies)) {
          setSearchResults(
            movies.map((movie: Movie) => ({
              id: movie.movieId,
              title: movie.movieTitle,
              poster: movie.moviePosterUrl,
            }))
          );
        }
      } else if (selectedFilter === "유저") {
        const users = await fetchUserSearch(searchText);
        console.log("API 응답(유저):", users);

        if (Array.isArray(users)) {
          setSearchResults(
            users.map((user: User) => ({
              id: user.userId,
              nickname: user.nickname,
            }))
          );
        }
      }
    } catch (error) {
      console.error("검색 결과를 가져오는 중 오류 발생:", error);

      if (error instanceof Error) {
        console.error("에러 메시지:", error.message);
      }

      setSearchResults([]);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchText, selectedFilter]);

  const handleSearch = () => {
    if (!searchText.trim()) return;
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
    setSelectedFilter(filter);
    setIsFilterActive(false);
  };

  return (
    <>
      <SEO title="PICKY: SEARCH" />

      <div css={containerStyle}>
        <div css={headerStyle}>
          <button css={backButtonStyle}>
            <img
              src={backButton}
              alt="backButton"
              width="12"
              height="25"
              onClick={() => navigate(-1)}
            />
          </button>
          <div css={searchInputContainerStyle(isSearchInputFocused)}>
            <div
              css={filterButtonStyle}
              onClick={() => setIsFilterActive((prev) => !prev)}
            >
              <div css={filterContainerStyle}>
                <img
                  src={
                    selectedFilter
                      ? filterMiniActiveIcon
                      : isFilterActive
                      ? filterActiveIcon
                      : filterIcon
                  }
                  alt="filterIcon"
                />
                <span css={filterLabelStyle}>{selectedFilter}</span>
              </div>
            </div>
            <input
              css={searchInputStyle}
              placeholder="영화, 배우, 유저를 검색해보세요."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={() => setIsSearchInputFocused(true)}
              onBlur={() => setIsSearchInputFocused(false)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button css={searchButtonStyle} onClick={handleSearch}>
              <img
                src={searchButton}
                alt="searchButton"
                width="16"
                height="16"
              />
            </button>
          </div>
        </div>

        {isFilterActive && (
          <div css={filterModalStyle} ref={filterRef}>
            {["영화", "유저"].map((filter) => (
              <div
                key={filter}
                css={filterOptionStyle}
                onClick={() => handleFilterSelect(filter)}
              >
                {filter}
              </div>
            ))}
          </div>
        )}

        <div css={recentSearchHeaderStyle}>
          <div css={titleStyle}>
            {searchText.trim() === "" ? "최근검색어" : "검색결과"}
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

        {searchText.trim() !== "" && searchResults.length > 0 && (
          <ul css={suggestionListStyle}>
            {searchResults.map((result, index) => {
              const suggestionText = result.title || result.nickname || ""; // undefined일 경우 빈 문자열로 처리
              return (
                <li
                  key={index}
                  onClick={() => {
                    if (result.id) {
                      // 선택된 필터에 따라 경로를 동적으로 설정
                      if (selectedFilter === "영화") {
                        navigate(`/movie/${result.id}`); // 영화 경로로 이동
                      } else if (selectedFilter === "유저") {
                        navigate(`/user/${result.nickname}`); // 유저 경로로 이동
                      } else {
                        console.error("알 수 없는 필터 선택: ", selectedFilter);
                      }
                    } else {
                      console.error("ID가 없거나 유효하지 않습니다.");
                    }
                  }}
                >
                  <img src={searchButton} alt="searchButton" />
                  <span>
                    {highlightSearchTerm(suggestionText, searchText)}{" "}
                    {/* 항상 string 사용 */}
                  </span>
                </li>
              );
            })}
          </ul>
        )}

        {searchText.trim() === "" && recentSearches.length > 0 && (
          <ul css={recentSearchListStyle}>
            {recentSearches.map((search, index) => (
              <li key={index} onClick={() => handleSuggestionClick(search)}>
                <div>
                  <img src={timeIcon} alt="timeIcon" />
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#9D9D9D",
                    }}
                  >
                    {search}
                  </span>
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
    </>
  );
}

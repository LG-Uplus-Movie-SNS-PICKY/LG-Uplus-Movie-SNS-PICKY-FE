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
import { Toast } from "@stories/toast";

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
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [toast, setToast] = useState<{ message: string; direction: 'none' | 'up' | 'down' } | null>(null);

  const showToast = (message: string, direction: 'none' | 'up' | 'down') => {
    setToast({ message, direction });
    setTimeout(() => setToast(null), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex === -1 ? 0 : prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < searchResults.length) {
        const selectedResult = searchResults[activeIndex];
        handleNavigate(selectedResult);
      } else if (searchText.trim()) {
        const matchedResult = searchResults.find(
          (result) =>
            result.title?.toLowerCase() === searchText.toLowerCase() ||
            result.nickname?.toLowerCase() === searchText.toLowerCase()
        );

        if (matchedResult) {
          handleNavigate(matchedResult);
        } else {
          updateRecentSearches(searchText); // 최근 검색어에 저장
          showToast("일치하는 검색어가 없습니다.", "up"); // 토스트 메시지 표시
        }
      }
    }
  };

  const handleSearch = () => {
    if (!searchText.trim()) {
      showToast("검색어를 입력해주세요.", "up");
      return;
    }

    if (searchResults.length === 0) {
      handleNoResults(); // 검색결과가 없는 경우 처리
      return;
    }

    if (activeIndex >= 0 && activeIndex < searchResults.length) {
      const selectedResult = searchResults[activeIndex];
      handleNavigate(selectedResult);
    } else {
      const matchedResult = searchResults.find(
        (result) =>
          result.title?.toLowerCase() === searchText.toLowerCase() ||
          result.nickname?.toLowerCase() === searchText.toLowerCase()
      );

      if (matchedResult) {
        handleNavigate(matchedResult);
      } else {
        setSearchText(""); // 입력창 초기화
        handleNoResults(); // 검색결과가 없는 경우 처리
      }
    }

    setSearchText(""); // 입력창 초기화
  };

  const handleNoResults = () => {
    updateRecentSearches(searchText); // 최근 검색어 업데이트
    setSearchText(""); // 입력창 초기화
    showToast("일치하는 검색어가 없습니다.", "up"); // 토스트 메시지 표시

    // 토스트 메시지가 사라질 때 입력창 비우기
    setToast({
      message: "일치하는 검색어가 없습니다.",
      direction: "up",
    });
    setTimeout(() => {
      setSearchText(""); // 입력창 초기화
      setToast(null); // 토스트 상태 초기화
    }, 2000); // 토스트 메시지 표시 시간과 일치
  };

  const updateRecentSearches = (text: string) => {
    if (!recentSearches.includes(text)) {
      const updatedSearches = [text, ...recentSearches];
      setRecentSearches(updatedSearches); // 상태 업데이트
      saveToLocalStorage(updatedSearches); // 로컬 스토리지에 저장
    }
  };

  const handleNavigate = (result: { id: number; title?: string; nickname?: string }) => {
    const searchTextToAdd = result.title || result.nickname || "";
    updateRecentSearches(searchTextToAdd); // 최근 검색어 업데이트
    if (selectedFilter === "영화") {
      navigate(`/movie/${result.id}`);
    } else if (selectedFilter === "유저") {
      navigate(`/user/${result.nickname}`);
    }
  };

  // const updateRecentSearches = (text: string) => {
  //   if (!recentSearches.includes(text)) {
  //     const updatedSearches = [text, ...recentSearches];
  //     setRecentSearches(updatedSearches); // 상태 업데이트
  //     saveToLocalStorage(updatedSearches); // 로컬 스토리지 업데이트
  //   }
  // };

  const handleSuggestionClick = async (suggestion: string) => {
    setSearchText(suggestion); // 검색 텍스트 업데이트

    // 최근 검색어를 클릭했을 때 서버에서 해당 영화 데이터 가져오기
    try {
      const response = await fetchMovieSearch(suggestion); // API 호출
      if (response?.data?.length > 0) {
        const matchedResult = response.data[0]; // 첫 번째 결과를 가져옴
        console.log("Matched Result:", matchedResult);

        // 해당 영화의 상세 페이지로 이동
        navigate(`/movie/${matchedResult.movieId}`);
      } else {
        // 검색 결과가 없는 경우 처리
      }
    } catch (error) {
      console.error("최근 검색어 클릭 중 오류 발생:", error);
      showToast("오류가 발생했습니다. 다시 시도해주세요.", "up");
    }
  };

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

  // const handleSearch = () => {
  //   if (!searchText.trim()) {
  //     // 입력된 검색어가 없을 때
  //     showToast('일치하는 검색어가 없습니다.', 'up'); // 토스트 메시지 띄우기
  //     return;
  //   }

  //   const matchedResult = searchResults.find(
  //     (result) =>
  //       result.title?.toLowerCase() === searchText.toLowerCase() ||
  //       result.nickname?.toLowerCase() === searchText.toLowerCase()
  //   );

  //   if (matchedResult) {
  //     // 검색 결과에 일치하는 항목이 있으면 이동
  //     handleNavigate(matchedResult);
  //   } else if (searchResults.length === 0) {
  //     // 검색 결과가 없을 때
  //     updateRecentSearches(searchText); // 최근 검색어에 추가
  //     showToast('일치하는 검색어가 없습니다.', 'up'); // 토스트 메시지 띄우기
  //   }
  // };

  const handleClearAll = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  // const handleSuggestionClick = (suggestion: string) => {
  //   setSearchText(suggestion);
  // };

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
              onKeyDown={handleKeyDown} // 키보드 이벤트 추가
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
              const isActive = index === activeIndex; // 활성화된 상태 여부
              return (
                <li
                  key={index}
                  onClick={() => {
                    const searchTextToAdd = suggestionText; // 선택된 검색어 텍스트
                    updateRecentSearches(searchTextToAdd); // 최근 검색어 업데이트
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
                  style={{
                    backgroundColor: isActive ? "rgba(240, 240, 240, 0.5)" : "transparent", // 활성화된 항목의 스타일
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
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
              <li
                key={index}
                onClick={async () => {
                  try {
                    const response = await fetchMovieSearch(search); // API 호출
                    console.log("API Response: ", response); // 전체 응답 데이터 출력

                    if (response?.length > 0) { // response가 배열이고 데이터가 있을 경우
                      const matchedResult = response.find(
                        (movie: Movie) =>
                          movie.movieTitle.toLowerCase() === search.toLowerCase()
                      );

                      if (matchedResult) {
                        console.log("Matched Movie: ", matchedResult); // 일치하는 영화 데이터 출력
                        navigate(`/movie/${matchedResult.movieId}`); // movieId를 기반으로 경로 이동
                      } else {
                        console.warn("검색 결과와 일치하는 영화가 없습니다.");
                        showToast("검색 결과와 일치하는 영화가 없습니다.", "up");
                      }
                    } else {
                      console.warn("검색 결과가 없습니다.");
                      showToast("해당 영화의 상세 정보를 찾을 수 없습니다.", "up");
                    }
                  } catch (error) {
                    console.error("오류 발생:", error);
                    showToast("오류가 발생했습니다. 다시 시도해주세요.", "up");
                  }
                }}
              >
                <div>
                  <img src={timeIcon} alt="timeIcon" />
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#9D9D9D",
                      cursor: "pointer",
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
                      e.stopPropagation(); // 부모 클릭 이벤트 막기
                      handleDeleteSearch(search); // 해당 검색어 삭제
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
        {toast && <Toast message={toast.message} direction={toast.direction} />} {/* Toast 메시지 렌더링 */}
      </div>
    </>
  );
}

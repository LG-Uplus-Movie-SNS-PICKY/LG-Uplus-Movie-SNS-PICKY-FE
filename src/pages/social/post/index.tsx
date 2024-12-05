import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom"; // navigate를 위해 추가
import MovieSearch from "@assets/icons/movie_search.svg?react";
import DelButton from "@assets/icons/delete.svg?react";
import BackPost from "@assets/icons/back_post.svg?react";
import { Button } from "@stories/button";
import { Modal } from "@stories/modal";
import {
  wrapper,
  postContainer,
  searchBox,
  searchSection,
  searchInputWithPadding,
  movieSearchIcon,
  autocompleteBox,
  autocompleteItem,
  modalOverlay,
  reviewSection,
  reviewContainer,
  reviewInput,
  charCount,
  spoilerSection,
  spoilerContainer,
  pText,
  buttonContainer,
  buttonStyle,
  activeButtonStyle,
  shareButton,
  searchContainer,
  searchBoxExpanded,
  deleteIcon,
  backButton,
  movieInfo,
  movieTitle,
  movieDetails,
  movieGenres,
  highlightedText,
  modalContainer,
} from "./index.styles";
import { FileInput } from "@stories/file-input";
import SEO from "@components/seo";

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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredMovies, setFilteredMovies] = useState<typeof mockMovies>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isBackModalOpen, setIsBackModalOpen] = useState<boolean>(false); // 뒤로가기 모달 상태
  const [selectedMovieData, setSelectedMovieData] = useState<
    null | (typeof mockMovies)[0]
  >(null);
  const [reviewText, setReviewText] = useState<string>("");
  const [selectedSpoiler, setSelectedSpoiler] = useState<string>("");

  const navigate = useNavigate();

  const handleMovieSelect = (movie: (typeof mockMovies)[0]) => {
    setSelectedMovieData(movie);
    setSearchTerm("");
    setFilteredMovies([]);
    setIsModalOpen(false);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const results = mockMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredMovies(results);
    } else {
      setFilteredMovies([]);
    }
  };

  const handleOverlayClick = () => {
    setIsModalOpen(false);
    setFilteredMovies([]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleSpoilerClick = (type: string) => {
    setSelectedSpoiler(type);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredMovies([]);
  };

  const handleBackClick = () => {
    setIsBackModalOpen(true);
  };

  const highlightMatch = (text: string, query: string) => {
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} css={highlightedText}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <SEO
        title="PICKY: MOVIE LOG POST"
        description="PICKY에 영화와 관련된 Movie Log 게시물을 올리고, 다른 사용자들과 소통해보세요"
        url="http://localhost:5173/movie-log/add"
      />

      <div css={wrapper}>
        {isModalOpen && <div css={modalOverlay} onClick={handleOverlayClick} />}
        <div css={backButton} onClick={handleBackClick}>
          <BackPost />
        </div>
        {isBackModalOpen && (
          <>
            {/* 화면 어두워지는 오버레이 */}
            <div css={modalOverlay} onClick={() => setIsBackModalOpen(false)} />
            {/* 모달 컨테이너 */}
            <div css={modalContainer}>
              <Modal
                message="공유하지 않고 화면을 나가면 작성 중인 리뷰가 삭제될 수 있습니다. 나가시겠습니까?"
                confirmText="나가기"
                cancelText="취소"
                onConfirm={() => navigate(-1)}
                onCancel={() => setIsBackModalOpen(false)}
              />
            </div>
          </>
        )}

        {selectedMovieData && (
          <div css={movieInfo}>
            <h2 css={movieTitle}>{selectedMovieData.title}</h2>
            <div css={movieDetails}>
              <p>🕑 {selectedMovieData.releaseDate}</p>
              <p>{selectedMovieData.country}</p>
            </div>
            <div css={movieGenres}>
              {selectedMovieData.genres.map((genre, index) => (
                <span key={index}>{genre}</span>
              ))}
            </div>
          </div>
        )}
        {!selectedMovieData && (
          <div
            css={[searchBox, filteredMovies.length > 0 && searchBoxExpanded]}
          >
            <div css={searchContainer}>
              <div css={searchSection}>
                <input
                  css={searchInputWithPadding}
                  type="text"
                  placeholder="영화 제목 검색"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setIsModalOpen(true)}
                />
                <MovieSearch css={movieSearchIcon} />
                {isModalOpen && (
                  <button css={deleteIcon} onClick={handleClearSearch}>
                    <DelButton />
                  </button>
                )}
              </div>
              {filteredMovies.length > 0 && (
                <div css={autocompleteBox}>
                  {filteredMovies.map((movie, index) => (
                    <div
                      key={index}
                      css={autocompleteItem}
                      onClick={() => handleMovieSelect(movie)}
                    >
                      {highlightMatch(movie.title, searchTerm)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div css={postContainer}>
          <FileInput type="media" />
        </div>

        <div css={reviewSection}>
          <div css={reviewContainer}>
            <textarea
              placeholder="✏️ 리뷰를 작성해주세요...&#13;&#10;&#13;&#10;욕설, 비방, 명예훼손성 표현은 누군가에게 상처가 될 수 있습니다."
              css={reviewInput}
              value={reviewText}
              onChange={handleInputChange}
            />
            <div css={charCount}>{reviewText.length} / 500</div>
          </div>
        </div>

        <div css={spoilerSection}>
          <div css={spoilerContainer}>
            <p css={pText}>게시글에 스포일러가 포함되어있나요?</p>
            <div css={buttonContainer}>
              <button
                css={[
                  buttonStyle,
                  selectedSpoiler === "없음" && activeButtonStyle,
                ]}
                onClick={() => handleSpoilerClick("없음")}
              >
                없음
              </button>
              <button
                css={[
                  buttonStyle,
                  selectedSpoiler === "있음" && activeButtonStyle,
                ]}
                onClick={() => handleSpoilerClick("있음")}
              >
                있음
              </button>
            </div>
          </div>
        </div>

        <div css={shareButton}>
          <Button btnType="Active" label="공유" />
        </div>
      </div>
    </>
  );
}

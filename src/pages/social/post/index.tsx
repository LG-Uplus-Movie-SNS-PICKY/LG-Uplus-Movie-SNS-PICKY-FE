import { useState, ChangeEvent } from "react";
import MovieSearch from "@assets/icons/movie_search.svg?react";
import Delete from "@assets/icons/delete.svg?react";
import { FileInput } from "@stories/file-input";
import { Button } from "@stories/button";

import {
  wrapper,
  postContainer,
  searchBox,
  searchSection,
  searchInputWithPadding,
  searchInputActive,
  movieSearchIcon,
  autocompleteBox,
  autocompleteItem,
  modalOverlay,
  modalContent,
  searchInputModal,
  inputContainer,
  deleteIcon,
  reviewContainer,
  reviewInput,
  spoilerContainer,
  pText,
  buttonContainer,
  buttonStyle,
  shareButton,
  activeButtonStyle,
  // shareButton,
} from "./index.styles";

const mockMovies = [
  "아이언맨1",
  "아이언맨2",
  "아이언맨3",
  "어벤져스",
  "어느 멋진 날",
  "부산행",
  "7번방의 선물",
  "명량",
  "광해",
  "내부자들",
  "전우치",
];

export default function SocialPost() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredMovies, setFilteredMovies] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<string>("");
  const [selectedSpoiler, setSelectedSpoiler] = useState<string>("없음"); // "있음" or "없음"

  const handleSpoilerClick = (type: string) => {
    setSelectedSpoiler(type);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const results = mockMovies.filter((movie) =>
        movie.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMovies(results);
    } else {
      setFilteredMovies([]);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSearchTerm("");
    setFilteredMovies([]);
  };

  const handleMovieSelect = (movie: string) => {
    setSelectedMovie(movie);
    setSearchTerm(movie);
    setFilteredMovies([]);
    setIsModalOpen(false);
  };

  return (
    <div css={wrapper}>
      <div css={postContainer}>
        <FileInput type="media" />
      </div>

      <div css={searchBox}>
        <div css={searchSection}>
          <input
            css={[searchInputWithPadding, selectedMovie && searchInputActive]}
            type="text"
            placeholder="영화 제목 검색"
            value={selectedMovie}
            readOnly
            onClick={() => setIsModalOpen(true)}
          />
          <MovieSearch css={movieSearchIcon} />
        </div>
      </div>

      {isModalOpen && (
        <div css={modalOverlay} onClick={handleModalClose}>
          <div css={modalContent} onClick={(e) => e.stopPropagation()}>
            <div css={inputContainer}>
              <input
                css={searchInputModal}
                type="text"
                placeholder="영화 제목을 검색하세요"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Delete css={deleteIcon} onClick={() => setSearchTerm("")} />
            </div>
            {filteredMovies.length > 0 && (
              <div css={autocompleteBox}>
                {filteredMovies.map((movie, index) => (
                  <div
                    key={index}
                    css={autocompleteItem}
                    onClick={() => handleMovieSelect(movie)}
                  >
                    {movie}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div css={reviewContainer}>
        <textarea
          placeholder="리뷰를 작성해주세요..."
          css={reviewInput}
        ></textarea>
      </div>
      <div css={spoilerContainer}>
        <p css={pText}>게시글에 스포일러가 포함되어있나요?</p>
        <div css={buttonContainer}>
          <button
            css={[buttonStyle, selectedSpoiler === "없음" && activeButtonStyle]}
            onClick={() => handleSpoilerClick("없음")}
          >
            없음
          </button>
          <button
            css={[buttonStyle, selectedSpoiler === "있음" && activeButtonStyle]}
            onClick={() => handleSpoilerClick("있음")}
          >
            있음
          </button>
        </div>
      </div>
      <div css={shareButton}>
        <Button label="공유" />
      </div>
    </div>
  );
}

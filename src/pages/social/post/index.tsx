import { useState, ChangeEvent, KeyboardEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createBoard } from "@api/movie";
import MovieSearch from "@assets/icons/movie_search.svg?react";
import DelButton from "@assets/icons/delete.svg?react";
import BackPost from "@assets/icons/back_post.svg?react";
import Review from "@assets/icons/review.svg?react";
import { Button } from "@stories/button";
import { Modal } from "@stories/modal";
import { Toast } from "@stories/toast";
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
  deleteIcon,
  backButton,
  movieInfo,
  movieTitle,
  movieDetails,
  movieGenres,
  modalContainer,
  movieCountry,
  activeAutocompleteItem,
  reviewIcon,
} from "./index.styles";
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

interface MovieData {
  title: string;
  releaseDate: string;
  country: string;
  genres: string[]; // genres는 문자열 배열임
}

export default function SocialPost() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredMovies, setFilteredMovies] = useState<typeof mockMovies>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isBackModalOpen, setIsBackModalOpen] = useState<boolean>(false); // 뒤로가기 모달 상태
  const [selectedMovieData, setSelectedMovieData] = useState<MovieData | null>(
    null
  );
  const [reviewText, setReviewText] = useState<string>("");
  const [selectedSpoiler, setSelectedSpoiler] = useState<string>("null");
  const [activeIndex, setActiveIndex] = useState<number>(-1); // 활성화된 항목 인덱스
  const [fileUrl, setFileUrl] = useState<string>("asdasdasd"); // 파일 URL 저장
  const [images, setImages] = useState<File[]>([]); // 이미지 상태
  const [videos, setVideos] = useState<File[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null); // 토스트 메시지 상태

  const [mediaFiles, setMediaFiles] = useState<File[]>([]); // 업로드 된 파일 정보를 나타내는 상태 변수

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const isButtonActive =
    !!selectedMovieData && // 영화 선택됨
    !!reviewText.trim() && // 리뷰 작성됨
    selectedSpoiler !== "null"; // 스포일러 여부 선택됨
  // images.length > 0 && // 이미지가 업로드됨
  // videos.length > 0; // 이미지가 업로드됨

  // console.log("selectedMovieData:", selectedMovieData);
  // console.log("reviewText.trim():", reviewText.trim());
  // console.log("selectedSpoiler:", selectedSpoiler);
  // console.log("fileUrl:", fileUrl);
  // console.log("isButtonActive:", isButtonActive);

  // console.log(isButtonActive);

  const handleMovieSelect = (movie: (typeof mockMovies)[0]) => {
    setSelectedMovieData(movie);
    setSearchTerm(movie.title);
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

  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight) return text;

    const startIndex = text.toLowerCase().indexOf(highlight.toLowerCase());
    if (startIndex === -1) return text;

    const beforeMatch = text.slice(0, startIndex);
    const match = text.slice(startIndex, startIndex + highlight.length);
    const afterMatch = text.slice(startIndex + highlight.length);

    return (
      <>
        {beforeMatch}
        <span style={{ color: "#FF084A", fontWeight: "bold" }}>{match}</span>
        {afterMatch}
      </>
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (filteredMovies.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex < filteredMovies.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredMovies.length - 1
      );
    } else if (e.key === "Enter") {
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      // console.log("선택된 파일들:", fileArray);

      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...fileArray];
        // console.log("업데이트된 이미지 상태:", updatedImages);
        return updatedImages;
      });
    }
  };

  const handleShareClick = async () => {
    // if (!images.length && !videos.length) {
    //   alert("모든 필드를 작성하고 파일을 업로드해주세요.");

    //   return;
    // }

    console.log(mediaFiles);

    try {
      await createBoard(
        reviewText,
        635302, // movieId를 실제 데이터로 교체 필요
        selectedSpoiler === "있음",
        mediaFiles
      );

      setToastMessage("게시글이 성공적으로 생성되었습니다."); // 성공 메시지
      setTimeout(() => navigate("/movie-log"), 1500);
    } catch (error) {
      console.error("게시글 생성 중 오류 발생:", error);
      setToastMessage("게시글 생성에 실패했습니다.");
    }
  };

  return (
    <div css={wrapper}>
      {isModalOpen && <div css={modalOverlay} onClick={handleOverlayClick} />}

      {isBackModalOpen && (
        <>
          <div css={modalOverlay} onClick={() => setIsBackModalOpen(false)} />
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

      {selectedMovieData ? (
        <div css={movieInfo}>
          <div css={backButton} onClick={handleBackClick}>
            <BackPost />
          </div>
          <h2 css={movieTitle}>{selectedMovieData.title}</h2>
          <div css={movieDetails}>
            <p>🕑 {selectedMovieData.releaseDate}</p>
          </div>
          <div css={movieCountry}>
            <p>{selectedMovieData.country}</p>
          </div>
          <div css={movieGenres}>
            {selectedMovieData?.genres.map((genre: string, index: number) => (
              <span key={`${genre}-${index}`}>{genre}</span>
            ))}
          </div>
        </div>
      ) : (
        <div css={searchBox}>
          <div css={backButton} onClick={handleBackClick}>
            <BackPost />
          </div>
          <div css={searchContainer}>
            <div css={searchSection}>
              <input
                css={searchInputWithPadding}
                type="text"
                placeholder="영화 제목 검색"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsModalOpen(true)}
              />
              <MovieSearch css={movieSearchIcon} />
              {isModalOpen && (
                <button css={deleteIcon} onClick={handleClearSearch}>
                  <DelButton />
                </button>
              )}
            </div>
            {isModalOpen && filteredMovies.length > 0 && (
              <div css={autocompleteBox}>
                {filteredMovies.map((movie, index) => (
                  <div
                    key={movie.title}
                    css={[
                      autocompleteItem,
                      activeIndex === index && activeAutocompleteItem,
                    ]}
                    onClick={() => handleMovieSelect(movie)}
                  >
                    {getHighlightedText(movie.title, searchTerm)}{" "}
                    {/* 하이라이트 함수 적용 */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div css={postContainer}>
        <FileInput
          type="media"
          mediaFiles={mediaFiles}
          setMediaFiles={setMediaFiles}
        />

        {/* <input
          type="file"
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={             }
        /> */}
      </div>

      <div css={reviewSection}>
        <div css={reviewContainer}>
          {!reviewText && <Review css={reviewIcon} />}
          <textarea
            placeholder="        리뷰를 작성해주세요...&#13;&#10;&#13;&#10;욕설, 비방, 명예훼손성 표현은 누군가에게 상처가 될 수 있습니다."
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
        <Button
          primary={isButtonActive}
          btnType="Active"
          label="공유"
          onClick={handleShareClick}
        />
      </div>

      {/* 토스트 메시지 */}
      {toastMessage && <Toast message={toastMessage} direction="up" />}
    </div>
  );
}

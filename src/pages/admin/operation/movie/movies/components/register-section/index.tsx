import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import axios from "axios";

import styles from "./index.styles";

import Search from "@assets/icons/search.svg?react";
import AddCircle from "@assets/icons/add_circle.svg?react";
import Logo from "@assets/icons/logo.svg?react";

import Netflix from "@assets/icons/netflix.svg?react";
import Watcha from "@assets/icons/watcha.svg?react";
import Tving from "@assets/icons/tving.svg?react";
import Diesney from "@assets/icons/Disneyplus.svg?react";
import Coupang from "@assets/icons/coupangplay.svg?react";
import Wavve from "@assets/icons/wavve.svg?react";

import Check from "@assets/icons/check.svg?react";

// Swiper Lib Import
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface Movie {
  [key: string]: unknown;
  id: string;
  backdrop_path: string;
  title: string;
  original_title: string;
  release_date: string;
}

interface Genres {
  id: number;
  name: string;
}

interface DetailMovie {
  [key: string]: unknown;
  title: string;
  original_title: string;
  genres: Genres[];
  release_date: string;
  overview: string;
  poster_path: string;
}

const ottDummyData = [
  { icon: Netflix, name: "netflix" },
  { icon: Watcha, name: "watcha" },
  { icon: Tving, name: "tving" },
  { icon: Diesney, name: "disneyplus" },
  { icon: Coupang, name: "coupangplay" },
  { icon: Wavve, name: "wavve" },
];

function RegistMovieSection() {
  const [movieSearch, setMovieSearch] = useState<string>("");
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false); // 입력창 포커스(활성화 도중에만 자동완성 검색 결과 보이기)

  const [movieInfo, setMovieInfo] = useState<DetailMovie | null>(null);
  const [activeOttBtn, setActiveOttBtn] = useState<Record<string, boolean>>({
    netflix: false,
    watcha: false,
    tving: false,
    disneyplus: false,
    coupangplay: false,
    wavve: false,
  });

  // lodash debounce 함수 정의 -> debounce: 짧은 시간 간격으로 발생하는 이벤트를 바로 호출하는 것이 아닌 마지막 이벤트 핸들러만 호출
  const handleSearch = debounce((value) => setMovieSearch(value), 300);

  // 검색어 Input Change Event Handler
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    handleSearch(value);
  };

  const fetchAllPages = async () => {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          query: movieSearch,
          language: "ko-KR",
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    );

    return data.results || [];
  };

  const detailMovieInfo = async (movieId: string) => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        params: {
          append_to_response: "credits",
          language: "ko-KR",
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    );

    console.log(data);

    setMovieInfo(data);
  };

  // React Query v5의 useQuery 사용
  const {
    data: result = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movies", movieSearch],
    queryFn: fetchAllPages,
    enabled: !!movieSearch,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 캐시 유지 (옵션)
  });

  return (
    <>
      {/* 영화 등록 Form */}
      <form
        onSubmit={(event: React.FormEvent<Element>) => event.preventDefault()}
        css={styles.registerForm()}
      >
        <div css={styles.registerContainer()}>
          {/* 영화 검색 Input */}
          <div css={styles.registerSearch()}>
            <div className="search">
              <input
                type="text"
                placeholder="등록할 영화 제목 입력"
                onChange={handleChange}
                onFocus={() => setIsInputFocus(true)}
                onBlur={() => setIsInputFocus(false)}
              />
              <button>
                <Search width="18px" height="18px" />
              </button>
            </div>

            {/* 자동완성 */}
            {isInputFocus && movieSearch !== "" && (
              <ul css={styles.movieAutoCompleteContainer(result.length > 0)}>
                {isLoading && <li className="loading">Loading</li>}
                {isError && <li className="error">Error</li>}
                {result.length > 0 &&
                  result.slice(0, 5).map((element: Movie) => (
                    <li
                      key={element.id}
                      className="list-item"
                      onMouseDown={() => detailMovieInfo(element.id)}
                    >
                      <div>
                        <div className="poster">
                          <img
                            src={`https://image.tmdb.org/t/p/original/${element.backdrop_path}`}
                          />
                        </div>

                        <div className="title">
                          <h3>{element.title}</h3>

                          <div>
                            <span>{element.original_title}</span>
                            <span>{element.release_date}</span>
                          </div>
                        </div>
                      </div>

                      <AddCircle width="24px" height="24px" />
                    </li>
                  ))}
              </ul>
            )}
          </div>

          {/* 영화 등록 Button */}
          <button css={styles.registerButton()}>등록하기</button>
        </div>

        <div css={styles.movieDetailContainer()}>
          {!movieInfo ? (
            <div className="no-detail-movie-info">
              <Logo />
              <h3>검색창에 영화 제목 검색 후 리스트 중 하나를 선택해주세요</h3>
            </div>
          ) : (
            <div css={styles.movieDetailInfoContainer()}>
              {/* Movie Detail Info */}
              <div className="movie-detail-info">
                <div css={styles.movieDetailTop()}>
                  <div className="detail">
                    {/* Title, Genres, Release */}
                    <div className="info">
                      <h3>제목</h3>
                      <span>
                        {movieInfo.title}({movieInfo.original_title})
                      </span>
                    </div>

                    <div className="info">
                      <h3>장르</h3>
                      <span>
                        {movieInfo.genres.map((genre) => genre.name).join(", ")}
                      </span>
                    </div>

                    <div className="info">
                      <h3>출시년도</h3>
                      <span>{movieInfo.release_date}</span>
                    </div>
                  </div>

                  {/* Movie Poster */}
                  <div className="movie-poster">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movieInfo.poster_path}`}
                      alt={movieInfo.original_title}
                    />
                  </div>
                </div>

                <div className="desciprtion">
                  <h3>소개</h3>
                  <p>{movieInfo.overview}</p>
                </div>

                {/* Actress - Swiper */}

                {/* OST or Behind Id Input */}
                <div css={styles.inputContainer()}>
                  <div className="input">
                    <label htmlFor="ost">OST</label>
                    <div>
                      <input
                        type="text"
                        id="ost"
                        placeholder="영화의 OST를 Youtube 재생목록 List Param 값을 작성해주세요."
                      />
                      <span>
                        * Youtube 재생목록의 List Param 값을 기입해주세요.
                      </span>
                    </div>
                  </div>

                  <div className="input">
                    <label htmlFor="behind">비하인드</label>
                    <div>
                      <input
                        type="text"
                        id="behind"
                        placeholder="영화의 비하인드 Youtube 재생목록 List Param 값을 작성해주세요."
                      />
                      <span>
                        * Youtube 재생목록의 List Param 값을 기입해주세요.
                      </span>
                    </div>
                  </div>
                </div>

                {/* OTT Select */}
                <div className="select-box">
                  {ottDummyData.map((data) => {
                    return (
                      <div
                        className="icon-btn"
                        onClick={() =>
                          setActiveOttBtn((prev) => ({
                            ...prev,
                            [data.name]: !activeOttBtn[data.name],
                          }))
                        }
                        // style={data.name === "coupangplay" && {}}
                      >
                        {activeOttBtn[data.name] && (
                          <div className="selected">
                            <Check />
                          </div>
                        )}
                        {React.createElement(data.icon)}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default RegistMovieSection;

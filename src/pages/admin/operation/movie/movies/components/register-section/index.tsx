import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import axios from "axios";

import styles from "./index.styles";

import Search from "@assets/icons/search.svg?react";
import AddCircle from "@assets/icons/add_circle.svg?react";

function RegistMovieSection() {
  const [movieSearch, setMovieSearch] = useState<string>("");
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false); // 입력창 포커스(활성화 도중에만 자동완성 검색 결과 보이기)

  const [movieInfo, setMovieInfo] = useState(null);

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
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODVjNDVjNDhlY2UwNjRjN2E1N2IwY2Y2MDIxODJlMyIsIm5iZiI6MTczMjcyNzc0NS44ODc2NTg0LCJzdWIiOiI2MjkwODI1MWVkMmFjMjE2YmEwZjgzYmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1Um7O-fb4El7iw5furGtKxyR2hMSY0AdPdEb2ke8Cyg",
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
          language: "ko-KR",
        },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODVjNDVjNDhlY2UwNjRjN2E1N2IwY2Y2MDIxODJlMyIsIm5iZiI6MTczMjcyNzc0NS44ODc2NTg0LCJzdWIiOiI2MjkwODI1MWVkMmFjMjE2YmEwZjgzYmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1Um7O-fb4El7iw5furGtKxyR2hMSY0AdPdEb2ke8Cyg",
        },
      }
    );

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
        css={styles.registerContainer()}
      >
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
                result.slice(0, 5).map((element) => (
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
      </form>

      {/* 영화 등록 Form */}
      <form
        onSubmit={(event: React.FormEvent<Element>) => event.preventDefault()}
        css={styles.registerContainer()}
      ></form>
    </>
  );
}

export default RegistMovieSection;

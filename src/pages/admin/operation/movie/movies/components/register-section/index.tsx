import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import axios from "axios";

import styles from "./index.styles";

import Search from "@assets/icons/search.svg?react";

// 영화 데이터 타입 정의
interface Movie {
  id: number;
  title: string;
  [key: string]: unknown;
}

// TMDb API 호출 함수
async function fetchMovies(search: string, page: unknown): Promise<Movie[]> {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: search,
        language: "ko-KR",
        page: page,
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODVjNDVjNDhlY2UwNjRjN2E1N2IwY2Y2MDIxODJlMyIsIm5iZiI6MTczMjcyNzc0NS44ODc2NTg0LCJzdWIiOiI2MjkwODI1MWVkMmFjMjE2YmEwZjgzYmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1Um7O-fb4El7iw5furGtKxyR2hMSY0AdPdEb2ke8Cyg",
      },
    }
  );

  console.log(data);

  // console.log(
  //   data.results.filter((item) => {
  //     console.log(item.title.startWith(search));
  //   })
  // );

  return data || []; // 오타 수정: `resultes` -> `results`
}

function RegistMovieSection() {
  const [movieSearch, setMovieSearch] = useState<string>("");
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false); // 입력창 포커스(활성화 도중에만 자동완성 검색 결과 보이기)

  const {
    data: moviePages,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<
    { result: Movie[]; page: number; total_pages: number }, // API 반환 데이터 타입
    Error, // 에러 타입
    { result: Movie[]; page: number; total_pages: number }, // QueryFn 반환 데이터 타입
    number // pageParam의 타입
  >({
    queryKey: ["movies", movieSearch] as const, // queryKey를 읽기 전용으로 설정
    queryFn: ({ pageParam = 1 }) => fetchMovies(movieSearch, pageParam), // queryFn
    enabled: movieSearch.trim() !== "", // 검색어가 있을 때만 요청
    staleTime: 300000, // 5분 동안 캐싱 데이터 유지
    gcTime: 900000, // 15분 동안 캐싱 데이터 유지
    initialPageParam: 1, // 초기 페이지 번호
    getNextPageParam: (lastPage) => {
      // 다음 페이지 계산
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1; // 다음 페이지 번호 반환
      }
      return undefined; // 마지막 페이지면 undefined 반환
    },
  });

  // lodash debounce 함수 정의 -> debounce: 짧은 시간 간격으로 발생하는 이벤트를 바로 호출하는 것이 아닌 마지막 이벤트 핸들러만 호출
  const handleSearch = debounce((value) => setMovieSearch(value), 300);

  // 검색어 Input Change Event Handler
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIsInputFocus(true);
    handleSearch(value);
  };

  // 모든 페이지 데이터를 병합한 후 검색어로 필터링
  const filteredMovies = useMemo(() => {
    const allMovies = moviePages?.pages.flatMap((page) => page.results) || []; // 모든 페이지 데이터 병합
    return allMovies
      .filter((movie: Movie) =>
        movie.title.toLowerCase().startsWith(movieSearch.toLowerCase())
      ) // 검색어 접두사 필터링
      .slice(0, 5); // 최대 5개 결과만 표시
  }, [moviePages, movieSearch]);

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

          <ul css={styles.movieAutoCompleteContainer()}>
            {isLoading && <li className="list-item loading">Loading</li>}
            {isError && <li className="list-item error">Error</li>}
            {filteredMovies.length > 0 && <li className="list-item">as</li>}
          </ul>
        </div>

        {/* 영화 등록 Button */}
        <button css={styles.registerButton()}>등록하기</button>
      </form>
    </>
  );
}

export default RegistMovieSection;

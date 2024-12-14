import apiClient from "@api";
import axios from "axios";

// 영화 등록 POST API
export async function fetchMovieCreate(
  movieInfo: Record<string, boolean>,
  trailer: string,
  ost: string,
  behind: string[],
  streaming: Record<string, boolean>
) {
  console.log({
    addMovieReq: {
      movie_info: movieInfo,
      trailer,
      ost,
      movie_behind_videos: [behind],
      streaming_platform: streaming,
    },
  });

  const { data } = await apiClient.post("/movie", {
    addMovieReq: JSON.stringify({
      movie_info: movieInfo,
      trailer,
      ost,
      movie_behind_videos: [behind],
      streaming_platform: streaming,
    }),
  });

  return data;
}

// Top 10 Movie 조회 GET API
export async function fetchTopMovie() {
  const { data } = await apiClient.get("/movie/top10");
  return data;
}

// 사용자 추천 영화 조회 GET API
export async function fetchRecommendMovie() {
  const { data } = await apiClient.get("/movie/recommend");
  return data;
}

// 장르별 영화 조회 GET API
export async function fetchGenreMovie(
  genreId: number,
  lastMovieId: number,
  lastLikeCount: number
) {
  const params = new URLSearchParams({ genreId: genreId.toString() });

  if (lastMovieId && lastLikeCount) {
    params.append("lastMovieId", lastMovieId.toString());
    params.append("lastLikeCount", lastLikeCount.toString());
  }

  const { data } = await apiClient.get(`/movie/genre?${params.toString()}`);
  return data;
}

// 영화 상세 조회 GET API
export async function fetchMovieDetail(movieId: number) {
  const { data } = await apiClient.get(`/movie/${movieId}`);
  return data;
}

// TMDB 영화 조회 GET API
export async function fetchSearchMovie(movieSearch: string) {
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

  return data.results;
}

// TMDB 영화 상세 조회 GET API
export async function fetchMovieDetailInfo(movieId: number) {
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

  return data;
}

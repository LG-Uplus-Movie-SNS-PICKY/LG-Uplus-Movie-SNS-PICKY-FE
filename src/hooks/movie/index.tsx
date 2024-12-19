import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchTopMovie,
  fetchRecommendMovie,
  fetchGenreMovie,
  fetchMovieDetail,
  fetchSearchMovie,
  fetchMovieDetailInfo,
  fetchLikedMovies,
} from "@api/movie";

// Top 10 Movie 조회 React Query - Custom Hook
export const useTopMovieQuery = () => {
  return useQuery({
    queryKey: ["topMovie"], // 식별자(Identifier) 구성
    queryFn: fetchTopMovie, // API 요청 함수 할당
    staleTime: 1000 * 60 * 10, // 데이터 신선도 유지 -> 시간이 다 되면 새로운 데이터 요청
    gcTime: 1000 * 60 * 30, // 데이터 캐싱 시간
  });
};

// 사용자 추천 Movie 조회 React Query - Custom Hook
export const useRecommnedMovieQuery = () => {
  return useQuery({
    queryKey: ["recommnedMovie"],
    queryFn: fetchRecommendMovie,
    staleTime: 1000 * 60 * 90, // 추천 데이터 목록은 1:30분간 신선도 유지
    gcTime: 1000 * 60 * 60 * 2, // 추천 데이터 데이터 캐싱 시간은 2시간으로 유지
  });
};

// 장르별 영화 조회 React Query - Custom Hook
export const useGenreMovieQuery = (genreId: number) => {
  return useInfiniteQuery({
    queryKey: ["genreMovie", genreId],
    queryFn: ({ pageParam }) =>
      fetchGenreMovie(genreId, pageParam.lastMovidId, pageParam.createdAt),

    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.last) {
        return {
          lastMovidId:
            lastPage?.data?.content[lastPage?.data?.content.length - 1].movieId,
          createdAt:
            lastPage?.data?.content[lastPage?.data?.content.length - 1]
              .createdAt,
        };
      }

      return undefined;
    },

    initialPageParam: { lastMovidId: 0, createdAt: "" },
    enabled: !!genreId,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};

// 영화 상세 조회 React Query - Custom Hook
export const useMovieDetailQuery = (movieId: number) => {
  return useQuery({
    queryKey: ["movieDetail", movieId],
    queryFn: () => fetchMovieDetail(movieId),
    staleTime: 1000 * 60 * 30, // 추천 데이터 목록은 30분간 신선도 유지
    gcTime: 1000 * 60 * 60, // 추천 데이터 데이터 캐싱 시간은 1시간으로 유지
  });
};

// TMDB 영화 조회 React Query - Custom Hook
export const useSearchMovie = (movieSearch: string) => {
  return useQuery({
    queryKey: ["movies", movieSearch],
    queryFn: () => fetchSearchMovie(movieSearch),
    enabled: !!movieSearch,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 캐시 유지 (옵션)
  });
};

// TMDB 영화 상세 데이터 React Query - Custom Hook
export const useDetailMovieInfo = (movieId: number) => {
  return useQuery({
    queryKey: ["movieDetailInfo", movieId],
    queryFn: () => fetchMovieDetailInfo(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};

// 사용자가 좋아요 누른 영화 조회 React Query - Custom Hook
export const useUserLikedMovies = (nickname: string) => {
  return useInfiniteQuery({
    queryKey: ["likedMovies", nickname],
    queryFn: ({ pageParam }) =>
      fetchLikedMovies(nickname, pageParam.lastMovieLikeId),

    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.last) {
        return {
          lastMovieLikeId:
            lastPage?.data?.content[lastPage?.data?.content.length - 1]
              .movieLikeId,
        };
      }

      return undefined;
    },

    initialPageParam: { lastMovieLikeId: 0 },

    enabled: !!nickname,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};

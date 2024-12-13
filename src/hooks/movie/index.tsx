import { useQuery } from "@tanstack/react-query";
import {
  fetchTopMovie,
  fetchRecommendMovie,
  fetchGenreMovie,
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
    staleTime: 1000 * 60 * 30, // 추천 데이터 목록은 30분간 신선도 유지
    gcTime: 1000 * 60 * 60, // 추천 데이터 데이터 캐싱 시간은 1시간으로 유지
  });
};

// 장르별 영화 조회 React Query - Custom Hook
export const useGenreMovieQuery = (genreId: number) => {
  return useQuery({
    queryKey: ["genreMovie", genreId],
    queryFn: () => fetchGenreMovie(genreId),
    enabled: !!genreId,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};

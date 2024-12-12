import { useQuery } from "@tanstack/react-query";
import { fetchTopMovie } from "@api/movie";

// Top 10 Movie 조회 React Query - Custom Hook
export const useTopMovieQuery = () => {
  return useQuery({
    queryKey: ["topMovie"], // 식별자(Identifier) 구성
    queryFn: fetchTopMovie, // API 요청 함수 할당
    staleTime: 1000 * 60 * 10, // 데이터 신선도 유지 -> 시간이 다 되면 새로운 데이터 요청
    gcTime: 1000 * 60 * 30, // 데이터 캐싱 시간
  });
};

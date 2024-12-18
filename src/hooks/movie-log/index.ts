import { fetchAllData, fetchMovieLogsById } from "@api/movie";
import { useInfiniteQuery } from "@tanstack/react-query";

// React Query를 이용한 무비로그 데이터 갱신
export const useFetchAllMovieLogQuery = () => {
  return useInfiniteQuery({
    queryKey: ["movie-log"],
    queryFn: ({ pageParam }) => fetchAllData(pageParam.lastBoardId),

    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.last) {
        return {
          lastBoardId:
            lastPage?.data?.content[lastPage?.data?.content.length - 1].boardId,
        };
      }

      return undefined;
    },

    initialPageParam: { lastBoardId: 0 },
    staleTime: 1000 * 60 * 10, // 신선도 -> 현재 캐싱된 데이터가 새로운 데이터인지를 의미
    gcTime: 1000 * 60 * 60, // 데이터 캐싱 시간
  });
};

export const useFetchMovieLogByIdQuery = (movieId: number) => {
  return useInfiniteQuery({
    queryKey: ["movie-log", movieId],
    queryFn: ({ pageParam }) =>
      fetchMovieLogsById(movieId, pageParam?.lastBoardId),

    getNextPageParam: (lastPage) => {
      console.log(lastPage);

      if (!lastPage?.data?.last) {
        return {
          lastBoardId:
            lastPage?.data?.content[lastPage?.data?.content.length - 1]
              ?.boardId,
        };
      }
      return undefined;
    },

    initialPageParam: { lastBoardId: 0 },
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });
};

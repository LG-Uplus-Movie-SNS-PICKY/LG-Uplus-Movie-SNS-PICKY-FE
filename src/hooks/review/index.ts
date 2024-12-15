import { fetchLineReviewMovie } from "@api/linereview";
import { useInfiniteQuery } from "@tanstack/react-query";

// 특정 영화 한줄평 조회 React Query - Custom Hook
export const useLineReviewMovieQuery = (movieId: number) => {
  return useInfiniteQuery({
    queryKey: ["lineReview", movieId],
    queryFn: ({ pageParam }) =>
      fetchLineReviewMovie(
        movieId,
        pageParam.lastReviewId,
        pageParam.lastCreatedAt
      ),

    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.last) {
        return {
          lastReviewId:
            lastPage?.data?.content[lastPage?.data?.content.length - 1].id,
          lastCreatedAt:
            lastPage?.data?.content[lastPage?.data?.content.length - 1].createdAt,
        };
      }

      return undefined;
    },

    initialPageParam: { lastReviewId: 0, lastCreatedAt: "" },
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};

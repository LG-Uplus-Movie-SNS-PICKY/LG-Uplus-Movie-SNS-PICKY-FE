import { fetchLineReviewMovie, fetchLineReviewsByUser } from "@api/linereview";
import { useInfiniteQuery } from "@tanstack/react-query";

// 특정 영화 한줄평 조회 React Query - Custom Hook
export const useLineReviewMovieQuery = (movieId: number, sortType: string) => {
  return useInfiniteQuery({
    queryKey: ["lineReview", movieId, sortType],
    queryFn: ({ pageParam }) => {
      return fetchLineReviewMovie(
        movieId,
        pageParam.lastReviewId,
        pageParam.lastCreatedAt,
        sortType
      );
    },

    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.last) {
        const lastContent =
          lastPage?.data?.content[lastPage?.data?.content.length - 1];
        const nextPageParam = {
          lastReviewId: lastContent?.id,
          lastCreatedAt: lastContent?.createdAt,
        };
        return nextPageParam;
      }
      return undefined;
    },

    initialPageParam: { lastReviewId: 0, lastCreatedAt: "" },
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });
};

// 특정 사용자가 작성한 한줄평 조회 React Query - Custom Hook
export const useLineReviewsByUserQuery = (nickname: string) => {
  return useInfiniteQuery({
    queryKey: ["lineReview", nickname],
    queryFn: ({ pageParam }) => {
      return fetchLineReviewsByUser(nickname, pageParam.lastReviewId);
    },

    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.last) {
        return {
          lastReviewId:
            lastPage?.data?.content[lastPage?.data?.content.length - 1].id,
        };
      }
      return undefined;
    },

    initialPageParam: { lastReviewId: 0 },
    enabled: !!nickname,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};

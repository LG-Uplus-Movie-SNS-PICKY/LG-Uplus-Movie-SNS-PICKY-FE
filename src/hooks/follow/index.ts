import { fetchFollowersList, fetchFollowingsList } from "@api/user";
import { useInfiniteQuery } from "@tanstack/react-query";

// 팔로워 정보 목록을 가져오는 React Query - Custom Hook
export const useFetchFollowersListQuery = (nickname: string) => {
  return useInfiniteQuery({
    queryKey: ["followers", nickname],
    queryFn: ({ pageParam }) =>
      fetchFollowersList(nickname, pageParam.lastFollowerId),
    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.last) {
        return {
          lastFollowerId:
            lastPage?.data?.content[lastPage?.data?.content.length - 1].userId,
        };
      }

      return undefined;
    },
    initialPageParam: { lastFollowerId: 0 },
    enabled: !!nickname,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};

// 팔로잉 정보 목록을 가져오는 React Query - Custom Hook
export const useFetchFollowingsListQuery = (nickname: string) => {
  return useInfiniteQuery({
    queryKey: ["following", nickname],
    queryFn: ({ pageParam }) =>
      fetchFollowingsList(nickname, pageParam.lastFollowerId),
    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.last) {
        return {
          lastFollowerId:
            lastPage?.data?.content[lastPage?.data?.content.length - 1].userId,
        };
      }

      return undefined;
    },
    initialPageParam: { lastFollowerId: 0 },
    enabled: !!nickname,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};

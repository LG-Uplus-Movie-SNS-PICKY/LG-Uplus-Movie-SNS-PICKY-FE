import { fetchCreatePlaylist, fetchPlaylists } from "@api/playlist";
import { useInfiniteQuery } from "@tanstack/react-query";

// 플레이리스트 조회 React Query - Custom Hook
export const usePlaylist = () => {
  return useInfiniteQuery({
    queryKey: ["playlist"],
    queryFn: ({ pageParam }) => fetchPlaylists(pageParam),

    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.last) {
        return lastPage?.data?.content[lastPage?.data?.content.length - 1]
          .playlistId;
      }

      return undefined;
    },

    initialPageParam: 0,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};

// 플레이리스트 추가를 위한 영화 조회 React Query - Custom Hook

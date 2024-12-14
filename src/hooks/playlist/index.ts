import { fetchPlaylists } from "@api/playlist";
import { useInfiniteQuery } from "@tanstack/react-query";

// 플레이리스트 조회 React Query - Custom Hook
export const usePlaylist = () => {
  return useInfiniteQuery({
    queryKey: ["playlist"],
    queryFn: ({ pageParam }) => fetchPlaylists(pageParam.lastPlaylistId),

    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.last) {
        console.log(
          lastPage?.data?.content[lastPage?.data?.content.length - 1].playlistId
        );

        return {
          lastPlaylistId:
            lastPage?.data?.content[lastPage?.data?.content.length - 1]
              .playlistId,
        };
      }

      return undefined;
    },

    initialPageParam: { lastPlaylistId: 0 },
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
};

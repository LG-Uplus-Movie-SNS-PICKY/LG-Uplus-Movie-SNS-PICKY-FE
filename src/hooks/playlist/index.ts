import { fetchPlaylists } from "@api/playlist";
import { useInfiniteQuery } from "@tanstack/react-query";

// 장르별 영화 조회 React Query - Custom Hook
export const useGenreMovieQuery = () => {
  return useInfiniteQuery({
    queryKey: ["playlist"],
    queryFn: ({ pageParam }) => fetchPlaylists(pageParam.lastPlaylistId),

    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.last) {
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

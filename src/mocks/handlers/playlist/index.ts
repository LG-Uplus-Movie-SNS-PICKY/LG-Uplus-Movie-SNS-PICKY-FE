import { http, HttpHandler, HttpResponse } from "msw";

import movies from "@constants/json/movie/movie.json";
import movieLikes from "@constants/json/movie/movieLikes.json";
import playlists from "@constants/json/playlist/playlists.json";
import playlistMovies from "@constants/json/playlist/playlistMovies.json";

// Movie - Playlist 관련 모킹 API(Mocking Object) 설계
const playlistHandler: HttpHandler[] = [
  // 플레이리스트 조회 API(Mocking Object)
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/playlist/all`,
    ({ request }) => {
      const url = new URL(request.url); // URL 생성

      // 무한 스크롤을 위한 페이지 번호와 리미트 수
      const size = Number(url.searchParams.get("size")) || 3;
      const lastPlaylistId =
        Number(url.searchParams.get("last-playlist-id")) || 0;

      let filterPlaylists = playlists.map((playlist) => {
        const playlistMovie = playlistMovies
          .filter(
            (movie) => movie.movie_playlist_id === playlist.movie_playlist_id
          )
          .map((movie) => {
            const movieInfos = movies.find(
              (movieInfo) => movieInfo.movie_id === movie.movie_id
            );

            return {
              movieId: movieInfos?.movie_id,
              title: movieInfos?.movie_title,
              likes: movieLikes.filter(
                (like) => like.movie_id === movieInfos?.movie_id
              ).length,
              totalRating: movieInfos?.movie_total_rating,
              posterUrl: movieInfos?.movie_poster_url,
              backdropUrl: movieInfos?.movie_backdrop_url,
            };
          });

        return {
          playlistId: playlist.movie_playlist_id,
          title: playlist.movie_playlist_title,
          getSimpleMovieResps: playlistMovie,
        };
      });

      // 커서 기반 필터링
      // lastBoardId보다 높은 게시물만 필터링
      if (lastPlaylistId) {
        filterPlaylists = filterPlaylists.filter(
          (playlist) => playlist.playlistId > lastPlaylistId
        );
      }

      const paginatedPlaylists = filterPlaylists.slice(0, size);

      return HttpResponse.json(
        {
          code: 200,
          data: {
            size: size,
            content: paginatedPlaylists,
            empty: paginatedPlaylists.length === 0,
            first: !lastPlaylistId,
            last: paginatedPlaylists.length < size,
            number: 0,
            numberOfElements: paginatedPlaylists.length,
            pageable: {
              offset: 0,
              pageNumber: 0,
              pageSize: 10,
              paged: true,
              sort: {
                empty: true,
                sorted: false,
                unsorted: true,
              },
              unpaged: false,
            },
            sort: {
              empty: true,
              sorted: false,
              unsorted: true,
            },
          },
          message: "요청이 성공적으로 처리되었습니다.",
          sucess: true,
        },
        { status: 200, statusText: "Playlist Data" }
      );
    }
  ),
];

export default playlistHandler;

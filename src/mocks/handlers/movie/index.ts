import { first, isEmpty, size } from "lodash";
import { http, HttpHandler, HttpResponse } from "msw";

import movies from "@constants/json/movie/movie.json";
import movieAndGenres from "@constants/json/genres/movieAndGenre.json";
import movieCrews from "@constants/json/movie/movieCrew.json";
import filmCrew from "@constants/json/movie/filmCrew.json";
import movieBehindVideos from "@constants/json/movie/movieBehindVideos.json";
import platform from "@constants/json/movie/platform.json";
import platforms from "@constants/json/movie/platforms.json";
import movieLikes from "@constants/json/movie/movieLikes.json";
import genres from "@constants/json/genres/genres.json";

import user from "@constants/json/user.json";
import genrePreferences from "@constants/json/user/genrePreferences.json";
import { getCookie } from "@util/cookie";

type TrailerType = string;
type OstType = string;
type MovieBehindVideosType = string;

interface CastTypes {
  [key: string]: unknown;
  id: number;
  character: string;
  original_name: string;
  profile_path: string;
}
interface CrewsTypes {
  [key: string]: unknown;
  id: number;
  original_name: string;
  profile_path: string;
  job: string;
}

interface CreditsTypes {
  cast: CastTypes[];
  crew: CrewsTypes[];
  directingCrew: CrewsTypes[];
}

interface GenresTypes {
  id: number;
}

interface MovieInfoTypes {
  [key: string]: unknown;
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  poster_path: string;
  overview: string;
  runtime: number;
  genres: GenresTypes[];
  credits: CreditsTypes;
  backdrop_path: string;
}

interface PlatformTypes {
  off: boolean;
}

interface BodyType {
  movie_info: MovieInfoTypes;
  trailer: TrailerType;
  ost: OstType;
  movie_behind_videos: MovieBehindVideosType;
  streaming_platform: Array<PlatformTypes>;
}

function calculateTotalRating(likes: number) {
  const maxValue = user.length; // 기준값
  const minRating = 1.0;
  const maxRating = 5.0;

  // total rating 계산
  const totalRating = minRating + (likes / maxValue) * (maxRating - minRating);

  // total rating 값이 최대값 5.0을 넘지 않도록 제한
  return Number(Math.min(totalRating, maxRating).toFixed(1));
}

const movieHandlers: HttpHandler[] = [
  // 영화 등록 API(Mocking Object)
  http.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie`,
    async ({ request }) => {
      const authorization = request.headers.get("Authorization");
      const userInfo = getCookie("user") || {};

      // 권환이 없을 경우 403 에러 발생
      if (!authorization || isEmpty(userInfo) || !userInfo.isAuthUser) {
        return HttpResponse.json(
          {
            message:
              "권한이 없습니다. Request Headers에 Authorization를 추가 (임시로 아무값이나 넣어도 무관) 또는 로그인을 하셨는지 또는 어드민 계정인지 확인해주세요.",
          },
          { status: 403 }
        );
      }

      const {
        movie_info,
        ost,
        trailer,
        movie_behind_videos,
        streaming_platform,
      } = (await request.json()) as BodyType;

      // 영화 추가
      movies.push({
        movie_id: movie_info.id,
        movie_title: movie_info.title,
        movie_original_title: movie_info.original_title,
        movie_release_data: movie_info.release_date,
        movie_poster_url: movie_info.poster_path,
        movie_backdrop_url: movie_info.backdrop_path,
        movie_total_rating: 0,
        movie_plot: movie_info.overview,
        movie_running_time: movie_info.runtime,
        movie_trailer_url: trailer,
        movie_ost_url: ost,
        is_deleted: false,
      });

      // 해당 영화 장르 추가
      movie_info.genres.forEach((genre) => {
        movieAndGenres.push({ genre_id: genre.id, movie_id: movie_info.id });
      });

      // 해당 영화 비하인드 추가
      movieBehindVideos.push({
        movie_behind_video_id: movieBehindVideos.length + 1,
        movie_behind_video_url: movie_behind_videos[0],
        movie_id: movie_info.id,
      });

      // 해당 영화 OTT 서비스 추가
      for (let key in streaming_platform) {
        if (streaming_platform[key]) {
          const platformInfo = platform.find(
            (platform) => platform.platform_name === key
          );

          if (!isEmpty(platformInfo)) {
            platforms.push({
              movie_id: movie_info.id,
              platform_id: platformInfo?.platform_id,
              platform_name: key.toUpperCase(),
              platform_url: platformInfo?.platform_url,
            });
          }
        }
      }

      // 해당 영화 배우 추가
      if (movie_info.credits.cast.length) {
        movie_info.credits.cast.forEach((credit) => {
          // 중복된 영화배우가 있는지 확인
          const actor = filmCrew.find(
            (crew) => crew.film_crew_id === credit.id
          );

          // 중복된 영화배우가 없을 경우 해당 배우 추가
          if (isEmpty(actor)) {
            filmCrew.push({
              film_crew_id: credit.id,
              film_crew_name: credit.original_name,
              film_crew_profile_url: credit.profile_path,
            });
          }

          movieCrews.push({
            movie_id: movie_info.id,
            film_crew_id: credit.id,
            movie_crew_position: "Actor",
            movie_crew_role: credit.character,
          });
        });
      }

      // 해당 영화 제작 디자인 추가
      if (movie_info.credits.crew.length) {
        movie_info.credits.crew.forEach((credit) => {
          // 중복된 제작 디자인이 있는지 확인
          const crew = filmCrew.find((crew) => crew.film_crew_id === credit.id);

          // 중복된 제작 디자인이 없을 경우 해당 제작 디자인 추가
          if (isEmpty(crew)) {
            filmCrew.push({
              film_crew_id: credit.id,
              film_crew_name: credit.original_name,
              film_crew_profile_url: credit.profile_path,
            });
          }

          movieCrews.push({
            movie_id: movie_info.id,
            film_crew_id: credit.id,
            movie_crew_position: "Crew",
            movie_crew_role: credit.job,
          });
        });
      }

      // 해당 영화 제작진 추가
      if (movie_info.credits?.directingCrew) {
        movie_info.credits.directingCrew.forEach((credit) => {
          // 중복된 제작진이 있는지 확인
          const crew = filmCrew.find((crew) => crew.film_crew_id === credit.id);

          // 중복된 제작진이 없을 경우 해당 제작진 추가
          if (isEmpty(crew)) {
            filmCrew.push({
              film_crew_id: credit.id,
              film_crew_name: credit.original_name,
              film_crew_profile_url: credit.profile_path,
            });
          }

          movieCrews.push({
            movie_id: movie_info.id,
            film_crew_id: credit.id,
            movie_crew_position: "Director",
            movie_crew_role: credit.job,
          });
        });
      }

      return HttpResponse.json(
        { message: "REQUEST_FRONT_SUCCESS" },
        { status: 200 }
      );
    }
  ),

  // 영화 좋아요 API(Mocking Object)
  http.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/:movieId/like`,
    ({ params, request }) => {
      const authorization = request.headers.get("Authorization");
      const { movieId } = params;
      const userInfo = getCookie("user") || {};

      // 권환이 없을 경우 403 에러 발생
      if (!authorization || isEmpty(userInfo) || !movieId) {
        return HttpResponse.json(
          {
            message:
              "권한이 없습니다. Request Headers에 Authorization를 추가 (임시로 아무값이나 넣어도 무관) 또는 로그인을 하셨는지 또는 Movie Id를 넘겨주는지 확인해주세요.",
          },
          { status: 403 }
        );
      }

      const movieLikeInfo = movieLikes.find(
        (like) =>
          like.movie_id === Number(movieId) &&
          like.user_id === userInfo.localJwtDto.accessToken
      );

      // 사용자가 해당 영화를 좋아요를 누르지 않은 경우
      if (isEmpty(movieLikeInfo)) {
        // 권환이 있을 경우 좋아요를 개수를 카운팅 시킨다.
        movieLikes.push({
          movie_like_id: movieLikes.length + 1,
          user_id: userInfo.localJwtDto.accessToken,
          movie_id: Number(movieId),
        });

        return HttpResponse.json(
          { success: true, message: "좋아요 추가" },
          { status: 200 }
        );
      } else {
        // 사용자가 해당 영화를 좋아요를 누른 경우
        for (let i = 0; i < movieLikes.length; i++) {
          if (
            movieLikes[i].movie_id === Number(movieId) &&
            movieLikes[i].user_id === userInfo.localJwtDto.accessToken
          ) {
            movieLikes.splice(i, 1);
          }
        }

        return HttpResponse.json(
          { success: true, message: "좋아요 삭제" },
          { status: 200 }
        );
      }
    }
  ),

  // 영화 추천 리스트 API(Mocking Object)
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/recommend`,
    ({ request }) => {
      const authorization = request.headers.get("Authorization");
      const userInfo = getCookie("user") || {};

      // 권환이 없을 경우 403 에러 발생
      if (!authorization || isEmpty(userInfo)) {
        return HttpResponse.json(
          {
            message:
              "권한이 없습니다. Request Headers에 Authorization를 추가 (임시로 아무값이나 넣어도 무관) 또는 로그인을 하셨는지 확인해주세요.",
          },
          { status: 403 }
        );
      }

      // 해당 사용자가 등록한 장르 확인
      const preference = genrePreferences.filter(
        (preference) => preference.user_id === userInfo.localJwtDto.accessToken
      );

      const recommendMovies = movies
        .filter((movie) => {
          // 1. 현재 Movie의 장르를 파악한다.
          const genre = movieAndGenres.find(
            (genre) => genre.movie_id === movie.movie_id
          );

          // 2. 현재 Movie 장르와 사용자가 선호하는 장르와 일치한 데이터만 반환한다.
          const recommendMovie = preference.find(
            (preference) => preference.genre_id === genre?.genre_id
          );

          if (!isEmpty(recommendMovie)) {
            return movie;
          }
        })
        .slice(0, 30);

      return HttpResponse.json(
        {
          data: [
            ...recommendMovies.map((movie) => {
              const movieLike = movieLikes.filter(
                (like) => like.movie_id === movie.movie_id
              ).length;

              return {
                movieId: movie.movie_id,
                posterUrl: movie.movie_poster_url,
                title: movie.movie_title,
                totalRating: calculateTotalRating(movieLike),
                genres: movieAndGenres
                  .filter((genre) => genre.movie_id === movie.movie_id)
                  .map((filterGenre) => {
                    return genres.find(
                      (genre) => genre.genre_id === filterGenre.genre_id
                    );
                  }),
                platforms: platforms
                  .filter((platform) => platform.movie_id === movie.movie_id)
                  .map((platforms) => ({
                    platformId: platforms.platform_id,
                    platformName: platforms.platform_name,
                    platformUrl: platforms.platform_url,
                  })),
              };
            }),
          ],
        },
        { status: 200 }
      );
    }
  ),

  // 영화 Top 10 조회 API(Mocking Object)
  http.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/movie/top10`, ({}) => {
    const bestMovies = movies
      .map((movie) => {
        const movieLike = movieLikes.filter(
          (like) => like.movie_id === movie.movie_id
        ).length;

        return {
          movieId: movie.movie_id,
          title: movie.movie_title,
          likes: movieLike,
          posterUrl: movie.movie_poster_url,
          backdropUrl: movie.movie_backdrop_url,
          totalRating: calculateTotalRating(movieLike),
        };
      })
      .sort((a, b) => b.totalRating - a.totalRating)
      .slice(0, 10);

    return HttpResponse.json(
      {
        success: true,
        code: 200,
        message: "요청이 성공적으로 처리되었습니다.",
        data: [...bestMovies],
      },
      { status: 200 }
    );
  }),

  // 장르별 영화 조회 API(Mocking Object)
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/genre`,
    ({ request }) => {
      // const authorization = request.headers.get("Authorization");

      // // 권환이 없을 경우 403 에러 발생
      // if (!authorization) {
      //   return HttpResponse.json(
      //     {
      //       message:
      //         "권한이 없습니다. Request Headers에 Authorization를 추가 (임시로 아무값이나 넣어도 무관) 또는 로그인을 하셨는지 확인해주세요.",
      //     },
      //     { status: 403 }
      //   );
      // }

      const url = new URL(request.url);
      const genreId = Number(url.searchParams.get("genreId") || 0);

      // Query String으로 GenreId를 보내지 않은 경우
      if (!genreId) {
        return HttpResponse.json(
          {
            message:
              "필수 쿼리 파라미터인 genreId가 누락되었습니다. genreId를 추가하거나 요청을 확인하세요.",
            errorCode: "GENRE_ID_MISSING",
          },
          { status: 400, statusText: "Bad Request" }
        );
      }

      let filteredMovies = movies
        .filter((movie) => {
          // 1. 해당 영화의 장르 리스트를 확인 후 사용자가 선택한 장르와 같은지 확인한다.
          const genre = movieAndGenres
            .filter((genre) => genre.movie_id === movie.movie_id)
            .find((genre) => genre.genre_id === genreId);

          // 2. 현재 영화가 사용자가 선택한 장르일 경우 해당 영화를 반환한다.
          if (!isEmpty(genre)) {
            return movie;
          }
        })
        .map((movie) => {
          const movieLike = movieLikes.filter(
            (like) => like.movie_id === movie.movie_id
          ).length;

          return {
            movieId: movie.movie_id,
            title: movie.movie_title,
            likes: movieLike,
            posterUrl: movie.movie_poster_url,
            backdropUrl: movie.movie_backdrop_url,
            totalRating: calculateTotalRating(movieLike),
          };
        });

      const lastMovieId = Number(url.searchParams.get("lastMovieId")) || 0;
      const lastLikeCount = Number(url.searchParams.get("lastLikeCount")) || 0;

      // 커서 기반 필터링(lastLikeCount와 lastMovieId를 이용)
      if (lastLikeCount && lastMovieId) {
        filteredMovies = filteredMovies.filter((movie) => {
          if (movie.likes < lastLikeCount) {
            return true;
          } else if (movie.likes === lastLikeCount) {
            return movie.movieId < lastMovieId;
          }
          return false;
        });
      }

      // 필터링 된 영화 데이터를 좋아요 순으로 정렬 시킨다.
      filteredMovies.sort((a, b) => {
        // 좋아요 개수가 같을 경우 movieId 기준으로 내림차순
        if (a.likes === b.likes) {
          return b.movieId - a.movieId;
        }

        // 좋아요 개수가 다를 경우 좋아요 개수로 내림차순
        return b.likes - a.likes;
      });

      return HttpResponse.json(
        {
          code: 200,
          data: {
            size: 10,
            content: filteredMovies.slice(0, 10),
            sort: {
              empty: true,
              sorted: true,
              unsorted: true,
            },
            pageable: {
              offset: 0,
              sort: {
                empty: true,
                sorted: true,
                unsorted: true,
              },
              paged: true,
              pageNumber: 0,
              pageSize: 0,
              unpaged: true,
            },
            numberOfElements: filteredMovies.length,
            first: !lastLikeCount && !lastMovieId,
            last: filteredMovies.length < 10,
            empty: filteredMovies.length === 0,
          },
          message: "요청이 성공적으로 처리되었습니다.",
          success: true,
        },
        { status: 200 }
      );
    }
  ),

  // 영화 상세 정보 조회 API(Mocking Object)
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/:movieId`,
    ({ params, request }) => {
      const authorization = request.headers.get("Authorization");
      const { movieId } = params;

      const userInfo = getCookie("user") || {};

      // 권환이 없을 경우 403 에러 발생
      if (!authorization || !movieId || isEmpty(userInfo)) {
        return HttpResponse.json(
          {
            message:
              "권한이 없습니다. Request Headers에 Authorization를 추가 (임시로 아무값이나 넣어도 무관) 또는 Path Validation에 boardId를 추가했는지 또는 로그인을 하셨는지 확인해주세요.",
          },
          { status: 403 }
        );
      }

      // Path Validation으로 넘어온 값을 통해서 해당 영화 정보를 검색한다.
      const movieInfo = movies.find(
        (movie) => movie.movie_id === Number(movieId)
      );
      if (isEmpty(movieInfo)) {
        return HttpResponse.json(
          {
            message: "유효하지 않은 영화 ID 입니다.",
            errorCode: "ERR_INVALID_Movie_ID",
          },
          { status: 400, statusText: "Invalid Movie ID" }
        );
      }

      // response data 구성
      return HttpResponse.json(
        {
          code: 200,
          data: {
            // 영화 정보
            movie_info: {
              id: movieInfo.movie_id,
              original_title: movieInfo.movie_title,
              release_date: new Date(
                movieInfo.movie_release_data
              ).toISOString(),
              poster_path: movieInfo.movie_poster_url,
              overview: movieInfo.movie_plot,
              runtime: movieInfo.movie_running_time,
              // rating: movieInfo.movie_total_rating,

              // 장르 정보 필터링
              genres: [
                ...movieAndGenres
                  .filter((genre) => {
                    if (genre.movie_id === movieInfo.movie_id) {
                      return true;
                    }

                    return false;
                  })
                  .map((genre) => ({ id: genre.genre_id })),
              ],

              // 배우 or 제작진 필터링
              credits: {
                // 배우 정보
                cast: [
                  ...movieCrews
                    .filter(
                      (crew) =>
                        crew.movie_id === movieInfo.movie_id &&
                        crew.movie_crew_position === "Actor"
                    )
                    .map((crew) => {
                      const actorInfo = filmCrew.find(
                        (actor) => actor.film_crew_id === crew.film_crew_id
                      );

                      return {
                        id: actorInfo?.film_crew_id,
                        character: crew.movie_crew_role,
                        original_name: actorInfo?.film_crew_name,
                        profile_path: actorInfo?.film_crew_profile_url,
                      };
                    }),
                ],
                crew: [],
                // 감독 정보
                directingCrew: [
                  ...movieCrews
                    .filter(
                      (crew) =>
                        crew.movie_id === movieInfo.movie_id &&
                        crew.movie_crew_position === "Director"
                    )
                    .map((crew) => {
                      const directingCrewInfo = filmCrew.find(
                        (directing) =>
                          directing.film_crew_id === crew.film_crew_id
                      );

                      return {
                        id: directingCrewInfo?.film_crew_id,
                        job: crew.movie_crew_role,
                        original_name: directingCrewInfo?.film_crew_name,
                        profile_path: directingCrewInfo?.film_crew_profile_url,
                      };
                    }),
                ],
              },

              backdrop_path: movieInfo.movie_backdrop_url,
            },
            trailer: movieInfo.movie_trailer_url,
            ost: movieInfo.movie_ost_url,
            rating: movieInfo.movie_total_rating,
            movie_behind_videos: [
              movieBehindVideos.find(
                (video) => video.movie_id === movieInfo.movie_id
              )?.movie_behind_video_url,
            ],

            streaming_platform: platforms
              .filter((platform) => platform.movie_id === movieInfo.movie_id)
              .reduce(
                (prev, curr) => {
                  const key =
                    curr.platform_name.toLowerCase() as keyof typeof prev;

                  if (key in prev) {
                    prev[key] = true;
                  }

                  return prev;
                },
                {
                  coupang: false,
                  disney: false,
                  netflix: false,
                  tving: false,
                  watcha: false,
                  wave: false,
                }
              ),
            like: !isEmpty(
              movieLikes
                .filter((like) => like.movie_id === movieInfo.movie_id)
                .find(
                  (like) => like.user_id === userInfo.localJwtDto.accessToken
                )
            ),
          },
          message: "요청이 성공적으로 처리되었습니다.",
          success: true,
        },
        { status: 200 }
      );
    }
  ),

  // 영화 정보 수정 API(Mocking Object)
  // http.patch(
  //   `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/:movieId`,
  //   ({ params, request }) => {

  //   }
  // ),
];

export default movieHandlers;

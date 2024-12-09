import { http, HttpHandler, HttpResponse } from "msw";

const movieHandlers: HttpHandler[] = [
  // 영화 등록 API(Mocking Object)
  http.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie`,
    ({ request }) => {}
  ),

  // 영화 좋아요 API(Mocking Object)
  http.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/:movieId/like`,
    ({ params, request }) => {}
  ),

  // 영화 상세 정보 조회 API(Mocking Object)
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/:movieId`,
    ({ params, request }) => {}
  ),

  // 영화 정보 업데이트 API(Mocking Object)
  http.patch(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/:movieId`,
    ({ params, request }) => {}
  ),

  // 영화 Top 10 조회 API(Mocking Object)
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/top10`,
    ({ request }) => {}
  ),

  // 영화 추천 리스트 API(Mocking Object)
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/recommend`,
    ({ request }) => {}
  ),

  // 장르별 영화 조회 API(Mocking Object)
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/genre`,
    ({ request }) => {}
  ),
];

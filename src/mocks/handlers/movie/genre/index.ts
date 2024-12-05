import { http, HttpHandler, HttpResponse } from "msw";

// Movie 관련 모킹 API(Mocking Object) 설계
const movieHandelrs: HttpHandler[] = [
  // 장르의 종류를 가져오는 모킹 API
  http.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/genres`, () => {
    return HttpResponse.json([
      { genreId: 1, name: "액션" },
      { genreId: 2, name: "로맨스" },
      { genreId: 3, name: "뮤지컬" },
      { genreId: 4, name: "코미디" },
      { genreId: 5, name: "범죄" },
      { genreId: 6, name: "애니메이션" },
      { genreId: 7, name: "다큐" },
      { genreId: 8, name: "호러" },
      { genreId: 9, name: "드라마" },
      { genreId: 10, name: "스릴러" },
      { genreId: 11, name: "SF" },
      { genreId: 12, name: "판타지" },
    ]);
  }),
];

export default movieHandelrs;

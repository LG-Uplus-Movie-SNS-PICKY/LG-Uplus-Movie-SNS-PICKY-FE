import { http, HttpHandler, HttpResponse } from "msw";

// Movie 관련 모킹 API(Mocking Object) 설계
const movieHandelrs: HttpHandler[] = [
  // 장르의 종류를 가져오는 모킹 API
  http.get("/api/movie/genre", () => {
    return HttpResponse.json([
      { genre_id: 1, genre_name: "액션" },
      { genre_id: 2, genre_name: "로맨스" },
      { genre_id: 3, genre_name: "뮤지컬" },
      { genre_id: 4, genre_name: "코미디" },
      { genre_id: 5, genre_name: "범죄" },
      { genre_id: 6, genre_name: "애니메이션" },
      { genre_id: 7, genre_name: "다큐" },
      { genre_id: 8, genre_name: "호러" },
      { genre_id: 9, genre_name: "드라마" },
      { genre_id: 10, genre_name: "스릴러" },
      { genre_id: 11, genre_name: "SF" },
      { genre_id: 12, genre_name: "판타지" },
    ]);
  }),
];

export default movieHandelrs;

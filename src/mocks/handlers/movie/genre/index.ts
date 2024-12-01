import { http, HttpHandler, HttpResponse } from "msw";

// Movie 관련 모킹 API(Mocking Object) 설계
const movieHandelrs: HttpHandler[] = [
  // 장르의 종류를 가져오는 모킹 API
  http.get("/api/movie/genre", () => {
    return HttpResponse.json([{}]);
  }),
];

export default movieHandelrs;

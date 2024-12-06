import { http, HttpHandler, HttpResponse } from "msw";

// Movie 관련 모킹 API(Mocking Object) 설계
const movieHandelrs: HttpHandler[] = [
  // 장르의 종류를 가져오는 모킹 API
  http.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/genres`, () => {
    return HttpResponse.json([
      { id: 28, name: "액션" },
      { id: 10749, name: "로맨스" },
      { id: 35, name: "코미디" },
      { id: 18, name: "드라마" },
      { id: 80, name: "범죄" },
      {
        id: 99,
        name: "다큐멘터리",
      },
      {
        id: 16,
        name: "애니메이션",
      },
      { id: 10402, name: "음악" },
      { id: 53, name: "스릴러" },
      { id: 27, name: "호러" },
      { id: 878, name: "SF" },
      { id: 12, name: "판타지" },

      { id: 14, name: "모험" },
      { id: 10751, name: "가족" },
      { id: 36, name: "역사" },
      { id: 10752, name: "전쟁" },
      { id: 10770, name: "TV 영화" },
      { id: 9648, name: "미스터리" },
      { id: 37, name: "서부" },
    ]);
  }),
];

export default movieHandelrs;

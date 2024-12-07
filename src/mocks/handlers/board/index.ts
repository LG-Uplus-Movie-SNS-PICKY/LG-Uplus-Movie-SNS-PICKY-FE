import { http, HttpHandler, HttpResponse } from "msw";
import resposne from "./responseData.json";

// Movie 관련 모킹 API(Mocking Object) 설계
const boardHandlers: HttpHandler[] = [
  // 무비로그 생성 API(Mocking Object)
  http.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/board`, () => {}),

  // 무비로그 수정 API(Mocking Object)
  http.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/board/:boardId`,
    () => {}
  ),

  // 무비로그 삭제 API(Mocking Object)
  http.delete(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/board/:boardId`,
    () => {}
  ),

  // 무비로그 조회 API(Mocking Object) - 무비로그 탭 최신순 목록 조회
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/board/all`,
    ({ request }) => {
      const authorization = request?.headers?.get("Authorization");

      // 권한이 없을 경우 403에러 발생
      if (!authorization) {
        return HttpResponse.json(
          {
            message: "권한이 없습니다.",
          },
          { status: 403 }
        );
      }

      // 권한이 있을 경우 게시물을 반환한다.
      const url = new URL(request.url);

      // 무한 스크롤을 위한 page와 limit을 현재 주소에서 Param 값을 가져온다.
      const page = Number(url.searchParams.get("page") || 1);
      const limit = Number(url.searchParams.get("limit") || 10);

      // 가져올 인덱스를 계산한다.
      // start(시작값) : (page - 1) * limit
      // end(마지막) : start + limit
      const start = (page - 1) * limit;
      const end = start + limit;

      return HttpResponse.json(
        {
          data: resposne.slice(start, end),
          nextPage: end < resposne.length ? page + 1 : null,
        },
        { status: 200 }
      );
    }
  ),

  // 무비로그 조회 API(Mocking Object) - 프로필 페이지 사용자가 작성한 목록 조회
  http.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/board`, ({ request }) => {
    const authorization = request?.headers?.get("Authorization");

    // 권한이 없을 경우 403에러 발생
    if (!authorization) {
      return HttpResponse.json(
        {
          message: "권한이 없습니다.",
        },
        { status: 403 }
      );
    }

    const url = new URL(request.url);
    const nickname = url.searchParams.get("nickname");

    // 등록된 사용자가 아닐 경우 -> 404에러 발생
    if (!nickname) {
      return HttpResponse.json(
        {
          message: "해당 닉네임을 가진 사용자가 존재하지 않습니다.",
        },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      {
        data: resposne.filter((data) => data.writerNickname === nickname),
      },
      { status: 200 }
    );
  }),

  // 영화 디테일 페이지에서 무비로그 버튼을 클릭할 경우 -> 해당 영화와 관련된 무비로그만 조회 API(Mocking Object)
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/board/:movieId`,
    ({ params, request }) => {
      const authorization = request?.headers?.get("Authorization");
      const { movieId } = params;

      // 권한이 없을 경우 403에러 발생
      if (!authorization || !movieId) {
        return HttpResponse.json(
          {
            message: "권한이 없습니다.",
          },
          { status: 403 }
        );
      }

      return HttpResponse.json(
        { data: resposne.filter((data) => data.movie.id === Number(movieId)) },
        { status: 200 }
      );
    }
  ),

  // 무비로그 좋아요 API(Mocking Object) - 기능을 잘 모르겠음

  // 특정 게시물 댓글 생성 API(Mocking Object)
  http.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/board/:boardId/coments`,
    () => {}
  ),

  // 특정 게시물 댓글 조회 API(Mocking Object)
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/board/:boardId/coments`,
    () => {}
  ),

  // 특정 댓글 삭제 API(Mocking Object)
  http.delete(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/board/:boardId/coments`,
    () => {}
  ),
];

export default boardHandlers;

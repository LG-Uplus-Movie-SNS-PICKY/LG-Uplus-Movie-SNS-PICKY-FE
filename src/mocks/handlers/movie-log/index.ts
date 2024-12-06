import { http, HttpHandler, HttpResponse } from "msw";

// Movie 관련 모킹 API(Mocking Object) 설계
const movieHandelrs: HttpHandler[] = [
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
  http.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/board/all`, () => {}),

  // 무비로그 조회 API(Mocking Object) - 프로필 페이지 사용자가 작성한 목록 조회
  http.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/board`, () => {}),

  // 영화 디테일 페이지에서 무비로그 버튼을 클릭할 경우 -> 해당 영화와 관련된 무비로그만 조회 API(Mocking Object)
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/board/:movieId`,
    () => {}
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

export default movieHandelrs;

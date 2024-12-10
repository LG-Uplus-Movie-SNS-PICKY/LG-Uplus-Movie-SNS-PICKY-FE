import { http, HttpHandler, HttpResponse } from "msw";
import response from "./resposneData.json";

// import lineReview from "@constants/json/board/board_comments.json";

import { isEmpty } from "lodash";

interface bodyTypes {
  [key: string]: unknown;
  userId: number;
  writerNickname: string;
  movieId: number;
  rating: number;
  isSpoler: boolean;
  content: string;
}

interface RequestBody {
  context: string;
  isSpoiler: boolean;
}

const reviewHandler: HttpHandler[] = [
  // 특정 영화의 댓글을 추가
  http.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/linereview/create`,
    async ({ request }) => {
      const body: bodyTypes = (await request.json()) as bodyTypes;
      const authorization = request.headers.get("Authorization");

      // Body와 Authorization 보내지 않은 경우
      if (isEmpty(body) && !authorization) {
        return HttpResponse.json(
          {
            message: "Request body and Authorization header cannot be empty",
            errorCode: "ERR_EMPTY_BODY_AUTH",
          },
          { status: 400, statusText: "Bad Request" }
        );
      }

      // Body를 보내지 않은 경우
      if (isEmpty(body)) {
        return HttpResponse.json(
          {
            message: "Request body cannot be empty",
            errorCode: "ERR_EMPTY_BODY",
          },
          { status: 400, statusText: "Bad Request" }
        );
      }

      // Authorization 보내지 않은 경우
      if (!authorization) {
        return HttpResponse.json(
          {
            message: "Authorization header cannot be empty",
            errorCode: "ERR_EMPTY_AUTH",
          },
          { status: 400, statusText: "Bad Request" }
        );
      }

      // 모든 값을 정상적으로 받았을 경우에는 데이터 추가
      response.push({
        id: response.length,
        userId: body.userId,
        writerNickname: body.writerNickname,
        movieId: body.movieId,
        rating: body.rating,
        context: body.content,
        isSpoiler: body.isSpoler,
        likes: 0,
        dislikes: 0,
        createdAt: new Date().toISOString(),
      });

      return HttpResponse.json(
        { message: "Resource created successfully" },
        { status: 201, statusText: "Created" }
      );
    }
  ),

  // 특정 댓글 수정 API Mocking Object
  http.patch(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/linereview/:lineReviewId`,
    async ({ params, request }) => {
      const { lineReviewId } = params;
      const requestBody: RequestBody = (await request.json()) as RequestBody;

      // Line Review Id를 제대로 가지고 오지 못한 경우 + 숫자가 아닌 경우
      if (!lineReviewId || Number.isNaN(Number(lineReviewId)))
        return HttpResponse.json(
          { message: "Invalid or missing Line Review Id" },
          { status: 400, statusText: "LINE_REVIEW_ID_MISSING" }
        );

      response.forEach((data) => {
        if (data.id === Number(lineReviewId)) {
          data.context = requestBody.context;
          data.isSpoiler = requestBody.isSpoiler;
        }
      });

      return HttpResponse.json(
        { message: "Comment updated successfully" },
        { status: 200, statusText: "OK" }
      );
    }
  ),

  // 특정 영화에 대한 한줄평 목록을 조회
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/linereview/movie/:movieId`,
    ({ params, request }) => {
      // params 없거나
      const { movieId } = params;

      // Movie Id를 제대로 가지고 오지 못한 경우 + 숫자가 아닌 경우
      if (!movieId || Number.isNaN(Number(movieId)))
        return HttpResponse.json(
          { message: "Invalid or missing movieId" },
          { status: 400, statusText: "MOVIE_ID_MISSING" }
        );

      // JSON으로 구성된 파일 중 Movie Id에 맞는 값만 필터 시킨다.
      const review = response.filter(
        (data) => data.movieId === Number(movieId)
      );

      const url = new URL(request.url);

      const page = Number(url.searchParams.get("page") || 1);
      const limit = Number(url.searchParams.get("limit") || 10);

      // offset 방식의 데이터 조회 기법
      const start = (page - 1) * limit;
      const end = start + limit;

      return HttpResponse.json(
        {
          data: review.slice(start, end),
          nextPage: end < review.length ? page + 1 : null,
        },
        { status: 200 }
      );
    }
  ),

  // 사용자가 작성한 한줄평 목록 조회
  http.get(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/linereview/:nickname`,
    ({ params, request }) => {
      const authorization = request.headers.get("Authorization");
      const { nickname } = params;

      // Authorization 또는 nickname 보내지 않은 경우
      if (!authorization || !nickname) {
        return HttpResponse.json(
          {
            message:
              "Authorization 값을 추가 또는 Path Validation으로 nickname 값을 추가했는지 확인해주세요.",
            errorCode: "ERR_EMPTY_BODY_AUTH",
          },
          { status: 400, statusText: "Bad Request" }
        );
      }

      const url = new URL(request.url);
      const size = Number(url.searchParams.get("size")) || 10; // 데이터를 보내줄 개수 (기본값: 10개)
      const lastReviewId = Number(url.searchParams.get("lastReviewId")) || null;
      const lastCreatedAt =
        Number(url.searchParams.get("lastCreatedAt")) || null;

      // 현재 사용자가 작성한 한줄평 조회
      // let filterLineReview =
    }
  ),

  // 사용자가 작성한 한줄평 목록 조회
  // ${import.meta.env.VITE_SERVER_URL}/api/v1/linereview/:nickname
  // param = size: 가져올 데이터 개수, lastReviewId: 제일 마지막에 본 리뷰 ID, lastCreatedAt: 제일 마지막에 본 리뷰 Date
  // headers -> 필수
  /*
  
      {
        "size": 10,
        "content": [
          {
            "id": 0,
            "writerNickname": "string",
            "userId": 0,
            "movieId": 0,
            "rating": 0,
            "context": "string",
            "isSpoiler": true,
            "likes": 0,
            "dislikes": 0,
            "createdAt": "2024-12-10T08:18:09.435Z"
          }
        ],
        "number": 0, // 현재 페이지 번호
        // 처리안해도 되는 데이터
        "sort": {
          "empty": true,
          "sorted": true,
          "unsorted": true
        },
        "numberOfElements": 0, // 현재 페이지의 항목 수
        
        // 페이지 정보
        "pageable": {
          "offset": 0,
          "sort": {
            "empty": true,
            "sorted": true,
            "unsorted": true
          },
          "paged": true,
          "pageNumber": 0,
          "pageSize": 0,
          "unpaged": true
        },

        "first": true, // 첫 번째 페이지 여부
        "last": true, // 마지막 페이지 여부
        "empty": true // 데이터가 비어있는지 여부
      }
  
  */

  // 사용자가 작성한 한줄평 삭제
  // delete!  /api/v1/linereview/{lineReviewId}
  // isDelete = !isDelete

  // 좋아요 / 싫어요
  // 자기 글 안되고, 중복 불가능(좋아요 / 싫어요 취소), 좋아요 누르고 싫어요 누르면 자동으로 업데이트
  // 보내야되는 값은  "lineReviewId": 1, "preference": "LIKE, DISLIKE"
];

export default reviewHandler;

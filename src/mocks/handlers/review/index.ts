import { http, HttpHandler, HttpResponse } from "msw";
import response from "./resposneData.json";

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
];

export default reviewHandler;

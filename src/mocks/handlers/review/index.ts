import { http, HttpHandler, HttpResponse } from "msw";
import response from "./resposneData.json";

import user from "@constants/json/user.json";
import lineReview from "@constants/json/line-review/lineReviews.json";
import lineReviewLikes from "@constants/json/line-review/lineReviewLikes.json";

import { first, isEmpty, size } from "lodash";
import { getCookie } from "@util/cookie";

interface ReviewLikeBodyTypes {
  lineReviewId: number;
  preference: "LIKE" | "DISLIKE";
}

interface bodyTypes {
  [key: string]: unknown;
  movieId: number;
  rating: number;
  context: string;
  isSpoler: boolean;
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
      const userInfo = getCookie("user") || {};

      // Body와 Authorization 보내지 않은 경우
      if (isEmpty(body) && !authorization && isEmpty(userInfo)) {
        return HttpResponse.json(
          {
            message:
              "Request body and Authorization header cannot be empty and Please Login",
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
        id: response.length + 1,
        userId: userInfo.localJwtDto.accessToken,
        writerNickname: userInfo.user.nickname,
        movieId: body.movieId,
        rating: body.rating,
        context: body.context,
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

  // 특정 한줄평 수정 API Mocking Object
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

      // Movie Id에 맞는 Review 데이터만 필터 시킨다.
      let filterLineReview = lineReview
        .filter((review) => review.movie_id === Number(movieId))
        .map((review) => ({
          context: review.line_review_content,
          createdAt: new Date(review.created_at).toISOString(),
          dislikes: lineReviewLikes.filter(
            (likes) =>
              likes.line_review_id === review.line_review_id &&
              likes.preference === "DISLIKE"
          ).length,
          id: review.line_review_id,
          isSpoiler: review.is_spoiler,
          likes: lineReviewLikes.filter(
            (likes) =>
              likes.line_review_id === review.line_review_id &&
              likes.preference === "LIKE"
          ).length,
          movieId: review.movie_id,
          rating: review.line_review_rating,
          userId: review.user_id,
          writerNickname: review.writer_nickname,
        }));

      const url = new URL(request.url);

      const lastReviewId = Number(url.searchParams.get("lastReviewId")) || 0;
      const lastCreatedAt = url.searchParams.get("lastCreatedAt") || "";

      // 커서 기반 필터링(lastCreatedAt을 통해서 해당 날짜 이후 데이터 필터링)
      if (lastCreatedAt && lastReviewId) {
        filterLineReview = filterLineReview.filter((review) => {
          if (new Date(review.createdAt) < new Date(lastCreatedAt)) {
            return true;
          } else if (
            new Date(review.createdAt).getTime() ===
            new Date(lastCreatedAt).getTime()
          ) {
            return review.id < lastReviewId;
          }

          return false;
        });
      }

      // 최신순으로 내림차순 정렬
      const paginatedReviews = filterLineReview
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 2);

      return HttpResponse.json(
        {
          code: 200,
          data: {
            size: 2,
            content: paginatedReviews,
            empty: paginatedReviews.length === 0,
            first: !lastCreatedAt && !lastReviewId,
            last: paginatedReviews.length < 2,
            number: 0,
            numberOfElements: paginatedReviews.length,
            pageable: {
              offset: 0,
              pageNumber: 0,
              pageSize: 10,
              paged: true,
              sort: {
                empty: true,
                sorted: false,
                unsorted: true,
              },
              unpaged: false,
            },
            sort: {
              empty: true,
              sorted: false,
              unsorted: true,
            },
          },
          message: "요청이 성공적으로 처리되었습니다.",
          sucess: true,
        },
        { status: 200 }
      );
    }
  ),

  // 사용자가 작성한 한줄평 목록 조회
  // param = size: 가져올 데이터 개수, lastReviewId: 제일 마지막에 본 리뷰 ID, lastCreatedAt: 제일 마지막에 본 리뷰 Date
  // headers -> 필수
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

      const userInfo = user.find((user) => user.user_nickname === nickname);

      const url = new URL(request.url);
      const size = Number(url.searchParams.get("size")) || 10; // 데이터를 보내줄 개수 (기본값: 10개)
      const lastReviewId = Number(url.searchParams.get("lastReviewId")) || null;
      const lastCreatedAt = url.searchParams.get("lastCreatedAt") || null;

      // 현재 사용자가 작성한 한줄평 조회
      let filterLineReview = lineReview
        .filter((review) => review.user_id === userInfo?.user_id)
        .map((review) => ({
          id: review.line_review_id,
          writerNickname: review.writer_nickname,
          userId: review.user_id,
          movieId: review.movie_id,
          rating: review.line_review_rating,
          context: review.line_review_content,
          isSpoiler: review.is_spoiler,
          likes: lineReviewLikes.filter(
            (like) =>
              like.preference === "Like" &&
              like.line_review_id === review.line_review_id
          ).length,
          dislikes: lineReviewLikes.filter(
            (like) =>
              like.preference === "DISLIKE" &&
              like.line_review_id === review.line_review_id
          ).length,
          createdAt: review.created_at,
        }));

      // 커서 기반 필터링(lastCreatedAt을 통해서 해당 날짜 이후 데이터 필터링)
      if (lastCreatedAt && lastReviewId) {
        filterLineReview = filterLineReview.filter((review) => {
          if (new Date(review.createdAt) < new Date(lastCreatedAt)) {
            return true;
          } else if (
            new Date(review.createdAt).getTime() ===
            new Date(lastCreatedAt).getTime()
          ) {
            return review.id < lastReviewId;
          }

          return false;
        });
      }

      // 최신순으로 내림차순 정렬
      const paginatedReviews = filterLineReview
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, size);

      return HttpResponse.json(
        {
          size,
          content: paginatedReviews,
          lastCursor:
            paginatedReviews.length > 0
              ? {
                lastCreatedAt:
                  paginatedReviews[paginatedReviews.length - 1].createdAt,
                lastReviewId:
                  paginatedReviews[paginatedReviews.length - 1].id,
              }
              : null,
          numberOfElements: paginatedReviews.length,
          first: !lastCreatedAt && !lastReviewId,
          last: paginatedReviews.length < size,
          empty: paginatedReviews.length === 0,
        },
        { status: 200 }
      );
    }
  ),

  // 사용자가 작성한 한줄평 삭제
  // delete!  /api/v1/linereview/{lineReviewId}
  // isDelete = !isDelete
  http.delete(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/linereview/:lineReviewId`,
    ({ params, request }) => {
      const authorization = request.headers.get("Authorization");
      const { lineReviewId } = params;
      const userInfo = getCookie("user") || {};

      // Authorization 또는 lineReviewId 보내지 않은 경우
      if (!authorization || !lineReviewId) {
        return HttpResponse.json(
          {
            message:
              "Authorization 값을 추가 또는 Path Validation으로 nickname 값을 추가했는지 확인해주세요.",
            errorCode: "ERR_EMPTY_BODY_AUTH",
          },
          { status: 400, statusText: "Bad Request" }
        );
      }

      // Path Validation으로 입력된 한줄평 정보를 찾는다.
      const review = lineReview.find(
        (review) =>
          review.line_review_id === Number(lineReviewId) &&
          review.user_id === userInfo?.localJwtDto.accessToken
      );
      if (isEmpty(review)) {
        // 삭제하려는 한줄평 정보가 없을 경우
        return HttpResponse.json(
          {
            message:
              "삭제하려는 한줄평 정보를 찾을 수 없습니다. 요청된 ID를 확인하세요.",
            errorCode: "REVIEW_NOT_FOUND",
          },
          { status: 404, statusText: "Not Found" }
        );
      }

      review.is_delete = true; // 한줄평 논리적 삭제로 수정

      // 한줄평 정보가 있을 경우
      return HttpResponse.json(
        { message: "해당 한줄평이 성공적으로 삭제되었습니다." },
        { status: 200 }
      );
    }
  ),

  // 좋아요 / 싫어요
  // 자기 글 안되고, 중복 불가능(좋아요 / 싫어요 취소), 좋아요 누르고 싫어요 누르면 자동으로 업데이트
  // 보내야되는 값은  "lineReviewId": 1, "preference": "LIKE, DISLIKE"
  http.post(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/linereviewlike`,
    async ({ request }) => {
      const authorization = request.headers.get("Authorization");
      const userInfo = getCookie("user") || {};
      const body = (await request.json()) as ReviewLikeBodyTypes;

      // Authorization 또는 lineReviewId 보내지 않은 경우
      if (!authorization || isEmpty(userInfo) || isEmpty(body)) {
        return HttpResponse.json(
          {
            message:
              "Authorization 값을 추가 또는 로그인을 했는지 확인해주세요. 또는 body(lineReviewId, preference)를 추가했는지 확인해주세요.",
            errorCode: "ERR_EMPTY_BODY_AUTH",
          },
          { status: 400, statusText: "Bad Request" }
        );
      }

      // 한줄평 정보를 Request Body를 통해 얻은 lineReviewId 값을 통해 해당 한줄평 정보를 얻는다.
      const reviewInfo = lineReview.find(
        (review) => review.line_review_id === body.lineReviewId
      );

      // #1. 한줄평이 현재 로그인한 사용자가 자기 글에 좋아요 또는 싫어요를 누르는 경우 -> 승인 X
      if (reviewInfo?.user_id === userInfo.localJwtDto.accessToken) {
        return HttpResponse.json(
          {
            message: "자신이 등록한 한줄평에는 좋아요를 누를 수 없습니다.",
            errorCode: "ERR_SELF_LIKE_NOT_ALLOWED",
          },
          { status: 403, statusText: "Forbidden" }
        );
      }

      // body로 넘겨받은 lineReviewId를 통해 사용자가 해당 한줄평에 평가를 남겼는지 확인하나.
      const reviewLikeInfo = lineReviewLikes.find(
        (like) =>
          like.line_review_id === body.lineReviewId &&
          like.user_id === userInfo.localJwtDto.accessToken
      );

      // #2. 사용자가 해당 한줄평에 평가를 남기지 않았을 경우 -> 평가 추가
      if (isEmpty(reviewLikeInfo)) {
        // 사용자가 등록한 평가를 추가한다.
        lineReviewLikes.push({
          line_review_id: body.lineReviewId,
          line_review_like_id: lineReviewLikes.length + 1,
          preference: body.preference,
          user_id: userInfo.localJwtDto.accessToken,
        });

        // 이후 성공 응답을 반환한다.
        return HttpResponse.json(
          { message: `REQUEST_FRONT_SUCCESS(${body.preference} 추가)` },
          { status: 200 }
        );
      }

      // #3. 사용자가 한줄평에 대한 평가를 남긴 적이 있을 경우
      else {
        // #3-1. 중복 클릭 -> 좋아요 / 싫어요 취소
        if (reviewLikeInfo.preference === body.preference) {
          for (let i = 0; i < lineReviewLikes.length; i++) {
            if (
              lineReviewLikes[i].line_review_like_id ===
              reviewLikeInfo.line_review_like_id
            ) {
              lineReviewLikes.splice(i, 1);

              return HttpResponse.json(
                { message: `REQUEST_FRONT_SUCCESS(${body.preference} 취소)` },
                { status: 200 }
              );
            }
          }
        }

        // #3-2. 반대값으로 수정한 경우
        else {
          reviewLikeInfo.preference =
            body.preference === "LIKE" ? "DISLIKE" : "LIKE";

          return HttpResponse.json(
            { message: `REQUEST_FRONT_SUCCESS(${body.preference} 수정)` },
            { status: 200 }
          );
        }
      }
    }
  ),
];

export default reviewHandler;

import { http, HttpHandler, HttpResponse } from "msw";
import response from "./resposneData.json";

const reviewHandler: HttpHandler[] = [
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

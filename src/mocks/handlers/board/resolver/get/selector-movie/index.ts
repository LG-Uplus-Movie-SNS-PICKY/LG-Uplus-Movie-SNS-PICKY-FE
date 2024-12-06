import { HttpResponse } from "msw";
import responseData from "../../responseData.json";

export default function SelectorMovie({ params, request }) {
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
    { data: responseData.filter((data) => data.movie.id === Number(movieId)) },
    { status: 200 }
  );
}

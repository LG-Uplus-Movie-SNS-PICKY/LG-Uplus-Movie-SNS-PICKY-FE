import { HttpResponse } from "msw";

export default function UserMovieLog({ request }) {
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

  return HttpResponse.json({}, {});
}

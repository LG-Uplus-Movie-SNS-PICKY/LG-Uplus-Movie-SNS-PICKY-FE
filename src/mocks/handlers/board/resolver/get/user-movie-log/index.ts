import { HttpResponse } from "msw";
import responseData from "../../responseData.json";

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
      data: responseData.filter((data) => data.writerNickname === nickname),
    },
    { status: 200 }
  );
}

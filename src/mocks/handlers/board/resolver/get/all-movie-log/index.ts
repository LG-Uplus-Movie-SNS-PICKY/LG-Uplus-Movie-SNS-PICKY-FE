import { HttpResponse } from "msw";
import resposne from "./responseData.json";

// interface HeadersTypes

interface MockedRequest {
  [key: string]: unknown;
  url: string;
}

export default function AllMovieLog({ request }: { request: MockedRequest }) {
  const authorization = request?.headers?.get("Authorization");

  console.log(request.headers.get);

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

import { http, HttpHandler, HttpResponse } from "msw";

import user from "@constants/json/user.json";
import { isEmpty } from "lodash";

const authHandler: HttpHandler[] = [
  http.patch(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/user`,
    async ({ request }) => {
      const authorization = request.headers.get("Authorization");

      // 권환이 없을 경우 403 에러 발생
      if (!authorization) {
        return HttpResponse.json(
          {
            message:
              "권한이 없습니다. Request Headers에 Authorization를 추가해주세요. (임시로 아무값이나 넣어도 무관)",
          },
          { status: 403 }
        );
      }

      const body = (await request.json()) as { id: number };

      // Request Body를 보내지 않은 경우
      if (isEmpty(body)) {
        return HttpResponse.json(
          {
            message:
              "Body를 올바른 형식으로 작성해주세요. (SwaggerAPI - board-controlle 보고 참고)",
            errorCode: "ERR_EMPTY_BODY",
          },
          { status: 400, statusText: "Bad Request" }
        );
      }

      const userInfo = user.find((info) => info.id === body.id);

      if (!userInfo) {
        return HttpResponse.json(
          {
            message: "존재하지 않는 사용자 정보입니다.",
            errorCode: "ERR_UNAUTHORIZED",
          },
          { status: 401, statusText: "Unauthorized" }
        );
      }

      return HttpResponse.json({ ...userInfo }, { status: 200 });
    }
  ),
];

export default authHandler;

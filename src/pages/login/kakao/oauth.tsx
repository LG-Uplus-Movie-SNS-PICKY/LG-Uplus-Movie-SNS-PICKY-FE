import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../../../review/atoms";
import { Toast } from "@stories/toast";
import { isLogin } from "@recoil/atoms/isLoginState";
import { getCookie, removeCookie, setCookie } from "@util/cookie";
import { fetchGetUserInfo } from "@api/user";

const LoginCallback: React.FC = () => {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setIsLoginState = useSetRecoilState(isLogin);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const state = queryParams.get("state");

    if (!code || !state) {
      setToastMessage("잘못된 로그인 요청입니다. 다시 시도해주세요.");
      return;
    }

    setIsLoading(true);

    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/v1/oauth/kakao/user`, {
        params: { code, state },
      })
      .then(async (response) => {
        // 소셜 로그인 서비스에서 정보를 제대로 전달 받았을 경우
        const { oAuth2Token, localJwtDto, isRegistrationDone, role } =
          response.data.data;

        if (
          oAuth2Token?.access_token &&
          oAuth2Token?.refresh_token &&
          localJwtDto?.accessToken
        ) {
          // oAuth2 기본 정보 저장 -> user가 아닌 다른걸로 변경 필요
          setCookie(
            "token",
            JSON.stringify({
              oAuth2Token,
              localJwtDto,
              isRegistrationDone,
              isAuthUser: role === "ADMIN",
            }),
            {
              path: "/", // 모든 경로에서 접근 가능
              maxAge: 60 * 60 * 24, // 1일 (초 단위)
              sameSite: "strict", // 보안 설정
              secure: true, // HTTPS 필요 여부 (개발 시 false)
            }
          );

          if (isRegistrationDone) {
            const currentUserCookie = getCookie("token");

            // User GET API 모듈로 분리
            const userResponse = await fetchGetUserInfo();

            // Cookie에 저장할 새로운 정보
            const newUserData = {
              ...currentUserCookie,
              user: {
                nickname: userResponse.data.nickname,
                gender: userResponse.data.gender,
                profileUrl: userResponse.data.profileUrl,
              },
            };

            // 로그인 사용자의 쿠키 값을 설정
            setCookie("user", JSON.stringify(newUserData), {
              path: "/", // 모든 경로에서 접근 가능
              maxAge: 60 * 60 * 24, // 1일 (초 단위)
              sameSite: "strict", // 보안 설정
              secure: true, // HTTPS 필요 여부 (개발 시 false)
            });

            // 전역 상태로 관리할 유저의 정보 -> 중요하지 않은 정보
            setIsLoginState({
              isLoginState: true, // 로그인이 된 상태
              isAuthUser: newUserData.isAuthUser,
              isLoginInfo: newUserData.user,
              isLoading: false,
            });

            removeCookie("token");
            setToastMessage("로그인에 성공했습니다!");
          } else {
            // 유저 정보가 등록되지 않았을 경우
            setToastMessage(
              "등록되지 않은 사용자입니다. 잠시 후 개인정보 입력 페이지로 넘어가겠습니다."
            );
            setTimeout(() => navigate("/auth/sign-up"), 2000);
          }
        } else {
          setToastMessage("로그인 처리 중 문제가 발생했습니다.");
        }
      })
      .catch((error) => {
        // 소셜 로그인 서비스에서 제대로 된 정보를 받지 못했을 경우

        const errorMessage =
          error.response?.data?.message ||
          "로그인 처리 중 문제가 발생했습니다.";
        setToastMessage(errorMessage);
      })
      .finally(() => {
        // 성공, 실패에 상관없이 무조건 한 번은 실행되는 코드
        setIsLoading(false);
      });
  }, [navigate, setUserState, setIsLoginState]);

  return (
    <div>
      {toastMessage && <Toast message={toastMessage} />}
      {isLoading && <div>로그인 처리 중...</div>}
    </div>
  );
};

export default LoginCallback;

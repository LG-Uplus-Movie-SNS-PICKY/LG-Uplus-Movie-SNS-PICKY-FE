import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../../../review/atoms";
import { Toast } from "@stories/toast";

// 쿠키 설정 함수
function setCookie(name: string, value: string, days?: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
}

const LoginCallback: React.FC = () => {
  const navigate = useNavigate();
  const setUserState = useSetRecoilState(userState);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
      .get(`https://api.picky-movie.com/api/v1/oauth/naver/user`, {
        params: { code, state },
      })
      .then(async (response) => {
        const { oAuth2Token, localJwtDto, isRegistrationDone, role } =
          response.data.data;

        if (
          oAuth2Token?.access_token &&
          oAuth2Token?.refresh_token &&
          localJwtDto?.accessToken
        ) {
          // 쿠키에 토큰 저장
          setCookie("access_token", oAuth2Token.access_token, 7);
          setCookie("refresh_token", oAuth2Token.refresh_token, 7);
          setCookie("token_type", oAuth2Token.token_type, 7);
          setCookie("expires_in", oAuth2Token.expires_in, 7);
          setCookie("accessToken", localJwtDto.accessToken, 7);
          setCookie("isRegistrationDone", JSON.stringify(isRegistrationDone), 7);
          setCookie("role", role, 7);

          if (role === "ADMIN") {
            setToastMessage("관리자로 로그인되었습니다!");
            setTimeout(() => navigate("/admin"), 2000);
            return;
          }

          try {
            const userResponse = await axios.get(
              `${import.meta.env.VITE_SERVER_URL}/api/v1/user`,
              {
                headers: {
                  Authorization: `Bearer ${localJwtDto.accessToken}`,
                },
              }
            );

            if (userResponse.status === 200) {
              const userData = userResponse.data;

              // 쿠키에 사용자 정보 저장
              setCookie("user", JSON.stringify(userData), 7);

              setUserState({
                name: userData.name,
                nickname: userData.nickname,
                birthdate: userData.birthdate,
                gender: userData.gender,
                nationality: userData.nationality,
                email: userData.email,
                profileUrl: userData.profileUrl,
                profileImagePreview: userData.profileImagePreview,
              });

              setToastMessage("로그인에 성공했습니다!");
              setTimeout(() => navigate("/"), 2000);
            }
          } catch (error) {
            console.error("User API error:", error);
            setToastMessage("사용자 정보를 가져오는 중 오류가 발생했습니다.");
            setTimeout(() => navigate("/auth/sign-up"), 2000);
          }
        } else {
          setToastMessage("로그인 처리 중 문제가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.error("Social login API error:", error);
        const errorMessage =
          error.response?.data?.message || "로그인 처리 중 문제가 발생했습니다.";
        setToastMessage(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate, setUserState]);

  return (
    <div>
      {toastMessage && <Toast message={toastMessage} />}
      {isLoading && <div>로그인 처리 중...</div>}
    </div>
  );
};

export default LoginCallback;
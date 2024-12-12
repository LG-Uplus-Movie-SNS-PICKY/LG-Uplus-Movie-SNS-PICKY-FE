import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../../../review/atoms";
import { Toast } from "@stories/toast";

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

    // 소셜 로그인 API 요청
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
          // 토큰을 세션에 저장
          sessionStorage.setItem("access_token", oAuth2Token.access_token);
          sessionStorage.setItem("refresh_token", oAuth2Token.refresh_token);
          sessionStorage.setItem("token_type", oAuth2Token.token_type);
          sessionStorage.setItem("expires_in", oAuth2Token.expires_in);
          sessionStorage.setItem("accessToken", localJwtDto.accessToken);
          sessionStorage.setItem(
            "isRegistrationDone",
            JSON.stringify(isRegistrationDone)
          );
          sessionStorage.setItem("role", role);

          if (role === "ADMIN") {
            setToastMessage("관리자로 로그인되었습니다!");
            setTimeout(() => navigate("/admin"), 2000);
            return;
          }

          // 사용자 정보 가져오기
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

              // Recoil 전역 상태 업데이트
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
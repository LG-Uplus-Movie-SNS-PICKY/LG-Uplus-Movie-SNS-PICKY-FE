import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginCallback: React.FC = () => {
  const navigate = useNavigate();
  const PLATFORM = "naver"; // 플랫폼 값 설정
  const ROUTES = {
    LOGIN: "/login",
    SIGNUP: "/signup",
  };

  useEffect(() => {
    console.log("LoginCallback useEffect triggered");

    // URL에서 query parameters 가져오기
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const state = queryParams.get("state");

    if (!code || !state) {
      console.error("로그인 리다이렉트 파라미터가 없습니다. (code 또는 state)");
      alert("잘못된 로그인 요청입니다. 다시 시도해주세요.");
      return;
    }

    console.log("Received query parameters:", { code, state });

    // 백엔드로 소셜 로그인 처리 요청
    axios
      .post(`http://43.202.51.30:8080/api/v1/oauth/${PLATFORM}/user`, null, {
        params: {
          code, // code 전달
          state, // state 전달
        },
        headers: {
          "Content-Type": "application/json", // 헤더 설정
        },
      })
      .then((response) => {
        console.log("Received response from backend:", response.data);

        const { oAuth2Token, localJwtDto, isRegistrationDone } = response.data;

        if (oAuth2Token && localJwtDto) {
          console.log("Storing tokens in sessionStorage...");
          sessionStorage.setItem("access_token", oAuth2Token.access_token);
          sessionStorage.setItem("refresh_token", oAuth2Token.refresh_token);
          sessionStorage.setItem("local_jwt", localJwtDto.accessToken);
        } else {
          console.error("백엔드 응답에 토큰 정보가 없습니다.");
          alert("로그인 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
          return;
        }

        // 회원가입 여부에 따라 페이지 이동
        if (isRegistrationDone) {
          console.log("Registration completed. Navigating to /login...");
          navigate(ROUTES.LOGIN);
        } else {
          console.log("Registration not completed. Navigating to /signup...");
          navigate(ROUTES.SIGNUP);
        }
      })
      .catch((error) => {
        // 에러 처리 개선
        console.error("Error occurred during backend request:", error);
        if (error.response) {
          console.error("Backend error response data:", error.response.data);
          console.error("HTTP status code:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("No response received. Request was:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
        alert("로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
};

export default LoginCallback;
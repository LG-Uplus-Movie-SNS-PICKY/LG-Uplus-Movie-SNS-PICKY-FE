import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("LoginCallback useEffect triggered.");

    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const state = queryParams.get("state");

    console.log("Parsed URL parameters:", { code, state });

    if (code && state) {
      console.log("Sending request to backend with parameters:", {
        platform: "naver",
        code,
        state,
      });

      axios
        .post("http://43.202.51.30:8080/{naver}/user", null, {
          params: {
            platform: "naver",
            code,
            state,
          },
        })
        .then((response) => {
          console.log("Received response from backend:", response.data);

          const { oAuth2Token, localJwtDto, isRegistrationDone } = response.data;

          if (oAuth2Token && localJwtDto) {
            console.log("Storing tokens in sessionStorage...");
            sessionStorage.setItem("access_token", oAuth2Token.access_token);
            sessionStorage.setItem("refresh_token", oAuth2Token.refresh_token);
            // token type
            // token expire time
            sessionStorage.setItem("local_jwt", localJwtDto.accessToken);
          }

          if (isRegistrationDone) {
            console.log("Registration done. Navigating to /login...");
            navigate("/login");
          } else {
            console.log("Registration not done. Navigating to /signup...");
            navigate("/signup");
          }
        })
        .catch((error) => {
          console.error("Error occurred during backend request:", error);
        });
    } else {
      console.error("로그인 리다이렉트 파라미터가 없습니다. (code 또는 state)");
    }
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
};

export default LoginCallback;
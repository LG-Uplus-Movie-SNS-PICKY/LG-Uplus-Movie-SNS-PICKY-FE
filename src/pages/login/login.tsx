import { useEffect } from "react";
import {
  GOOGLE_LOGIN_URL,
  KAKAO_LOGIN_URL,
  NAVER_LOGIN_URL,
} from "../../api/constants";
import { BtnGoogle, BtnKakao, BtnNaver, PickyLogo } from "../../assets/svg";

import { Block, Img, Text } from "../../styles/ui";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const handleKakaoLoginClick = () => {
    window.location.href = `${KAKAO_LOGIN_URL}`;
  };
  const handleGoogleLoginClick = () => {
    window.location.href = `${GOOGLE_LOGIN_URL}`;
  };
  const handleNaverLoginClick = () => {
    window.location.href = `${NAVER_LOGIN_URL}`;
  };

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get("access_token");
    const refreshToken = queryParams.get("refresh_token");

    if (accessToken && refreshToken) {
      sessionStorage.setItem("access_token", accessToken);
      sessionStorage.setItem("refresh_token", refreshToken);
      navigate("/");
    }
  }, [location.search]);

  return (
    <>
      <Block.FlexBox
        width="100%"
        height="100vh"
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap="34px"
      >
        <Text.TitleMenu100>영화인 필수!</Text.TitleMenu100>
        <Text.TitleMenu300>영화 리뷰 1등 플랫폼</Text.TitleMenu300>
        <PickyLogo width={231} height={83} />

        <Block.FlexBox
          width="100%"
          height="450px"
          justifyContent="center"
          alignItems="center"
        >
          <Img.AngledIcon
            width="412px"
            height="340px"
            src="forcat_main_img.PNG"
            alt="포캣"
          />
        </Block.FlexBox>

        <Text.Notice100 color="Gray">
          SNS 계정으로 빠르게 시작해보세요!
        </Text.Notice100>
        <Block.FlexBox justifyContent="center" gap="45px">
          <BtnKakao
            onClick={handleKakaoLoginClick}
            width={46}
            cursor="pointer"
          />
          <BtnGoogle
            onClick={handleGoogleLoginClick}
            width={46}
            cursor="pointer"
          />
          <BtnNaver
            onClick={handleNaverLoginClick}
            width={46}
            cursor="pointer"
          />
        </Block.FlexBox>
      </Block.FlexBox>
    </>
  );
}

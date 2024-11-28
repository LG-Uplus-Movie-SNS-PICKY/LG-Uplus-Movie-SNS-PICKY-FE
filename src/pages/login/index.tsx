import { useEffect } from "react";
import { NAVER_LOGIN_URL } from "../../api/constants";
import { BtnNaver, PickyLogo } from "../../assets/svg";
import { Block, Text } from "../../styles/ui";
import { useLocation, useNavigate } from "react-router-dom";
import {StyledText, GapContainer} from "./index.styles"

export default function Login() {
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
        $width="100%"
        $height="100vh"
        $direction="column"
        $alignItems="center"
        $justifyContent="center"
        $gap="34px"
      >
        <Text.TitleMenu100>영화인 필수!</Text.TitleMenu100>
        <Text.TitleMenu300>영화 리뷰 1등 플랫폼</Text.TitleMenu300>

        <div css={GapContainer}>
        {/* <GapContainer $direction="column" $alignItems="center"> */}
          <PickyLogo width={231} height={83} />
          <div css={StyledText}>⚡️간편로그인으로 3초만에 빠르게 회원가입!</div>
        {/* </GapContainer> */}
        </div>
        <Block.FlexBox $justifyContent="center" $gap="50px">
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

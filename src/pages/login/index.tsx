import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import {
  GOOGLE_LOGIN_URL,
  KAKAO_LOGIN_URL,
  NAVER_LOGIN_URL,
} from "../../api/constants";
import { BtnGoogle, BtnKakao, BtnNaver, PickyLogo } from "../../assets/svg";

import { Block, Text } from "../../styles/ui";

const StyledText = styled.div`
  display: flex;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 0.5px solid #f8f8f8;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

  color: #5e5e5e;
  text-align: center;

  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const GapContainer = styled(Block.FlexBox)`
  gap: 106px; /* 로고와 StyledText 사이의 간격 설정 */
`;

export default function Login() {
  const handleKakaoLoginClick = () => {
    console.log("Kakao Login Clicked");
    window.location.href = `${KAKAO_LOGIN_URL}`;
  };
  const handleGoogleLoginClick = () => {
    console.log("Google Login Clicked");
    window.location.href = `${GOOGLE_LOGIN_URL}`;
  };
  const handleNaverLoginClick = () => {
    console.log("Naver Login Clicked");
    window.location.href = `${NAVER_LOGIN_URL}`;
  };

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

        <GapContainer $direction="column" $alignItems="center">
          <PickyLogo width={231} height={83} />
          <StyledText>⚡️간편로그인으로 3초만에 빠르게 회원가입!</StyledText>
        </GapContainer>
        <Block.FlexBox $justifyContent="center" $gap="50px">
          <BtnKakao
            onClick={handleKakaoLoginClick}
            width={46}
            cursor="pointer"
          />
          <BtnNaver
            onClick={handleNaverLoginClick}
            width={46}
            cursor="pointer"
          />
          <BtnGoogle
            onClick={handleGoogleLoginClick}
            width={46}
            cursor="pointer"
          />
        </Block.FlexBox>
      </Block.FlexBox>
    </>
  );
}
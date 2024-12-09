import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import {
  GOOGLE_LOGIN_URL,
  KAKAO_LOGIN_URL,
  NAVER_LOGIN_URL,
} from "../../api/constants";
import { BtnGoogle, BtnKakao, BtnNaver, PickyLogo } from "../../assets/svg";

import { Block, Text } from "../../styles/ui";
import SEO from "@components/seo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleKakaoLoginClick = () => {
    console.log("Kakao Login Clicked");
    window.location.href = `${KAKAO_LOGIN_URL}`;
  };
  const handleGoogleLoginClick = () => {
    console.log("Google Login Clicked");
    window.location.href = `${GOOGLE_LOGIN_URL}`;
  };
  const handleNaverLoginClick = async () => {
    console.log("Naver Login Clicked");
    window.location.href = `${NAVER_LOGIN_URL}`;
  };

  const socialLoginClikc = async () => {
    const data = await axios
      .patch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user`,
        { id: 6 },
        {
          headers: {
            Authorization: "1",
          },
        }
      )
      .then((res) => res.data);

    if (!data) {
      console.warn(
        "에러, headers 값 줬는지 혹은 body의 id 값이 1 ~ 7인지 확인"
      );
    }

    sessionStorage.setItem("user", JSON.stringify(data));
    navigate("/");
  };

  return (
    <>
      <SEO
        title="PICKY: 로그인"
        description="PICKY에 로그인 하고 영화 리뷰와 정보를 한곳에서 확인하고, 영화 팬들을 위한 최적의 커뮤니티 서비스를 이용해 보세요"
      />

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

        <button onClick={socialLoginClikc} style={{ cursor: "pointer" }}>
          Local Login Btn
        </button>
      </Block.FlexBox>
    </>
  );
}

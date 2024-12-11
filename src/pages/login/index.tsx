/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import {
  GOOGLE_LOGIN_URL,
  KAKAO_LOGIN_URL,
  NAVER_LOGIN_URL,
} from "../../api/constants";
import { BtnGoogle, BtnKakao, BtnNaver } from "../../assets/svg";
import Picky_main_Logo from "@assets/icons/picky_main_logo.svg?react";
import {GapContainer, StyledText } from "./index.styles"
import { Block, Text,  } from "../../styles/ui";
import SEO from "@components/seo";
import axios from "axios";

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

  const socialLoginClick = async () => {
    const data = await axios
      .patch(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/user`,
        { id: 7 },
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
        css={css`
          width: 100%;
          height: 100vh;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 34px;
        `}
      >
        <Text.TitleMenu100>영화인 필수!</Text.TitleMenu100>
        <Text.TitleMenu300>영화 리뷰 1등 플랫폼</Text.TitleMenu300>

        <Block.FlexBox
          css={css`
          /* border-top: 36px; */
            flex-direction: column;
            align-items: center;
            ${GapContainer}
          `}
        >
          <Picky_main_Logo width={300} height={100} />
          <div css={StyledText}>⚡️간편로그인으로 3초만에 빠르게 회원가입!</div>
        </Block.FlexBox>

        <Block.FlexBox
          css={css`
            justify-content: center;
            gap: 50px;
          `}
        >
          <BtnKakao
            onClick={handleKakaoLoginClick}
            width={46}
            style={{ cursor: "pointer" }}
          />
          <BtnNaver
            onClick={handleNaverLoginClick}
            width={46}
            style={{ cursor: "pointer" }}
          />
          <BtnGoogle
            onClick={handleGoogleLoginClick}
            width={46}
            style={{ cursor: "pointer" }}
          />
        </Block.FlexBox>

        <button onClick={socialLoginClick} style={{ cursor: "pointer" }}>
          Local Login Btn
        </button>
      </Block.FlexBox>
    </>
  );
}

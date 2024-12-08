import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
import { GOOGLE_LOGIN_URL, KAKAO_LOGIN_URL, NAVER_LOGIN_URL, } from "../../api/constants";
import { BtnGoogle, BtnKakao, BtnNaver, PickyLogo } from "../../assets/svg";
import { Block, Text } from "../../styles/ui";
import SEO from "@components/seo";
const StyledText = styled.div `
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
const GapContainer = styled(Block.FlexBox) `
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
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { title: "PICKY: \uB85C\uADF8\uC778", description: "PICKY\uC5D0 \uB85C\uADF8\uC778 \uD558\uACE0 \uC601\uD654 \uB9AC\uBDF0\uC640 \uC815\uBCF4\uB97C \uD55C\uACF3\uC5D0\uC11C \uD655\uC778\uD558\uACE0, \uC601\uD654 \uD32C\uB4E4\uC744 \uC704\uD55C \uCD5C\uC801\uC758 \uCEE4\uBBA4\uB2C8\uD2F0 \uC11C\uBE44\uC2A4\uB97C \uC774\uC6A9\uD574 \uBCF4\uC138\uC694" }), _jsxs(Block.FlexBox, { "$width": "100%", "$height": "100vh", "$direction": "column", "$alignItems": "center", "$justifyContent": "center", "$gap": "34px", children: [_jsx(Text.TitleMenu100, { children: "\uC601\uD654\uC778 \uD544\uC218!" }), _jsx(Text.TitleMenu300, { children: "\uC601\uD654 \uB9AC\uBDF0 1\uB4F1 \uD50C\uB7AB\uD3FC" }), _jsxs(GapContainer, { "$direction": "column", "$alignItems": "center", children: [_jsx(PickyLogo, { width: 231, height: 83 }), _jsx(StyledText, { children: "\u26A1\uFE0F\uAC04\uD3B8\uB85C\uADF8\uC778\uC73C\uB85C 3\uCD08\uB9CC\uC5D0 \uBE60\uB974\uAC8C \uD68C\uC6D0\uAC00\uC785!" })] }), _jsxs(Block.FlexBox, { "$justifyContent": "center", "$gap": "50px", children: [_jsx(BtnKakao, { onClick: handleKakaoLoginClick, width: 46, cursor: "pointer" }), _jsx(BtnNaver, { onClick: handleNaverLoginClick, width: 46, cursor: "pointer" }), _jsx(BtnGoogle, { onClick: handleGoogleLoginClick, width: 46, cursor: "pointer" })] })] })] }));
}

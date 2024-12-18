import React from "react";
import { css } from "@emotion/react";

const containerStyle = css`
  background-color: #ffffff; // 밝고 깨끗한 배경색
  padding: 40px; // 충분한 패딩
  margin: 40px auto;
  max-width: 800px; // 최대 너비 설정
  border-radius: 12px; // 더 둥근 테두리
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1); // 더 부드러운 그림자
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; // 세련된 글꼴 사용
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const titleStyle = css`
  font-size: 24px; // 크기 증가
  color: #333;
  margin-bottom: 20px; // 여백 증가
  text-align: center;
`;

const textStyle = css`
  line-height: 1.8; // 줄간격 조정
  color: #444; // 색상 조정
  margin-bottom: 30px; // 여백 증가
  text-align: justify; // 양쪽 정렬
  font-size: 16px; // 폰트 사이즈 조정
`;

const highlightStyle = css`
  color: #FF084A;
  font-style: normal;
  font-weight: 400px;
`;

const listStyle = css`
  list-style-position: inside; // 리스트 스타일 위치 조정
  padding-left: 0;
  width: 100%;
  text-align: left;
`;

const listItemStyle = css`
  background-color: #f8f8f8; // 리스트 아이템 배경색
  padding: 15px; // 패딩 증가
  margin-bottom: 10px; // 여백 증가
  border-radius: 8px; // 테두리 둥글게
  border-left: 5px solid #FF084A; // 왼쪽 테두리 강조
  text-align: left; // 텍스트 정렬
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05); // 아이템 그림자 추가
`;

export default function GoogleImageComponent() {
  return (
    <div css={containerStyle}>
      <h2 css={titleStyle}>
        {" "}
        <span css={highlightStyle}>(주) PICKY</span> 개인정보 처리방침
      </h2>
      <div>
        <p css={textStyle}>
          <span css={highlightStyle}>(주) PICKY</span> (이하 ‘회사’라 한다)는
          개인정보 보호법 제30조에 따라 정보주체의 개인 정보를 보호하고 이와
          관련된 고충을 신속하고 원할하게 처리할 수 있도록 하기 위하여 다음과
          같이 개인정보 처리지침을 수립하고 공개합니다.
        </p>
        <h3 css={titleStyle}>제1조(개인정보 처리목적)</h3>
        <p css={textStyle}>
          회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
          개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
          변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등
          필요한 조치를 취할 예정입니다.
        </p>
        <ol css={listStyle}>
          <li css={listItemStyle}>
            1. 홈페이지 회원 가입 및 관리: 회원 가입의사 확인, 회원제 서비스
            제공에 따른 본인확인, 서비스 부정이용 방지, 만 14세 미만 아동의
            개인정보 처리시 법정대리인의 동의여부 확인, 각종 고지, 통지,
            고충처리 등을 목적으로 개인정보를 처리합니다.
          </li>
          <li css={listItemStyle}>
            2. 재화 또는 서비스 제공: 물품배송, 서비스 제공, 계약서 및 청구서
            발송, 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 연령인증, 요금결제 및
            정산, 재권추심 등을 목적으로 개인정보를 처리합니다.
          </li>
          <li css={listItemStyle}>
            3. 고충처리: 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한
            연락, 처리결과 통보 등의 목적으로 개인정보를 처리합니다.
          </li>
        </ol>
      </div>
    </div>
  );
}

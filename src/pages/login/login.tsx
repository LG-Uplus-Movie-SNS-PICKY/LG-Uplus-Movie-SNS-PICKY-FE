import React from "react";

const Login: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "393px",
        padding: "236px 81px 301px 81px",
        flexDirection: "column",
        alignItems: "center",
        gap: "106px",
        border: "1px solid #D9D9D9",
        background: "#FFF",
      }}
    >
      {/* Google Login Button */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "10px 20px",
          background: "#FFF",
          border: "1px solid #D9D9D9",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => alert("Google 로그인 버튼 클릭")}
      >
        <img
          src="/path-to-google-icon.png"
          alt="Google Icon"
          style={{ width: "24px", height: "24px" }}
        />
        Google로 로그인
      </button>

      {/* Naver Login Button */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "10px 20px",
          background: "#03C75A",
          border: "none",
          borderRadius: "4px",
          color: "#FFF",
          cursor: "pointer",
        }}
        onClick={() => alert("Naver 로그인 버튼 클릭")}
      >
        <img
          src="/path-to-naver-icon.png"
          alt="Naver Icon"
          style={{ width: "24px", height: "24px" }}
        />
        네이버로 로그인
      </button>

      {/* Kakao Login Button */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "10px 20px",
          background: "#FEE500",
          border: "none",
          borderRadius: "4px",
          color: "#000",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => alert("Kakao 로그인 버튼 클릭")}
      >
        <img
          src="/path-to-kakao-icon.jpeg"
          alt="Kakao Icon"
          style={{ width: "24px", height: "24px" }}
        />
        카카오로 로그인
      </button>
    </div>
  );
};

export default Login;
import { useNavigate } from "react-router-dom";
import styles from "./index.styles";

function LoginBanner() {
  const navigate = useNavigate();

  return (
    <div css={styles.bannerContainer()} onClick={() => navigate("/login")}>
      <div className="box">
        <h3>
          어떤 작품
          <br />
          좋아하세요?
        </h3>
        <p>
          <span className="underline">로그인</span>하고 PICKY를 즐겨보세요
        </p>
      </div>
    </div>
  );
}

export default LoginBanner;

import styles from "./index.styles";
import MainLogo from "@assets/icons/main_logo.svg?react";

function SplashScreen({ onAnimationEnd }: { onAnimationEnd: () => void }) {
  return (
    // 스플레시 Outer 영역
    <div css={styles.splashContainer()} onAnimationEnd={onAnimationEnd}>
      {/* 스플레시 본 영역 */}
      <div
        style={{
          width: "430px",
          height: "100dvh",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div css={styles.logoAnimation()}>
          <MainLogo width={160} height={80} />
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;

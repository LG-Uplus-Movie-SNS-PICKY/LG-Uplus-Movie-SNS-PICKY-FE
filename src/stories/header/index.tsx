import styles from "./index.styles";

import Logo from "@assets/icons/logo.svg?react";
import ArrowLeft from "@assets/icons/arrow_left.svg?react";
import UesrLogo from "@assets/icons/user.svg?react";

export interface HeaderProps {
  type: "basic" | "login" | "main" | "title";
  label?: string;
  activeBtn?: Array<React.ReactNode>;
}

// Header 스토리 설정
export function Header({ type, label, activeBtn }: HeaderProps) {
  const isLogin: boolean = type !== "login";

  return (
    <header css={styles.headerContainer()}>
      {/* 타입에 따른 로고 상태 변환 */}
      {type === "title" ? (
        <div css={styles.headerTitleBox()}>
          <ArrowLeft />
          <span>{label}</span>
        </div>
      ) : (
        <Logo className="main-logo" />
      )}

      {/* 로그인 상태에 따른 오른쪽 판넬 상태 변환 */}
      <div css={styles.headerActivesBtn(isLogin)}>
        {!isLogin && (
          <>
            <UesrLogo />
            <span>로그인</span>
          </>
        )}

        {!["basic", "login"].includes(type) && (
          <>{activeBtn && activeBtn.map((btn) => btn)}</>
        )}
      </div>
    </header>
  );
}

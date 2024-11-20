import styles from "./index.styles";

import Logo from "@assets/icons/logo.svg?react";
import ArrowLeft from "@assets/icons/arrow_left.svg?react";
import UesrLogo from "@assets/icons/user_circle.svg?react";

export interface HeaderProps {
  type: "basic" | "login" | "main" | "title";
  label?: string;
  activeBtn?: Array<React.ReactNode>;
}

// Header 스토리 설정
export function Header({ type, label, activeBtn }: HeaderProps): JSX.Element {
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

      {/* 로그인 상태에 따른 활성화 버튼 컴포넌트 조건부 렌더링 */}
      <div css={styles.headerActivesBtn(isLogin)}>
        {/* 로그인을 하지 않은 사용자인 경우 */}
        {type === "login" && (
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

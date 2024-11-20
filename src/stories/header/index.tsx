import styles from "./index.styles";

import Logo from "@assets/icons/logo.svg?react";
import ArrowLeft from "@assets/icons/arrow_left.svg?react";
import UesrLogo from "@assets/icons/user.svg?react";

import AddCircle from "@assets/icons/add_circle.svg?react";
import Notification from "@assets/icons/notification.svg?react";
import Search from "@assets/icons/search.svg?react";

const activeBtn = [
  { icon: <AddCircle /> },
  { icon: <Notification /> },
  { icon: <Search /> },
];

export interface HeaderProps {
  type: "basic" | "login" | "main" | "title";
  label?: string;
}

// Header 스토리 설정
export function Header({ type, label }: HeaderProps) {
  const isLogin = type !== "login";

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

        {type === "basic" && (
          <>
            <AddCircle className="active-icon-btn" />
            <Notification className="active-icon-btn" />
            <Search className="active-icon-btn" />
          </>
        )}
      </div>
    </header>
  );
}

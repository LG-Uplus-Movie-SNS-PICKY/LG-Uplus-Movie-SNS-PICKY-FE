import { HeaderConfigReturn, useHeaderConfig } from "@constants/header";
import { isLogin } from "@recoil/atoms/isLoginState";
import { unreadCountState } from "@recoil/atoms/isNotificationState";
import { Header } from "@stories/header";
import { HeaderProps } from "@type/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

// 전역에서 사용할 Header 컴포넌트
function GlobalHeader({ headerType, label, location, navigate }: HeaderProps) {
  const { isLoginState, isAuthUser } = useRecoilValue(isLogin);
  const [activeBtn, setActiveBtn] = useState<HeaderConfigReturn>(undefined);
  const validTypes = ["title", "main", "basic", "login", "admin"];

  const notificationCount = useRecoilValue(unreadCountState);

  const resetLoginState = useResetRecoilState(isLogin);
  const setLoginState = useSetRecoilState(isLogin);

  // 현재 경로에 맞는 type, label, activeBtn 값 할당
  useEffect(() => {
    const headerType = useHeaderConfig(
      isLoginState,
      isAuthUser,
      navigate,
      resetLoginState,
      setLoginState,
      notificationCount
    );
    setActiveBtn(headerType);
  }, [notificationCount, isLoginState, location]);

  // 로그인과 주소에 따라서 헤더가 보이지 않아야 함
  // 주소는 헤더 타입 정의할 때 해놓은 상태
  return (
    <Header
      type={
        validTypes.includes(headerType)
          ? (headerType as "title" | "main" | "basic" | "login" | "admin")
          : undefined
      }
      label={label}
      activeBtn={activeBtn}
    />
  );
}

export default GlobalHeader;

import { HeaderConfigReturn, useHeaderConfig } from "@constants/header";
import { isLogin } from "@recoil/atoms/isLoginState";
import { Header } from "@stories/header";
import { NaviationProps, HeaderProps } from "@type/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

// 전역에서 사용할 Header 컴포넌트
function GlobalHeader({ headerType, label, location, navigate }: HeaderProps) {
  const isLoginState = useRecoilValue(isLogin);
  // const [label, setLabel] = useState<HeaderProps["label"]>(undefined);
  const [activeBtn, setActiveBtn] = useState<HeaderConfigReturn>(undefined);

  // 현재 경로에 맞는 type, label, activeBtn 값 할당
  useEffect(() => {
    const { pathname } = location; // 현재 주소값 가져오기
    const userInfo = JSON.parse(sessionStorage.getItem("user") || "{}");

    // console.log(headerType);

    const headerType = useHeaderConfig(isLoginState.isLoginState, navigate);

    console.log(headerType);
    // console.log(headerType);
    setActiveBtn(headerType);

    // setActiveBtn(headerType.buttons); // 헤더 버튼 지정

    // if (type === "") setType(undefined);
    // else setType(headerType);

    // console.log(userInfo);
    // console.log(pathname);

    // setType(headerType.type); // 헤더 타입 지정
    // setLabel(headerType.label); // 헤더 라벨 지정
  }, [isLoginState, location]);

  // 로그인과 주소에 따라서 헤더가 보이지 않아야 함
  // 주소는 헤더 타입 정의할 때 해놓은 상태
  return <Header type={headerType} label={label} activeBtn={activeBtn} />;
}

export default GlobalHeader;

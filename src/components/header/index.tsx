import { useHeaderConfig } from "@constants/header";
import { Header, HeaderProps } from "@stories/header";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const isLoginTestValue = {
  state: false,
  role: "",
};

// 전역에서 사용할 Header 컴포넌트
function GlobalHeader() {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 주소 가져오기

  const [type, setType] = useState<HeaderProps["type"]>(undefined);
  const [label, setLabel] = useState<HeaderProps["label"]>(undefined);
  const [activeBtn, setActiveBtn] =
    useState<HeaderProps["activeBtn"]>(undefined);

  // 현재 경로에 맞는 type, label, activeBtn 값 할당
  useEffect(() => {
    const { pathname } = location; // 현재 주소값 가져오기
    const headerType = useHeaderConfig(
      pathname,
      isLoginTestValue.state,
      navigate
    );

    setType(headerType.type); // 헤더 타입 지정
    setLabel(headerType.label); // 헤더 라벨 지정
    setActiveBtn(headerType.buttons); // 헤더 버튼 지정
  }, [location]);

  return <Header type={type} label={label} activeBtn={activeBtn} />;
}

export default GlobalHeader;

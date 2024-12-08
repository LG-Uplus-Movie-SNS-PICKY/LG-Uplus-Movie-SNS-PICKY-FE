import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { useHeaderConfig } from "@constants/header";
import { Header } from "@stories/header";
import { useEffect, useState } from "react";
// 전역에서 사용할 Header 컴포넌트
function GlobalHeader({ location, navigate, isLoginTestValue, }) {
    const [type, setType] = useState(undefined);
    const [label, setLabel] = useState(undefined);
    const [activeBtn, setActiveBtn] = useState(undefined);
    // 현재 경로에 맞는 type, label, activeBtn 값 할당
    useEffect(() => {
        const { pathname } = location; // 현재 주소값 가져오기
        const headerType = useHeaderConfig(pathname, isLoginTestValue.state, navigate);
        setType(headerType.type); // 헤더 타입 지정
        setLabel(headerType.label); // 헤더 라벨 지정
        setActiveBtn(headerType.buttons); // 헤더 버튼 지정
    }, [location]);
    return _jsx(Header, { type: type, label: label, activeBtn: activeBtn });
}
export default GlobalHeader;

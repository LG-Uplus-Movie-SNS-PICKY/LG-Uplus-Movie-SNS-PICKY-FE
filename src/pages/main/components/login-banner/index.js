import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import styles from "./index.styles";
/**
 *
 * @returns
 */
function LoginBanner() {
    const navigate = useNavigate();
    return (_jsx("div", { css: styles.bannerContainer(), onClick: () => navigate("/login"), children: _jsxs("div", { className: "box", children: [_jsxs("h3", { children: ["\uC5B4\uB5A4 \uC791\uD488", _jsx("br", {}), "\uC88B\uC544\uD558\uC138\uC694?"] }), _jsxs("p", { children: [_jsx("span", { className: "underline", children: "\uB85C\uADF8\uC778" }), "\uD558\uACE0 PICKY\uB97C \uC990\uACA8\uBCF4\uC138\uC694"] })] }) }));
}
export default LoginBanner;

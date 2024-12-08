import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { Wrapper, IconWrapper, Message, ButtonWrapper, Button, } from "./index.styles";
import NotFound from "@assets/icons/error_message.svg?react";
import SEO from "@components/seo";
export default function NotFoundPage() {
    const navigate = useNavigate();
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { title: "404", description: "\uD398\uC774\uC9C0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }), _jsxs("div", { css: Wrapper, children: [_jsx("div", { css: IconWrapper, children: _jsx(NotFound, {}) }), _jsxs("div", { css: Message, children: [_jsx("h2", { children: "\uC8C4\uC1A1\uD569\uB2C8\uB2E4. \uD604\uC7AC \uD398\uC774\uC9C0\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." }), _jsxs("p", { children: ["\uC874\uC7AC\uD558\uC9C0 \uC54A\uB294 \uC8FC\uC18C\uB97C \uC785\uB825\uD558\uAC70\uB098, ", _jsx("br", {}), " \uC694\uCCAD\uD558\uC2E0 \uD398\uC774\uC9C0\uC758 \uC8FC\uC18C\uAC00 \uBCC0\uACBD, \uC0AD\uC81C\uB418\uC5B4 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."] })] }), _jsxs("div", { css: ButtonWrapper, children: [_jsx("button", { css: Button, onClick: () => navigate("/"), children: "\uBA54\uC778\uC73C\uB85C" }), _jsx("button", { css: Button, onClick: () => navigate(-1), children: "\uC774\uC804\uD398\uC774\uC9C0" })] })] })] }));
}

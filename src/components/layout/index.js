import { jsx as _jsx, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { Flex as MainLayout } from "./index.styles";
import { Flex as Wrapper } from "./index.styles";
import { useLocation, useNavigate } from "react-router-dom";
const isLoginTestValue = {
    state: true,
    role: "user",
};
function Layout({ children }) {
    const navigate = useNavigate();
    const location = useLocation(); // 현재 주소 가져오기
    const isDefaultMargin = !isLoginTestValue.state || isLoginTestValue.role === "admin";
    return (_jsx(_Fragment, { children: _jsx(MainLayout, { position: "relative", direction: "column", align: "center", height: "100vh", children: _jsx(Wrapper, { overflowY: "auto", direction: "column", justify: "flex-start", margin: isDefaultMargin ? "" : "60px 0", backgroundColor: isLoginTestValue.role === "admin" ? "#ffffff" : "", 
                // padding="16px"
                height: "100vh", children: children }) }) }));
}
export default Layout;

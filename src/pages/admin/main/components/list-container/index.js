import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import React from "react";
import styles from "./index.styles";
import ArrowButton from "@assets/icons/dashboard/arrow-btn.svg?react";
import { useNavigate } from "react-router-dom";
function DashboardListItem({ element, title, description, bgColor, boxShadowColor, path, }) {
    const navigate = useNavigate();
    const onClick = (path) => {
        navigate(path);
    };
    return (
    // List Item Container
    _jsxs("div", { css: styles.dashboardListItemContainer(bgColor, boxShadowColor), onClick: () => onClick(path), children: [_jsx("div", { css: styles.dashboardListItemCircle(), children: React.createElement(element) }), _jsxs("div", { css: styles.dashboardListItemInfo(), children: [_jsx("h1", { children: title }), _jsxs("div", { className: "description", children: [description, _jsx(ArrowButton, {})] })] })] }));
}
export default DashboardListItem;

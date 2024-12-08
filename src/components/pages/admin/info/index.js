import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import React from "react";
import styles from "./index.styles";
// 렌더링 되는 컴포넌트
function DashboardInfoContainer({ data }) {
    return (_jsxs("div", { css: styles.container(), children: [_jsx("div", { css: styles.containerTitle(), children: _jsx("h3", { children: data.listTitle }) }), _jsx("div", { className: "line" }), _jsx("div", { css: styles.listContainer(), children: data.listItem &&
                    data.listItem.map((item, idx) => {
                        var _a;
                        return (_jsxs("div", { css: styles.listItemContainer(item.itemBgColor), onClick: item.onClick, children: [React.createElement(item.itemIcon), _jsxs("div", { className: "info-container", children: [_jsx("div", { css: styles.listItemInfo(), children: _jsxs("div", { css: styles.listItemInfoTitle(), children: [_jsx("h3", { className: "titleInfo", children: item.itemTitle }), _jsx("h3", { className: "titleInfo", children: new Intl.NumberFormat("en-US").format((_a = item.itemTotalCount) !== null && _a !== void 0 ? _a : 0) })] }) }), item.subItems && (_jsx("div", { css: styles.listSubItemInfoContainer(), children: item.subItems.map((subItem, idx) => {
                                                var _a;
                                                return (_jsxs("div", { className: "list-sub-item-info", children: [_jsx("h3", { className: "subItemTitle", children: subItem.subItemTitle }), _jsx("h3", { children: new Intl.NumberFormat("en-US").format((_a = subItem.subItemTotalCount) !== null && _a !== void 0 ? _a : 0) })] }, idx));
                                            }) }))] })] }, idx));
                    }) })] }));
}
export default DashboardInfoContainer;

import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import styles from "./index.styles";
// 대시보드 Overview import
import DashboardListItem from "./components/list-container";
import { data as OverviewItems } from "./components/list-container/constant";
import DashboardInfoContainer from "@components/pages/admin/info";
function AdminDashboardPage({ data }) {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { css: styles.dashboardWrapper(), children: [_jsx("h1", { className: "dashboard-title", children: "dashboard" }), _jsx("div", { css: styles.dashboardContainer(), children: OverviewItems &&
                            OverviewItems.map((item, idx) => {
                                return (_jsx(DashboardListItem, { element: item.element, title: item.title, description: item.description, bgColor: item.bgColor, boxShadowColor: item.boxShadowColor, path: item.path }, idx));
                            }) })] }), Array.isArray(data) &&
                data.map((element, idx) => {
                    return _jsx(DashboardInfoContainer, { data: element }, idx);
                })] }));
}
export default AdminDashboardPage;

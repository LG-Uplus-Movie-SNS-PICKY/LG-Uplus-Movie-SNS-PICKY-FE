import { jsx as _jsx, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import DashboardInfoContainer from "@components/pages/admin/info";
function MovieLogManagementPage({ data }) {
    if (Array.isArray(data))
        return null;
    else {
        return _jsx(_Fragment, { children: data && _jsx(DashboardInfoContainer, { data: data }) });
    }
}
export default MovieLogManagementPage;

import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Outlet, Route, Routes } from "react-router-dom";
// import { Admin } from "@pages";
// Pages Import
import AdminDashboardPage from "@pages/admin/main";
// -> Managment Overview Page
import AdminUserManagementPage from "@pages/admin/management/user";
import AdminMovieManagementPage from "@pages/admin/management/movie";
import AdminReviewManagementPage from "@pages/admin/management/review";
import AdminMovieLogManagementPage from "@pages/admin/management/movie-log";
// User Operation Pages Import
// import Admin
import useDashboardData from "@hooks/admin/info";
import { ADMIN_ROUTES, USER_MANAGEMENT_ROUTES } from "@constants/routes/routes";
import UserPermissionOpertionPage from "@pages/admin/operation/user/permission";
import UserReportOpertionPage from "@pages/admin/operation/user/report";
import ReviewReportOpertionPage from "@pages/admin/operation/review/report";
import MovieLogReportOpertionPage from "@pages/admin/operation/movie-log/report";
import UserSuspendedOpertionPage from "@pages/admin/operation/user/suspended";
import ReviewsOpertionPage from "@pages/admin/operation/review/reviews";
import MovieLogsOpertionPage from "@pages/admin/operation/movie-log/movie-logs";
import MovieGenreOpertionPage from "@pages/admin/operation/movie/genres";
import MoviesOpertionPage from "@pages/admin/operation/movie/movies";
import MoviePlaylistOpertionPage from "@pages/admin/operation/movie/playlists";
function ManagementSubLayout() {
    return _jsx(Outlet, {});
}
function AdminLayout() {
    const { listItemData: data } = useDashboardData();
    return (_jsxs(Routes, { children: [_jsx(Route, { path: ADMIN_ROUTES.DASHBOARD, element: _jsx(AdminDashboardPage, { data: data }) }), _jsxs(Route, { path: ADMIN_ROUTES.USER_MANAGEMENT, element: _jsx(ManagementSubLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(AdminUserManagementPage, { data: data[0] }) }), _jsx(Route, { path: USER_MANAGEMENT_ROUTES.PERMISSION, element: _jsx(UserPermissionOpertionPage, {}) }), _jsx(Route, { path: "reports", element: _jsx(UserReportOpertionPage, {}) }), _jsx(Route, { path: "suspended", element: _jsx(UserSuspendedOpertionPage, {}) })] }), _jsxs(Route, { path: ADMIN_ROUTES.MOVIE_MANAGEMENT, element: _jsx(ManagementSubLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(AdminMovieManagementPage, { data: data[1] }) }), _jsx(Route, { path: "genres", element: _jsx(MovieGenreOpertionPage, {}) }), _jsx(Route, { path: "movies", element: _jsx(MoviesOpertionPage, {}) }), _jsx(Route, { path: "playlists", element: _jsx(MoviePlaylistOpertionPage, {}) })] }), _jsxs(Route, { path: ADMIN_ROUTES.REVIEW_MANAGEMENT, element: _jsx(ManagementSubLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(AdminReviewManagementPage, { data: data[2] }) }), _jsx(Route, { path: "reviews", element: _jsx(ReviewsOpertionPage, {}) }), _jsx(Route, { path: "reports", element: _jsx(ReviewReportOpertionPage, {}) })] }), _jsxs(Route, { path: ADMIN_ROUTES.MOVIE_LOG_MANAGEMENT, element: _jsx(ManagementSubLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(AdminMovieLogManagementPage, { data: data[3] }) }), _jsx(Route, { path: "logs", element: _jsx(MovieLogsOpertionPage, {}) }), _jsx(Route, { path: "reports", element: _jsx(MovieLogReportOpertionPage, {}) })] })] }));
}
export default AdminLayout;

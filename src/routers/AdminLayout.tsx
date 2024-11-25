import { Route, Routes } from "react-router-dom";

import AdminDashboardPage from "@pages/admin/main";
import AdminUserManagementPage from "@pages/admin/management/user";
import AdminMovieManagementPage from "@pages/admin/management/movie";
import AdminReviewManagementPage from "@pages/admin/management/review";
import AdminMovieLogManagementPage from "@pages/admin/management/movie-log";
import useDashboardData from "@hooks/admin/info";

import { ADMIN_ROUTES } from "@constants/routes/routes";

function AdminLayout() {
  const { listItemData: data } = useDashboardData();

  return (
    <Routes>
      <Route
        path={ADMIN_ROUTES.DASHBOARD}
        element={<AdminDashboardPage data={data} />}
      />
      <Route
        path={ADMIN_ROUTES.USER_MANAGEMENT}
        element={<AdminUserManagementPage data={data[0]} />}
      />
      <Route
        path={ADMIN_ROUTES.MOVIE_MANAGEMENT}
        element={<AdminMovieManagementPage data={data[1]} />}
      />
      <Route
        path={ADMIN_ROUTES.REVIEW_MANAGEMENT}
        element={<AdminReviewManagementPage data={data[2]} />}
      />
      <Route
        path={ADMIN_ROUTES.MOVIE_LOG_MANAGEMENT}
        element={<AdminMovieLogManagementPage data={data[3]} />}
      />
    </Routes>
  );
}

export default AdminLayout;

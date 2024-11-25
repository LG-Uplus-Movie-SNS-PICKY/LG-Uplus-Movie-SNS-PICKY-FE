import { Outlet, Route, Routes } from "react-router-dom";

import AdminDashboardPage from "@pages/admin/main";
import AdminUserManagementPage from "@pages/admin/management/user";
import AdminMovieManagementPage from "@pages/admin/management/movie";
import AdminReviewManagementPage from "@pages/admin/management/review";
import AdminMovieLogManagementPage from "@pages/admin/management/movie-log";
import useDashboardData from "@hooks/admin/info";

import { ADMIN_ROUTES } from "@constants/routes/routes";
import Home from "@pages/Home";

function ManagementSubLayout() {
  return <Outlet />;
}

function AdminLayout() {
  const { listItemData: data } = useDashboardData();

  return (
    <Routes>
      <Route
        path={ADMIN_ROUTES.DASHBOARD}
        element={<AdminDashboardPage data={data} />}
      />
      {/* <Route
        path={ADMIN_ROUTES.USER_MANAGEMENT}
        element={<AdminUserSubLayout data={data[0]} />}
      /> */}

      <Route
        path={ADMIN_ROUTES.USER_MANAGEMENT}
        element={<ManagementSubLayout />}
      >
        <Route index element={<AdminUserManagementPage data={data[0]} />} />
        <Route path="permissions" element={<Home />} />
        <Route path="reports" element={<Home />} />
        <Route path="suspended" element={<Home />} />
      </Route>

      <Route
        path={ADMIN_ROUTES.MOVIE_MANAGEMENT}
        element={<ManagementSubLayout />}
      >
        <Route index element={<AdminMovieManagementPage data={data[1]} />} />
        <Route path="genres" element={<Home />} />
        <Route path="movies" element={<Home />} />
        <Route path="playlists" element={<Home />} />
      </Route>

      <Route
        path={ADMIN_ROUTES.REVIEW_MANAGEMENT}
        element={<ManagementSubLayout />}
      >
        <Route index element={<AdminReviewManagementPage data={data[2]} />} />
        <Route path="reviews" element={<Home />} />
        <Route path="reports" element={<Home />} />
      </Route>

      <Route
        path={ADMIN_ROUTES.MOVIE_LOG_MANAGEMENT}
        element={<ManagementSubLayout />}
      >
        <Route index element={<AdminMovieLogManagementPage data={data[3]} />} />
        <Route path="logs" element={<Home />} />
        <Route path="reports" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default AdminLayout;

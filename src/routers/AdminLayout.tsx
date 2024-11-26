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

      {/* 사용자 관련 Path 정의 */}
      <Route
        path={ADMIN_ROUTES.USER_MANAGEMENT}
        element={<ManagementSubLayout />}
      >
        <Route index element={<AdminUserManagementPage data={data[0]} />} />
        <Route path="permissions" element={<Home />} />
        <Route path="reports" element={<Home />} />
        <Route path="suspended" element={<Home />} />
      </Route>

      {/* 영화 관련 Path 정의 */}
      <Route
        path={ADMIN_ROUTES.MOVIE_MANAGEMENT}
        element={<ManagementSubLayout />}
      >
        <Route index element={<AdminMovieManagementPage data={data[1]} />} />
        <Route path="genres" element={<Home />} />
        <Route path="movies" element={<Home />} />
        <Route path="playlists" element={<Home />} />
      </Route>

      {/* 한줄평(영화 리뷰) 관련 Path 정의 */}
      <Route
        path={ADMIN_ROUTES.REVIEW_MANAGEMENT}
        element={<ManagementSubLayout />}
      >
        <Route index element={<AdminReviewManagementPage data={data[2]} />} />
        <Route path="reviews" element={<Home />} />
        <Route path="reports" element={<Home />} />
      </Route>

      {/* 무비로그(피드) 관련 Path 정의 */}
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
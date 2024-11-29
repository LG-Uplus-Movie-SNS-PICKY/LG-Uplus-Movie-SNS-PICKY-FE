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
import Home from "@pages/Home";
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
        <Route
          path={USER_MANAGEMENT_ROUTES.PERMISSION}
          element={<UserPermissionOpertionPage />}
        />
        <Route path="reports" element={<UserReportOpertionPage />} />
        <Route path="suspended" element={<UserSuspendedOpertionPage />} />
      </Route>

      {/* 영화 관련 Path 정의 */}
      <Route
        path={ADMIN_ROUTES.MOVIE_MANAGEMENT}
        element={<ManagementSubLayout />}
      >
        <Route index element={<AdminMovieManagementPage data={data[1]} />} />
        <Route path="genres" element={<MovieGenreOpertionPage />} />
        <Route path="movies" element={<MoviesOpertionPage />} />
        <Route path="playlists" element={<MoviePlaylistOpertionPage />} />
      </Route>

      {/* 한줄평(영화 리뷰) 관련 Path 정의 */}
      <Route
        path={ADMIN_ROUTES.REVIEW_MANAGEMENT}
        element={<ManagementSubLayout />}
      >
        <Route index element={<AdminReviewManagementPage data={data[2]} />} />
        <Route path="reviews" element={<ReviewsOpertionPage />} />
        <Route path="reports" element={<ReviewReportOpertionPage />} />
      </Route>

      {/* 무비로그(피드) 관련 Path 정의 */}
      <Route
        path={ADMIN_ROUTES.MOVIE_LOG_MANAGEMENT}
        element={<ManagementSubLayout />}
      >
        <Route index element={<AdminMovieLogManagementPage data={data[3]} />} />
        <Route path="logs" element={<MovieLogsOpertionPage />} />
        <Route path="reports" element={<MovieLogReportOpertionPage />} />
      </Route>
    </Routes>
  );
}

export default AdminLayout;

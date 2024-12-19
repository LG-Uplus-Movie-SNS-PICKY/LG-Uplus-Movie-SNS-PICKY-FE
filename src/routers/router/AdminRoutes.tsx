import AdminPage from "@pages/admin/index";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import useDashboardData from "@hooks/admin/info";

import AdminDashboardPage from "@pages/admin/main";

import AdminUserManagementPage from "@pages/admin/management/user";
import AdminMovieManagementPage from "@pages/admin/management/movie";
import AdminReviewManagementPage from "@pages/admin/management/review";
import AdminMovieLogManagementPage from "@pages/admin/management/movie-log";

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

function AdminRoutes() {
  const { listItemData: data } = useDashboardData();

  return (
    <ProtectedRoute role="admin">
      <Routes>
        <Route path="/" element={<AdminPage />}>
          <Route index element={<AdminDashboardPage data={data} />} />

          {/* 사용자 관리 */}
          <Route
            path="user-management"
            element={<AdminUserManagementPage data={data[0]} />}
          />
          <Route
            path="user-management/permissions"
            element={<UserPermissionOpertionPage />}
          />
          <Route
            path="user-management/reports"
            element={<UserReportOpertionPage />}
          />
          <Route
            path="user-management/suspended"
            element={<UserSuspendedOpertionPage />}
          />

          {/* 영화 관리 */}
          <Route
            path="movie-management"
            element={<AdminMovieManagementPage data={data[1]} />}
          />
          <Route
            path="movie-management/genres"
            element={<MovieGenreOpertionPage />}
          />
          <Route
            path="movie-management/movies"
            element={<MoviesOpertionPage />}
          />
          <Route
            path="movie-management/playlists"
            element={<MoviePlaylistOpertionPage />}
          />

          {/* 리뷰 관리 */}
          <Route
            path="review-management"
            element={<AdminReviewManagementPage data={data[2]} />}
          />
          <Route
            path="review-management/reviews"
            element={<ReviewsOpertionPage />}
          />
          <Route
            path="review-management/reports"
            element={<ReviewReportOpertionPage />}
          />

          {/* 무비로그 관리 */}
          <Route
            path="movie-log-management"
            element={<AdminMovieLogManagementPage data={data[3]} />}
          />
          <Route
            path="movie-log-management/logs"
            element={<MovieLogsOpertionPage />}
          />
          <Route
            path="movie-log-management/reports"
            element={<MovieLogReportOpertionPage />}
          />
        </Route>
      </Routes>
    </ProtectedRoute>
  );
}

export default AdminRoutes;

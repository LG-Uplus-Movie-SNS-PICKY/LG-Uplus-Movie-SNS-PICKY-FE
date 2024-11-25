import { BrowserRouter, Route, Routes } from "react-router-dom";

// 스타일 초기화를 위한 컴포넌트 및 스타일 import
import { Global } from "@emotion/react";
import { globalStyle } from "@styles/global";

// Route import
import Home from "@pages/Home";
import Layout from "@components/layout";
import AdminDashboardPage from "@pages/admin";

function Router() {
  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <Global styles={globalStyle} />
      <Layout>
        <Routes>
          {/* 공개 라우트 */}
          <Route path="/" element={<Home />} />

          {/* 로그인 사용자 라우트 */}

          {/* 관리자 전용 라우트 */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route
            path="/admin/user-management-overview"
            element={<AdminDashboardPage />}
          />
          <Route
            path="/admin/movie-management-overview"
            element={<AdminDashboardPage />}
          />
          <Route
            path="/admin/review-management-overview"
            element={<AdminDashboardPage />}
          />
          <Route
            path="/admin/movie-log-management-overview"
            element={<AdminDashboardPage />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;

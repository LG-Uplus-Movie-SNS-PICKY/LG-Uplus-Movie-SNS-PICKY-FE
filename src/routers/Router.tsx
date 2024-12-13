import { BrowserRouter, Route, Routes } from "react-router-dom";

// 스타일 초기화를 위한 컴포넌트 및 스타일 import
import { Global } from "@emotion/react";
import { globalStyle } from "@styles/global";

// Route import
import Home from "@pages/main";

import Layout from "@components/layout";

import { HelmetProvider } from "react-helmet-async";

import { useEffect } from "react";

import { useSetRecoilState } from "recoil";
import { isLogin } from "@recoil/atoms/isLoginState";
import { isEmpty } from "lodash";
import DomainGoogle from "@pages/google";
import ProtectedRoute from "./router/ProtectedRoute";

// Routes Import
import GuestRouter from "./router/GuestRoutes";
import UserRoutes from "./router/UserRoutes";
import AdminRouter from "./router/AdminRoutes";
import { getCookie } from "@util/cookie";

function Router() {
  const setIsLoginState = useSetRecoilState(isLogin);

  useEffect(() => {
    const user = getCookie("user") || {};

    if (user) {
      setIsLoginState({
        isLoginState: !isEmpty(user),
        isAuthUser: user.isAuthUser,
        isLoginInfo: user.user,
        isLoading: false,
      });
    }
  }, [setIsLoginState]);

  return (
    <HelmetProvider>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Global styles={globalStyle} />

        <Layout>
          <Routes>
            {/* 공개 라우트 - 관리자 접근 X */}
            <Route
              path="/"
              element={
                <ProtectedRoute role="common">
                  <Home />
                </ProtectedRoute>
              }
            />

            {/* 비로그인 사용자 라우트 */}
            <Route path="/auth/*" element={<GuestRouter />} />

            {/* 로그인 사용자 라우트 */}
            <Route path="/*" element={<UserRoutes />} />

            {/* 관리자 사용자 라우트 */}
            <Route path="/admin/*" element={<AdminRouter />} />

            {/* 도메인 */}
            <Route path="/google626ac0bef2281c75.html" element={<DomainGoogle />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default Router;

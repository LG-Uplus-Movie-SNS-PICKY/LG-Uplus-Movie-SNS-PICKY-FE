import { BrowserRouter, Route, Routes } from "react-router-dom";

// 스타일 초기화를 위한 컴포넌트 및 스타일 import
import { Global } from "@emotion/react";
import { globalStyle } from "@styles/global";

// Route import
import Home from "@pages/main";

import Login from "@pages/login";
import Signup from "@pages/signup";
import CallbackNaver from "@pages/login/naver/oauth";
import CallbackGoogle from "@pages/login/google/oauth";
import CallbackKakao from "@pages/login/kakao/oauth";

import Layout from "@components/layout";

import { HelmetProvider } from "react-helmet-async";
import NotFoundPage from "@pages/not-found";
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
import { useSyncLoginState } from "@recoil/selectors/useAuthorization";

function Router() {
  // useSyncLoginState();
  const setIsLoginState = useSetRecoilState(isLogin);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");

    if (!isEmpty(user)) {
      setIsLoginState({
        isLoginState: true,
        isAuthUser: user.isAuthUser,
        isLoginInfo: user,
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
            {/* 공개 라우트 */}
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

            {/* 에러 페이지 */}
            <Route path="/*" element={<NotFoundPage />} />

            {/* 도메인 */}
            <Route path="/domain" element={<DomainGoogle />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default Router;

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Feed, Comment } from "@pages";

// 스타일 초기화를 위한 컴포넌트 및 스타일 import
import { Global } from "@emotion/react";
import { globalStyle } from "@styles/global";

// Route import
import Home from "@pages/main";
import Login from "@pages/login";
import Signup from "@pages/signup";
import Search from "@pages/search";
import Layout from "@components/layout";
import MovieDetail from "@pages/movie-detail";
import MovieReviews from "@pages/movie-detail/reviews";
import My from "@pages/my";
import Edit from "@pages/edit";
import Recommendations from "@pages/recommendations";
import CallbackNaver from "@pages/login/naver/oauth";
import CallbackGoogle from "@pages/login/google/oauth";
import CallbackKakao from "@pages/login/kakao/oauth";
import Post from "@pages/social/post";
import { HelmetProvider } from "react-helmet-async";
import PickyPage from "@pages/picky/main";
import PickyGenreDetailPage from "@pages/picky/genre-detail";
import NotificationPage from "@pages/notification";
import NotFoundPage from "@pages/not-found";
import PostModify from "@pages/social/modify";
import { useEffect } from "react";

import { useSetRecoilState } from "recoil";
import { isLogin } from "@recoil/atoms/isLoginState";
import { isEmpty } from "lodash";
import DomainGoogle from "@pages/google";
import ProtectedRoute from "./router/ProtectedRoute";

// Routes Import
import AdminRouter from "./router/AdminRouter";

function Router() {
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
            <Route
              path="/auth/sign-in"
              element={
                <ProtectedRoute role="guest">
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/auth/sign-in/oauth2/naver/callback"
              element={
                <ProtectedRoute role="guest">
                  <CallbackNaver />
                </ProtectedRoute>
              }
            />
            <Route
              path="/auth/sign-in/oauth2/google/callback"
              element={
                <ProtectedRoute role="guest">
                  <CallbackGoogle />
                </ProtectedRoute>
              }
            />
            <Route
              path="/auth/sign-in/oauth2/kakao/callback"
              element={
                <ProtectedRoute role="guest">
                  <CallbackKakao />
                </ProtectedRoute>
              }
            />
            <Route
              path="/auth/sign-up"
              element={
                <ProtectedRoute role="guest">
                  <Signup />
                </ProtectedRoute>
              }
            />

            {/* 로그인 사용자 - Movie 관련 라우트 (영화 상세) */}
            <Route
              path="/movie/:id"
              element={
                <ProtectedRoute role="user">
                  <MovieDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movie/:id/review"
              element={
                <ProtectedRoute role="user">
                  <MovieReviews />
                </ProtectedRoute>
              }
            />

            {/* 로그인 사용자 - User 관련 라우트 */}
            <Route
              path="/user/:nickname"
              element={
                <ProtectedRoute role="user">
                  <My />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/:nickname/edit"
              element={
                <ProtectedRoute role="user">
                  <Edit />
                </ProtectedRoute>
              }
            />

            {/* 로그인 사용자 - Movie Log 관련 라우트 */}
            <Route
              path="/movie-log"
              element={
                <ProtectedRoute role="user">
                  <Feed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movie-log/detail/:boardId"
              element={
                <ProtectedRoute role="user">
                  <Comment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movie-log/add"
              element={
                <ProtectedRoute role="user">
                  <Post />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movie-log/edit/:boardId"
              element={
                <ProtectedRoute role="user">
                  <PostModify />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/movie-log/edit" element={<EditFeed />} /> */}

            {/* 로그인 사용자 - 이외 라우트 */}
            <Route
              path="/picky"
              element={
                <ProtectedRoute role="user">
                  <PickyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/genre/:genreId"
              element={
                <ProtectedRoute role="user">
                  <PickyGenreDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute role="user">
                  <NotificationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recommendation"
              element={
                <ProtectedRoute role="user">
                  <Recommendations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute role="user">
                  <Search />
                </ProtectedRoute>
              }
            />

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

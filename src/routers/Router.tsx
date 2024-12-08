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
import AdminLayout from "./AdminLayout";
import MovieDetail from "@pages/movie-detail";
import MovieReviews from "@pages/movie-detail/reviews";
import My from "@pages/my";
import Edit from "@pages/edit";
import Recommendations from "@pages/recommendations";
import Callback from "@pages/login/oauth";
import Post from "@pages/social/post";
import { HelmetProvider } from "react-helmet-async";
import PickyPage from "@pages/picky/main";
import PickyGenreDetailPage from "@pages/picky/genre-detail";
import NotificationPage from "@pages/notification";
import NotFoundPage from "@pages/not-found";

function Router() {
  return (
    <HelmetProvider>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Global styles={globalStyle} />

        <Layout>
          <Routes>
            {/* 공개 라우트 */}
            <Route path="/" element={<Home />} />

            {/* 비로그인 사용자 라우트 */}
            <Route path="/auth/sign-in" element={<Login />} />
            <Route
              path="/auth/sign-in/oauth2/callback"
              element={<Callback />}
            />
            <Route path="/auth/sign-up" element={<Signup />} />

            {/* 로그인 사용자 - Movie 관련 라우트 (영화 상세) */}
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/movie/:id/review" element={<MovieReviews />} />

            {/* 로그인 사용자 - User 관련 라우트 */}
            <Route path="/user/:nickname" element={<My />} />
            <Route path="/user/:nickname/edit" element={<Edit />} />

            {/* 로그인 사용자 - Movie Log 관련 라우트 */}
            <Route path="/movie-log" element={<Feed />} />
            <Route path="/movie-log/detail" element={<Comment />} />
            <Route path="/movie-log/add" element={<Post />} />
            {/* <Route path="/movie-log/edit" element={<EditFeed />} /> */}

            {/* 로그인 사용자 - 이외 라우트 */}
            <Route path="/picky" element={<PickyPage />} />
            <Route path="/genre/:genreId" element={<PickyGenreDetailPage />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/recommendation" element={<Recommendations />} />
            <Route path="/search" element={<Search />} />

            {/* 관리자 전용 라우트 */}
            <Route path="/admin/*" element={<AdminLayout />} />

            {/* 에러 페이지 */}
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default Router;

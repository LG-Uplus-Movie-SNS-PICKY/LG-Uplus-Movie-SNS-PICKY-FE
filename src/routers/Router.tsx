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
import Recommendations from "@pages/recommendations";
import Edit from "@pages/social/edit";
import Callback from "@pages/login/oauth";
import Post from "@pages/social/post";
import EditFeed from "@pages/social/edit";
import { HelmetProvider } from "react-helmet-async";
import PickyPage from "@pages/picky/main";
import PickyGenreDetailPage from "@pages/picky/genre-detail";
import NotificationPage from "@pages/notification";
import ErrorPage from "@pages/error";

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
            <Route path="/error" element={<ErrorPage />} />

            {/* 비로그인 사용자 라우트 */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login/oauth2/callback" element={<Callback />} />

            {/* 로그인 사용자 - Movie 관련 라우트 (영화 상세) */}
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/movie/:id/reviews" element={<MovieReviews />} />

            {/* 로그인 사용자 - User 관련 라우트 */}
            <Route path="/my" element={<My />} />
            <Route path="/user-profile/edit" element={<Edit />} />

            {/* 로그인 사용자 - Movie Log 관련 라우트 */}
            <Route path="/movie-log" element={<Feed />} />
            <Route path="/comment" element={<Comment />} />
            <Route path="/add-feed" element={<Post />} />
            <Route path="/edit-post" element={<EditFeed />} />

            {/* 로그인 사용자 - 이외 라우트 */}
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/picky" element={<PickyPage />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/genre/:genreId" element={<PickyGenreDetailPage />} />

            {/* 관리자 전용 라우트 */}
            <Route path="/admin/*" element={<AdminLayout />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default Router;

import React from "react";

import ProtectedRoute from "./ProtectedRoute";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";

import My from "@pages/my";
import Edit from "@pages/edit";

import MovieDetail from "@pages/movie-detail";
import MovieReviews from "@pages/movie-detail/reviews";

import { Feed, Comment } from "@pages";
import Post from "@pages/social/post";
import PostModify from "@pages/social/modify";

import PickyPage from "@pages/picky/main";
import PickyGenreDetailPage from "@pages/picky/genre-detail";
import Search from "@pages/search";
import Recommendations from "@pages/recommendations";
import NotificationPage from "@pages/notification";

import NotFoundPage from "@pages/not-found";

function UserRoutes() {
  return (
    <ProtectedRoute role="user">
      <Routes>
        {/* Profile 관련 Routes */}
        <Route path="user/*">
          <Route index element={<Navigate to="/" />} />
          <Route path=":nickname" element={<My />} />
          <Route path=":nickname/edit" element={<Edit />} />
        </Route>

        {/* Movie 관련 Routes */}
        <Route path="movie/*">
          <Route index element={<Navigate to="/" />} />
          <Route path=":id" element={<MovieDetail />} />
          <Route path=":id/review" element={<MovieReviews />} />
        </Route>

        {/* Movie Log 관련 Routes */}
        <Route path="movie-log/*">
          <Route index element={<Feed />} />
          <Route path="detail/:boardId" element={<Comment />} />
          <Route path="add" element={<Post />} />
          <Route path="edit/:boardId" element={<PostModify />} />
        </Route>

        {/* 중첩 라우트를 사용하지 않아도 되는 이외 Routes */}
        <Route path="picky" element={<PickyPage />} />
        <Route path="genre/:genreId" element={<PickyGenreDetailPage />} />
        <Route path="notification" element={<NotificationPage />} />
        <Route path="recommendation" element={<Recommendations />} />
        <Route path="search" element={<Search />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ProtectedRoute>
  );
}

export default UserRoutes;

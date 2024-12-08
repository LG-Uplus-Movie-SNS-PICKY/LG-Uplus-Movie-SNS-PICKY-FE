import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
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
    return (_jsx(HelmetProvider, { children: _jsxs(BrowserRouter, { future: { v7_relativeSplatPath: true, v7_startTransition: true }, children: [_jsx(Global, { styles: globalStyle }), _jsx(Layout, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/auth/sign-in", element: _jsx(Login, {}) }), _jsx(Route, { path: "/auth/sign-in/oauth2/callback", element: _jsx(Callback, {}) }), _jsx(Route, { path: "/auth/sign-up", element: _jsx(Signup, {}) }), _jsx(Route, { path: "/movie/:id", element: _jsx(MovieDetail, {}) }), _jsx(Route, { path: "/movie/:id/review", element: _jsx(MovieReviews, {}) }), _jsx(Route, { path: "/user/:nickname", element: _jsx(My, {}) }), _jsx(Route, { path: "/user/:nickname/edit", element: _jsx(Edit, {}) }), _jsx(Route, { path: "/movie-log", element: _jsx(Feed, {}) }), _jsx(Route, { path: "/movie-log/detail", element: _jsx(Comment, {}) }), _jsx(Route, { path: "/movie-log/add", element: _jsx(Post, {}) }), _jsx(Route, { path: "/picky", element: _jsx(PickyPage, {}) }), _jsx(Route, { path: "/genre/:genreId", element: _jsx(PickyGenreDetailPage, {}) }), _jsx(Route, { path: "/notification", element: _jsx(NotificationPage, {}) }), _jsx(Route, { path: "/recommendation", element: _jsx(Recommendations, {}) }), _jsx(Route, { path: "/search", element: _jsx(Search, {}) }), _jsx(Route, { path: "/admin/*", element: _jsx(AdminLayout, {}) }), _jsx(Route, { path: "/*", element: _jsx(NotFoundPage, {}) })] }) })] }) }));
}
export default Router;

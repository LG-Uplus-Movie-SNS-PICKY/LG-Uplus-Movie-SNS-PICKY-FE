import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Feed, Post, Comment } from "@pages";

// 스타일 초기화를 위한 컴포넌트 및 스타일 import
import { Global } from "@emotion/react";
import { globalStyle } from "@styles/global";

// Route import
import Home from "@pages/Home";
import Login from "@pages/login";
import Signup from "@pages/signup";
import Layout from "@components/layout";
import AdminLayout from "./AdminLayout";

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
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-feed" element={<Post />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;

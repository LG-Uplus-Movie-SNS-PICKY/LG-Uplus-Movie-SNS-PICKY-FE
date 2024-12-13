import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Routes, Navigate } from "react-router-dom";

import Login from "@pages/login";
import Signup from "@pages/signup";
import CallbackNaver from "@pages/login/naver/oauth";
import CallbackGoogle from "@pages/login/google/oauth";
import CallbackKakao from "@pages/login/kakao/oauth";

function GuestRoutes() {
  return (
    <ProtectedRoute role="guest">
      <Routes>
        <Route index element={<Navigate to="/auth/sign-in" />} />
        <Route path="sign-in" element={<Login />} />
        <Route
          path="sign-in/oauth2/naver/callback"
          element={<CallbackNaver />}
        />
        <Route
          path="sign-in/oauth2/google/callback"
          element={<CallbackGoogle />}
        />
        <Route
          path="sign-in/oauth2/kakao/callback"
          element={<CallbackKakao />}
        />
        <Route path="sign-up" element={<Signup />} />
      </Routes>
    </ProtectedRoute>
  );
}

export default GuestRoutes;

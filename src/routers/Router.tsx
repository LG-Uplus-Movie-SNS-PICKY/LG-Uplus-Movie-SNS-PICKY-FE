import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup/";
import Login from "../pages/Login/";
import { Global } from "@emotion/react";
import { globalStyle } from "@styles/global";

// Route import
import Home from "@pages/Home";
import Layout from "@components/layout";
import AdminLayout from "./AdminLayout";

function Router() {
  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <Global styles={globalStyle} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

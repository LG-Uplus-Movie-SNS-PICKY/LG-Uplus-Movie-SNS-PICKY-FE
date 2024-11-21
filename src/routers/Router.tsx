import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/signup";
import Login from "../pages/login/login";
import { Global } from "@emotion/react";
import { globalStyle } from "../styles/global";

function Router() {
  return (
    <BrowserRouter>
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

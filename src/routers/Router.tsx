import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

// import { Main } from "@pages";

import { Global } from "@emotion/react";
import { globalStyle } from "../styles/global";

function Router() {
  return (
    <BrowserRouter>
      <Global styles={globalStyle} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

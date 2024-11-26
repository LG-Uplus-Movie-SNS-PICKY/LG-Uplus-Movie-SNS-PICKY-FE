import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import MovieReviews from "../pages/MovieDetail/Reviews";

// import { Main } from "@pages";

import { Global } from "@emotion/react";
import { globalStyle } from "../styles/global";

function Router() {
  return (
    <BrowserRouter>
      <Global styles={globalStyle} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/movie/:id/reviews" element={<MovieReviews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

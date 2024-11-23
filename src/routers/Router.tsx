import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

// import { Main } from "@pages";

import { Global } from "@emotion/react";
import { globalStyle } from "../styles/global";
import { useEffect } from "react";
import axios from "axios";

function Router() {
  useEffect(() => {
    async function test() {
      await axios
        .get("http://localhost:5173/user")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    test();
  }, []);

  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <Global styles={globalStyle} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

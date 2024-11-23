import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Global } from "@emotion/react";
import { globalStyle } from "@styles/global";

import Home from "@pages/Home";
import Layout from "@components/layout";

function Router() {
  return (
    <BrowserRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
    >
      <Global styles={globalStyle} />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default Router;

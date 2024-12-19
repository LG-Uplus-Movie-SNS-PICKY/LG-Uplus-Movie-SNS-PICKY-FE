import { RecoilRoot } from "recoil";
import Router from "./routers/Router";
import QueryProvider from "./provider/QueryProvider";
import NotificationSSE from "@hooks/notification/connect";

import { HelmetProvider } from "react-helmet-async";
import NotificationBadge from "@hooks/notification/connect/badge";

import RecoilNexus from "recoil-nexus";
import { useEffect, useState } from "react";
import SplashScreen from "@components/splash-screen";

function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleAnimationEnd = () => {
    setIsSplashVisible(false); // 애니메이션 완료 후 스플래시 숨김
  };

  return (
    <HelmetProvider>
      <RecoilRoot>
        <RecoilNexus />
        <QueryProvider>
          {/* 스플레시 스크린 */}
          {isSplashVisible && (
            <SplashScreen onAnimationEnd={handleAnimationEnd} />
          )}
          {!isSplashVisible && (
            <>
              <NotificationSSE />
              <NotificationBadge />
              <Router />
            </>
          )}
        </QueryProvider>
      </RecoilRoot>
    </HelmetProvider>
  );
}

export default App;

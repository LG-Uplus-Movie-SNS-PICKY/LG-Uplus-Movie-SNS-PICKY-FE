import { RecoilRoot } from "recoil";
import Router from "./routers/Router";
import QueryProvider from "./provider/QueryProvider";
import NotificationSSE from "@hooks/notification/connect";

import { HelmetProvider } from "react-helmet-async";
import NotificationBadge from "@hooks/notification/connect/badge";

import RecoilNexus from "recoil-nexus";

function App() {
  return (
    <HelmetProvider>
      <RecoilRoot>
        <RecoilNexus />
        <QueryProvider>
          {/* 알림 연결 */}
          <NotificationSSE />

          {/* 읽지 않은 알림 수 전역 상태 관리 */}
          <NotificationBadge />

          <Router />
        </QueryProvider>
      </RecoilRoot>
    </HelmetProvider>
  );
}

export default App;

import { RecoilRoot } from "recoil";
import Router from "./routers/Router";
import QueryProvider from "./provider/QueryProvider";
import NotificationSSE from "@hooks/notification/connect";

import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <RecoilRoot>
        <QueryProvider>
          <NotificationSSE />
          <Router />
        </QueryProvider>
      </RecoilRoot>
    </HelmetProvider>
  );
}

export default App;

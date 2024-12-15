import { RecoilRoot } from "recoil";
import Router from "./routers/Router";
import QueryProvider from "./provider/QueryProvider";
import NotificationSSE from "@hooks/notification/connect";

function App() {
  return (
    <RecoilRoot>
      <QueryProvider>
        <NotificationSSE />
        <Router />
      </QueryProvider>
    </RecoilRoot>
  );
}

export default App;

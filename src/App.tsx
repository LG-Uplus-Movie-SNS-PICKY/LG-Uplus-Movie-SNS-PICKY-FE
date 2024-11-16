import { RecoilRoot } from "recoil";
import Router from "./routers/Router";
import QueryProvider from "./provider/QueryProvider";

function App() {
  return (
    <RecoilRoot>
      <QueryProvider>
        <Router />
      </QueryProvider>
    </RecoilRoot>
  );
}

export default App;

import { RecoilRoot } from "recoil";
import Router from "./routers/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;

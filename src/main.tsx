import { createRoot } from "react-dom/client";
import App from "./App";

async function enableMocking() {
  // 개발환경이 아닐 경우 Mock Server Worker 실행 X
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  // Mock Server Worker 실행
  const { worker } = await import("./mocks/browser");

  return worker.start({
    onUnhandledRequest: (req, print) => {
      if (!req.url.startsWith("/api/")) {
        return;
      }

      print.warning();
    },
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    // {/* <StrictMode> */}
    <App />
    // {/* </StrictMode> */}
  );
});

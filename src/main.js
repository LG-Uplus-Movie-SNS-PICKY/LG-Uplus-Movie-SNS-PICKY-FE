var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { createRoot } from "react-dom/client";
import App from "./App";
function enableMocking() {
    return __awaiter(this, void 0, void 0, function* () {
        // 개발환경이 아닐 경우 Mock Server Worker 실행 X
        if (process.env.NODE_ENV !== "development") {
            return;
        }
        // Mock Server Worker 실행
        const { worker } = yield import("./mocks/browser");
        return worker.start({
            onUnhandledRequest: (req, print) => {
                if (!req.url.startsWith("/api/")) {
                    return;
                }
                print.warning();
            },
        });
    });
}
enableMocking().then(() => {
    createRoot(document.getElementById("root")).render(
    // {/* <StrictMode> */}
    _jsx(App, {})
    // {/* </StrictMode> */}
    );
});

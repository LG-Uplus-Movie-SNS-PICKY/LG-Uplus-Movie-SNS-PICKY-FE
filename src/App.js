import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { RecoilRoot } from "recoil";
import Router from "./routers/Router";
import QueryProvider from "./provider/QueryProvider";
function App() {
    return (_jsx(RecoilRoot, { children: _jsx(QueryProvider, { children: _jsx(Router, {}) }) }));
}
export default App;

import { jsx as _jsx, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import Lottie from "lottie-react";
import LoadingLottie from "@assets/lottie/loadingLottie.json";
function Loading() {
    return (_jsx(_Fragment, { children: _jsx(Lottie, { animationData: LoadingLottie }) }));
}
export default Loading;

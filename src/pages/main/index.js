var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import SEO from "@components/seo";
import FamousMovie from "./components/famous-movie";
import GenresMovie from "./components/genres-movie";
import LoginBanner from "./components/login-banner";
import RecommendMovieSlider from "./components/recommend-slider";
import { useEffect } from "react";
import axios from "axios";
const isLogin = false;
function Main() {
    useEffect(() => {
        const fetch = () => __awaiter(this, void 0, void 0, function* () {
            yield axios
                .patch(`${import.meta.env.VITE_SERVER_URL}/api/v1/linereview/6`, {
                context: "와우 판타스틱",
                isSpoiler: false,
            }, {
                headers: {
                    Authorization: "123",
                },
            })
                .then((res) => console.log(res.data));
        });
        fetch();
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { title: "PICKY", description: "PICKY\uB294 \uC601\uD654 \uB9AC\uBDF0\uC640 \uC815\uBCF4\uB97C \uD55C\uACF3\uC5D0\uC11C \uD655\uC778\uD558\uACE0, \uC601\uD654 \uD32C\uB4E4\uC744 \uC704\uD55C \uCD5C\uC801\uC758 \uCEE4\uBBA4\uB2C8\uD2F0 \uC11C\uBE44\uC2A4\uC785\uB2C8\uB2E4." }), isLogin ? _jsx(RecommendMovieSlider, {}) : _jsx(LoginBanner, {}), _jsx(FamousMovie, { isLogin: isLogin }), _jsx(GenresMovie, {})] }));
}
export default Main;

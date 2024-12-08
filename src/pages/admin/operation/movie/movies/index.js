import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import RegistMovieSection from "./components/register-section";
import TotalMoviesSection from "./components/total-movies";
import styles from "./index.styles";
function MoviesOpertionPage() {
    return (_jsx(_Fragment, { children: _jsxs("div", { css: styles.wrapper(), children: [_jsx(RegistMovieSection, {}), _jsx(TotalMoviesSection, {})] }) }));
}
export default MoviesOpertionPage;

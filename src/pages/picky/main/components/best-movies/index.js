import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import FamousMovie from "@pages/main/components/famous-movie";
function BsetMovieSection({ bestMovie }) {
    return _jsx(FamousMovie, { isLogin: true });
}
export default BsetMovieSection;

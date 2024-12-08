var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { GENRE_EMOJI } from "@constants/genre";
import styles from "./index.styles";
/** Primary UI component for user interaction */
export function GenreTabButton(_a) {
    var { primary = false, btnType = "Rectangle", backgroundColor, label, emoji, padding } = _a, props = __rest(_a, ["primary", "btnType", "backgroundColor", "label", "emoji", "padding"]);
    const mode = (btnType === "Rectangle" || btnType === "Round") && primary;
    return (_jsxs("button", Object.assign({ type: "button", css: [
            styles.storybookButton(),
            btnType === "Rectangle"
                ? styles.storybookGenreRectangle(mode)
                : styles.storybookGenreRound(mode, padding),
        ], style: { backgroundColor } }, props, { children: [emoji && GENRE_EMOJI[emoji], label] })));
}

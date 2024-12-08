import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import Search from "@assets/icons/search_small.svg?react";
import AddCriclBtn from "@assets/icons/add_circle_small.svg?react";
import styles from "./index.styles";
function MovieGenreOpertionPage() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { css: styles.filterContainer(), children: [_jsx("div", { css: styles.filter(), children: _jsxs("div", { className: "add-genre-btn", children: [_jsx(AddCriclBtn, {}), " \uC7A5\uB974 \uCD94\uAC00"] }) }), _jsxs("form", { css: styles.search(), onSubmit: (event) => event.preventDefault(), children: [_jsx("input", { type: "text" }), _jsx("button", { type: "submit", children: _jsx(Search, {}) })] })] }), _jsxs("table", { css: styles.tableContainer(), children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "genre" }), _jsx("th", { children: "Included Movies" }), _jsx("th", {})] }) }), _jsx("tbody", { children: _jsxs("tr", { children: [_jsx("td", { css: styles.tableBodyItem(), children: _jsx("span", { className: "title", children: "Actions" }) }), _jsx("td", { css: styles.tableBodyItem(), children: "2,312" }), _jsx("td", { css: styles.tableBodyItem(), children: _jsxs("div", { className: "buttons", children: [_jsx("button", { children: "\uC218\uC815" }), _jsx("button", { children: "\uC0AD\uC81C" })] }) })] }) })] })] }));
}
export default MovieGenreOpertionPage;

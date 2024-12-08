import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import SEO from "@components/seo";
import styles from "./index.styles";
import { genresSelector } from "@recoil/selectors/genresSelector";
import React from "react";
import { useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
function PickyGenreDetailPage() {
    const loadable = useRecoilValueLoadable(genresSelector);
    const { genreId } = useParams(); // 장르 아이디 param
    // 전역 상태로 관리되고 있는 장르와 일치하는 텍스트를 가져온다.
    if (loadable.state === "loading")
        return _jsx(_Fragment, {});
    if (loadable.state === "hasError")
        return _jsx(_Fragment, {});
    const genres = loadable.contents.data;
    const currentGenre = genres.find((genre) => genre.id === Number(genreId));
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { title: "PICKY: GENRES", description: "\uC0AC\uC6A9\uC790\uB2D8\uC774 \uC6D0\uD558\uB294 \uC7A5\uB974\uC758 \uC601\uD654\uB97C \uCC3E\uC544\uBCF4\uC138\uC694", url: `http://localhost:5173/genres/${genreId}` }), _jsx("div", { css: styles.title(), children: _jsx("h3", { children: currentGenre.name }) }), _jsx("section", { css: styles.movies(), children: _jsx("div", { children: Array.from({ length: 10 }, (_, idx) => (_jsx(React.Fragment, { children: _jsxs("div", { css: styles.movieCard(), children: [_jsx("img", { src: "https://image.tving.com/ntgs/contents/CTC/caim/CAIM1160/ko/20240920/0520/M000289333.jpg/dims/resize/F_webp,400" }), _jsx("span", { className: "alt-text", children: "asdsda" })] }) }, idx))) }) })] }));
}
export default PickyGenreDetailPage;

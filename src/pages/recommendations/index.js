import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { MovieItem } from "@stories/movie-item";
import { containerStyle, headerStyle, titleStyle, highlightStyle, subtitleStyle, movieContainerStyle, movieWrapperStyle, headerWrapperStyle, } from "./index.styles";
import SEO from "@components/seo";
export default function MovieRecommendationPage() {
    const username = "최우진";
    const navigate = useNavigate();
    const movies = [
        {
            id: 1,
            type: "rate",
            src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
            title: "타이타닉",
            name: "타이타닉",
        },
        {
            id: 2,
            type: "rate",
            src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
            title: "인사이드 아웃 2",
            name: "인사이드 아웃 2",
        },
        {
            id: 3,
            type: "rate",
            src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
            title: "어바웃 타임",
            name: "어바웃 타임",
        },
    ];
    const handleMovieClick = (id) => {
        navigate(`/movie/${id}`);
    };
    return (_jsxs(_Fragment, { children: [_jsx(SEO, { title: "PICKY: RECOMMENDATION", description: "\uC0AC\uC6A9\uC790\uB2D8\uC5D0\uAC8C \uCD94\uCC9C\uD558\uB294 PICKY \uC601\uD654 \uBAA9\uB85D\uB4E4\uC744 \uD655\uC778\uD574\uBCF4\uC138\uC694", url: "http://location:5173/recommendation" }), _jsxs("div", { css: containerStyle, children: [_jsx("div", { css: headerWrapperStyle, children: _jsxs("header", { css: headerStyle, children: [_jsxs("h1", { css: titleStyle, children: ["\uD83E\uDDF8 PICKY\uAC00 ", _jsx("span", { css: highlightStyle, children: "\uAE4C\uD0C8\uC2A4\uB7FD\uAC8C" }), " \uACE8\uB77C\uB0B8 \uB9DE\uCDA4\uD615 AI \uC601\uD654 \uCD94\uCC9C"] }), _jsxs("h2", { css: subtitleStyle, children: [_jsx("b", { children: username }), "\uB2D8\uC774 \uC120\uD638\uD558\uB294 \uC7A5\uB974\uC758 \uC791\uD488\uB4E4"] })] }) }), _jsx("div", { css: movieContainerStyle, children: [...Array(4)].map((_, rowIndex) => (_jsx("div", { css: movieWrapperStyle, children: movies.map((movie, index) => (_jsx("div", { onClick: () => handleMovieClick(movie.id), style: { cursor: "pointer" }, children: _jsx(MovieItem, { type: "rate", src: movie.src, title: movie.title, name: movie.name }) }, `${rowIndex}-${index}`))) }, rowIndex))) })] })] }));
}

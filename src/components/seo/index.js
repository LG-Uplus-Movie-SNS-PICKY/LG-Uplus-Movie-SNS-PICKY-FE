import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Helmet } from "react-helmet-async";
function SEO({ title = "PICKY", description, image, url }) {
    const defaultImage = "/src/assets/images/logo.png";
    const defaultURL = "http://localhost:5173";
    return (_jsxs(Helmet, { children: [_jsx("title", { children: title }), _jsx("meta", { property: "og:type", content: "website" }), _jsx("meta", { property: "og:site_name", content: "PICKY" }), _jsx("meta", { property: "og:title", content: title }), description && _jsx("meta", { property: "og:description", content: description }), _jsx("meta", { property: "og:image", content: image || defaultImage }), _jsx("meta", { property: "og:url", content: url || defaultURL }), _jsx("meta", { property: "kakao:title", content: title }), description && (_jsx("meta", { property: "kakao:description", content: description })), _jsx("meta", { property: "kakao:image", content: image || defaultImage }), _jsx("meta", { property: "twitter:card", content: "summary" }), _jsx("meta", { property: "twitter:site", content: "PICKY" }), _jsx("meta", { property: "twitter:title", content: title }), description && (_jsx("meta", { property: "twitter:description", content: description })), _jsx("meta", { property: "twitter:image", content: image || defaultImage }), _jsx("meta", { property: "twitter:url", content: url || defaultURL })] }));
}
export default SEO;

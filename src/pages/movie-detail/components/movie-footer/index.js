import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { FooterContainer, FooterItem, FooterTitle, FooterContent } from './index.styles';
const MovieFooter = ({ year, production, age, genre }) => {
    return (_jsxs(FooterContainer, { children: [_jsxs(FooterItem, { children: [_jsx(FooterTitle, { children: "\uC81C\uC791 \uC5F0\uB3C4" }), _jsx(FooterContent, { children: year })] }), _jsxs(FooterItem, { children: [_jsx(FooterTitle, { children: "\uC81C\uC791\uC0AC" }), _jsx(FooterContent, { children: production })] }), _jsxs(FooterItem, { children: [_jsx(FooterTitle, { children: "\uC5F0\uB839 \uB4F1\uAE09" }), _jsxs(FooterContent, { children: [age, "\uC138"] })] }), _jsxs(FooterItem, { children: [_jsx(FooterTitle, { children: "\uC7A5\uB974" }), _jsx(FooterContent, { children: genre })] })] }));
};
export default MovieFooter;

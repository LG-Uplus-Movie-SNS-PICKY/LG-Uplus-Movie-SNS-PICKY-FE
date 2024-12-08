import { jsx as _jsx } from "@emotion/react/jsx-runtime";
const Emoji = ({ src, alt, width = "12px", height = "12px", }) => {
    return (_jsx("img", { src: src, alt: alt, style: { width, height } }));
};
export default Emoji;

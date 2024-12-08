import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useRef, useState } from "react";
import styles from "./index.styles";
import Camera from "@assets/icons/camera.svg?react";
function BasicImageComponent({ file }) {
    return _jsx("img", { src: URL.createObjectURL(file), alt: file.name });
}
function BasicType({ access }) {
    const [file, setFile] = useState([]);
    const inputFileRef = useRef(null);
    // input type=file 파일 업로드 시 onChange 이벤트 핸들러 발생
    const handleChangeFile = (event) => {
        const files = event.target.files;
        if (files === null || files === void 0 ? void 0 : files.length) {
            // input accept 속성값을 통해 이미지의 확장자를 제한시켰기 때문에 따로 예외 상황 처리 불필요
            // 또한, multiple 기본값을 통해 이미지 하나만 선택 가능
            setFile([files[0]]);
        }
    };
    return (
    // File Input Container
    _jsx("div", { css: styles.fileInputContainer(file.length !== 0), onClick: () => { var _a; return (_a = inputFileRef.current) === null || _a === void 0 ? void 0 : _a.click(); }, children: _jsxs("div", { children: [_jsx("input", { type: "file", id: "fileInput", accept: access, ref: inputFileRef, style: { display: "none" }, onChange: handleChangeFile }), file.length > 0 && _jsx(BasicImageComponent, { file: file[0] }), !file.length && (_jsxs(_Fragment, { children: [_jsx(Camera, {}), _jsx("span", { className: "label", children: "\uC0AC\uC9C4 \uCD94\uAC00" })] }))] }) }));
}
export default BasicType;

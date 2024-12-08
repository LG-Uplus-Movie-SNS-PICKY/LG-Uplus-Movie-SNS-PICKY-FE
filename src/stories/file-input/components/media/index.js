import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useRef, useState } from "react";
import styles from "./index.styles";
import AddCircle from "@assets/icons/add_circle_media.svg?react";
import MediaFileSlider from "./slider";
function MediaType({ access }) {
    const [mediaFiles, setMediaFiles] = useState([]); // 업로드 된 파일 정보를 나타내는 상태 변수
    const inputFileRef = useRef(null);
    // input type=file 파일 업로드 시 onChange 이벤트 핸들러 발생
    const handleChangeFile = (event) => {
        const { target } = event; // 이벤트가 발생한 Target만 디스트럭쳐링 문법을 통해 정보를 가져옴
        const videoLength = (files) => {
            return files.filter((file) => file.type === "video/mp4").length;
        };
        // 파일이 정상적으로 존재할 경우
        if (target.files) {
            const files = Array.from(target.files); // 유사 배열 객체인 FileList를 배열로 전달 -> [File {}, File {}, ...]로 변환
            // 예외 처리 #1. 이미지와 영상의 총합이 5개 이상인 경우 (현재 파일 개수 + 새로 추가한 파일 개수)
            // 예외 처리 #2. 업로드한 비디오 개수가 2개 이상인 경우 (현재 비디오 개수 + 새로 추가한 비디오 개수)
            const totalFiles = mediaFiles.length + files.length;
            const totalVideo = videoLength(mediaFiles) + videoLength(files);
            if (totalFiles > 5 || totalVideo > 2) {
                alert("이미지와 영상은 최대 5개, 영상은 2개까지 가능합니다.");
                return;
            }
            // 예외 처리 #3. 영상 용량 제한(개당 10MB)
            const largeVideo = files.filter((file) => file.size > 10 * 1024 * 1024).length;
            if (largeVideo) {
                alert("업로드 가능한 영상의 크기는 10MB 이하입니다.");
                return;
            }
            // 모든 예외에 통과한 경우 -> 이전 파일 + 새로운 파일 합치기
            setMediaFiles((prev) => [...prev, ...files]);
        }
    };
    // input file 삭제
    const handleDeleteFile = (deleteIdx) => {
        setMediaFiles([...mediaFiles.filter((_, idx) => idx !== deleteIdx)]);
    };
    return (_jsx("div", { css: styles.container(mediaFiles.length > 0), onClick: () => {
            var _a;
            // 업로드 된 파일이 없을 경우에만 클릭 가능
            if (!mediaFiles.length) {
                (_a = inputFileRef.current) === null || _a === void 0 ? void 0 : _a.click();
            }
        }, children: _jsxs("div", { children: [_jsx("input", { type: "file", id: "fileInput", accept: access, ref: inputFileRef, style: { display: "none" }, onChange: handleChangeFile, multiple: true }), !mediaFiles.length && (_jsxs(_Fragment, { children: [_jsx("span", { className: "label", children: "\uC0AC\uC9C4/\uC601\uC0C1\uC744 \uCD94\uAC00\uD574 \uC8FC\uC138\uC694." }), _jsx(AddCircle, {})] })), mediaFiles.length > 0 && (_jsx(MediaFileSlider, { files: mediaFiles, inputRef: inputFileRef, handleDeleteFile: handleDeleteFile }))] }) }));
}
export default MediaType;

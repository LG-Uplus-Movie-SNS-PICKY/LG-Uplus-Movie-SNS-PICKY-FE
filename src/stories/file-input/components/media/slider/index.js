import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import AddCircle from "@assets/icons/add_circle.svg?react";
import CancleCircleBtn from "@assets/icons/cancle_icon.svg?react";
import styles from "./index.styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useRef } from "react";
function MediaFileSlider({ files, inputRef, handleDeleteFile, }) {
    const swiperRef = useRef(null);
    const videoRefs = useRef([]);
    // 슬라이더 변경 시 영상일 경우 자동 재생
    const handleActiveIndexChange = () => {
        const swiper = swiperRef.current;
        if (swiper) {
            // 모든 비디오 일시 정지 (현재 영역의 비디오만 재생하기 위함)
            videoRefs.current.forEach((video) => {
                if (video) {
                    video.pause();
                }
            });
            // 활성화된 슬라이드에서 비디오 재생
            const activeSlide = swiper.slides[swiper.activeIndex];
            const video = activeSlide === null || activeSlide === void 0 ? void 0 : activeSlide.querySelector("video");
            if (video) {
                video.play();
            }
        }
    };
    // Swiper 렌더링 이후 첫 번째 슬라이드가 비디오 파일인 경우 자동 재생
    useEffect(() => {
        // Type이 Media일 경우에만 서브 작업 실행
        if (files.length > 0 && swiperRef.current) {
            const firstSlide = swiperRef.current.slides[swiperRef.current.activeIndex];
            const video = firstSlide === null || firstSlide === void 0 ? void 0 : firstSlide.querySelector("video");
            if (video) {
                video.play();
            }
        }
    }, [files]);
    return (
    /** */
    _jsxs(Swiper, { slidesPerView: "auto", spaceBetween: 10, direction: "horizontal", freeMode: true, modules: [FreeMode, Mousewheel], mousewheel: {
            forceToAxis: true,
        }, css: styles.swiper(), onSwiper: (swiper) => (swiperRef.current = swiper), onActiveIndexChange: handleActiveIndexChange, children: [files.map((file, idx) => {
                const fileURL = URL.createObjectURL(file); // 업로드 한 파일의 임시 URL 생성
                const isVideo = file.type.startsWith("video/"); // 업로드 한 파일이 영상인지 확인
                return (_jsxs(SwiperSlide, { children: [_jsx("button", { onClick: () => handleDeleteFile(idx), children: _jsx(CancleCircleBtn, {}) }), !isVideo && _jsx("img", { src: fileURL, alt: `privew-${file.name}` }), isVideo && (_jsx("video", { src: fileURL, ref: (el) => {
                                if (el !== null) {
                                    videoRefs.current[idx] = el;
                                }
                            }, muted: true, children: "\uC9C0\uC6D0\uB418\uC9C0 \uC54A\uB294 \uBE44\uB514\uC624 \uD615\uC2DD\uC785\uB2C8\uB2E4." }))] }));
            }), _jsx(SwiperSlide, { className: "add-circle", children: _jsx(AddCircle, { onClick: () => { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.click(); } }) })] }));
}
export default MediaFileSlider;

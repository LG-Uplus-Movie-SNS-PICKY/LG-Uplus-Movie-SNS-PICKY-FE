import AddCircle from "@assets/icons/add_circle.svg?react";
import CancleCircleBtn from "@assets/icons/cancle_icon.svg?react";

import styles from "./index.styles";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useRef } from "react";

interface MediaFileSliderProps {
  files: File[];
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  handleDeleteFile: (idx: number) => void;
}

function MediaFileSlider({
  files,
  inputRef,
  handleDeleteFile,
}: MediaFileSliderProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

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
      const video = activeSlide?.querySelector("video");

      if (video) {
        video.play();
      }
    }
  };

  // Swiper 렌더링 이후 첫 번째 슬라이드가 비디오 파일인 경우 자동 재생
  useEffect(() => {
    // Type이 Media일 경우에만 서브 작업 실행
    if (files.length > 0 && swiperRef.current) {
      const firstSlide =
        swiperRef.current.slides[swiperRef.current.activeIndex];
      const video = firstSlide?.querySelector("video");

      if (video) {
        video.play();
      }
    }
  }, [files]);

  return (
    /** */
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={10}
      direction={"horizontal"}
      freeMode={true}
      modules={[FreeMode, Mousewheel]}
      mousewheel={{
        forceToAxis: true,
      }}
      css={styles.swiper()}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onActiveIndexChange={handleActiveIndexChange}
    >
      {/* File Item -> Slider Imtes */}
      {files.map((file, idx) => {
        const fileURL = URL.createObjectURL(file); // 업로드 한 파일의 임시 URL 생성
        const isVideo = file.type.startsWith("video/"); // 업로드 한 파일이 영상인지 확인

        return (
          <SwiperSlide>
            <button onClick={() => handleDeleteFile(idx)}>
              <CancleCircleBtn />
            </button>

            {!isVideo && <img src={fileURL} alt={`privew-${file.name}`} />}
            {isVideo && (
              <video
                src={fileURL}
                ref={(el) => {
                  if (el !== null) {
                    videoRefs.current[idx] = el;
                  }
                }}
                muted
              >
                지원되지 않는 비디오 형식입니다.
              </video>
            )}
          </SwiperSlide>
        );
      })}

      {/* 업로드한 파일이 최대 5개가 아닌 경우 */}
      <SwiperSlide className="add-circle">
        <AddCircle onClick={() => inputRef.current?.click()} />
      </SwiperSlide>
    </Swiper>
  );
}

export default MediaFileSlider;

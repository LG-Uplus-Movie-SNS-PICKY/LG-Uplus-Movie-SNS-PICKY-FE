import { useEffect, useRef, useState } from "react";

import Camera from "@assets/icons/camera.svg?react";
import CancleCircleBtn from "@assets/icons/cancle_icon.svg?react";
import AddCircleBtn from "@assets/icons/add_circle.svg?react";

// Swiper Lib Import
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./index.styles";

// 컴포넌트 Props 타입 정의
export interface FileInputProps {
  type: "basic" | "media";
}

interface BasicImageComponentProps {
  file: File;
  inputTag?: HTMLInputElement;
}

function BasicImageComponent({ file, inputTag }: BasicImageComponentProps) {
  return <img src={URL.createObjectURL(file)} alt={file.name} />;
}

export function FileInput({ type }: FileInputProps): JSX.Element {
  const defaultAcceptFileExtension = "image/jpg, image/jpeg";

  const [selectFile, setSelectFile] = useState<File[]>([]);

  const swiperRef = useRef<SwiperInstance | null>(null);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  // input type=file 파일 업로드 시 onChange 이벤트 핸들러 발생
  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement; // 타입 단언

    function videoLenght(files: File[]) {
      return files.filter((file) => {
        return file.type === "video/mp4";
      }).length;
    }

    // 타입 가드 -> 파일 존재 여부
    if (target.files) {
      const files = Array.from(target.files); // 유사 배열 객체인 FileList를 배열로 전달 -> [File {}, File {}, ...]로 변환

      // #1. File Input -> Basic 타입
      if (type === "basic" && files.length) {
        // input accept 속성값을 통해 이미지의 확장자를 제한시켰기 때문에 따로 예외 상황 처리 불필요
        // 또한, multiple 값을 통해 애초에 이미지 하나만 선택 가능
        setSelectFile([files[0]]);
      }

      // #2. File Input -> Media 타입
      else {
        // 2-1. 이미지와 영상의 총합이 5개 이상일 경우 (현재 파일의 개수 + 새로 추가한 파일의 개수)
        // 2-2. 업로드한 비디오 개수가 2개 이상인 경우
        const totalFiles = selectFile.length + files.length;
        const totalVideos = videoLenght(selectFile) + videoLenght(files);
        if (totalFiles > 5 || totalVideos > 2) {
          alert(
            "이미지와 동영상 총합은 최대 5개, 동영상은 2개까지 가능합니다."
          );
          return;
        }

        // 2-3. 동영상의 용량 제한(개당 -> 10MB)
        const largeVideo = files.filter((file) => {
          return file.size > 10 * 1024 * 1024;
        }).length;

        if (largeVideo) {
          alert("업로드 가능한 동영상 용량은 10MB 이하입니다.");
          return;
        }

        // 이전 파일 + 새로운 파일
        setSelectFile((prev) => [...prev, ...files]);
      }
    }
  };

  // input file 삭제
  const handleDeleteFile = (deleteIdx: number) => {
    setSelectFile([...selectFile.filter((_, idx) => idx !== deleteIdx)]);
  };

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
    if (type === "media") {
      if (selectFile.length > 0 && swiperRef.current) {
        const firstSlide =
          swiperRef.current.slides[swiperRef.current.activeIndex];
        const video = firstSlide?.querySelector("video");

        if (video) {
          video.play();
        }
      }
    }
  }, [selectFile]);

  return (
    // File Input Container
    <div
      css={styles.fileInputContainer(selectFile.length !== 0, type === "media")}
      onClick={() => {
        switch (type) {
          case "basic":
            inputFileRef.current?.click();
            break;
          case "media":
            if (!selectFile.length) {
              inputFileRef.current?.click();
            }
            break;
        }
      }}
    >
      <div>
        {/* Image 화면 미리보기 영역 */}
        <input
          type="file"
          id="fileInput"
          accept={
            // 타입이 basic일 경우 이미지 확장자만 업로드 가능 (JPG, JPEG)
            // 타입일 media일 경우 이미지 확장자 + 비디오 업로드 가능
            type === "basic"
              ? defaultAcceptFileExtension
              : `${defaultAcceptFileExtension}, video/mp4`
          }
          ref={inputFileRef}
          style={{ display: "none" }}
          multiple={type === "basic" ? false : true}
          onChange={handleChangeFile}
        />

        {/* File의 정보가 없을 경우 */}
        {!selectFile.length && <Camera />}

        {/* Type이 basic일 경우 */}
        {selectFile.length && type === "basic" ? (
          <BasicImageComponent file={selectFile[0]} />
        ) : null}

        {/* Type이 media일 경우 */}
        {selectFile.length && type === "media" ? (
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={10}
            direction={"horizontal"}
            freeMode={true}
            modules={[FreeMode, Mousewheel]}
            mousewheel={true}
            css={styles.swiperContainer()}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onActiveIndexChange={handleActiveIndexChange}
          >
            {selectFile.map((file, idx) => {
              const fileURL = URL.createObjectURL(file); // 파일의 URL을 생성한다.
              const isVideo = file.type.startsWith("video/"); // 파일이 video일 경우

              return (
                <SwiperSlide key={idx}>
                  <button onClick={() => handleDeleteFile(idx)}>
                    <CancleCircleBtn />
                  </button>

                  {isVideo ? (
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
                  ) : (
                    <img src={fileURL} alt={`privew-${file.name}`} />
                  )}
                </SwiperSlide>
              );
            })}

            {/* 선택한 파일이 5개 이하일 경우 더 추가할 수 있도록 해줌 */}
            {selectFile.length < 5 && (
              <SwiperSlide className="add-circle">
                <AddCircleBtn onClick={() => inputFileRef.current?.click()} />
              </SwiperSlide>
            )}
          </Swiper>
        ) : null}

        {/* Image 라벨 영역 */}
        {!selectFile.length && (
          <span className="label">
            {type === "basic" ? "사진 추가" : "사진/동영상 추가"}
          </span>
        )}
      </div>
    </div>
  );
}

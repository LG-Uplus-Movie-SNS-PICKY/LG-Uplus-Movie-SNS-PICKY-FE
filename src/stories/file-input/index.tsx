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
import MediaType from "./components/media";

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

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  // input type=file 파일 업로드 시 onChange 이벤트 핸들러 발생
  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files?.length) {
      // input accept 속성값을 통해 이미지의 확장자를 제한시켰기 때문에 따로 예외 상황 처리 불필요
      // 또한, multiple 기본값을 통해 이미지 하나만 선택 가능
      setSelectFile([files[0]]);
    }
  };

  return type === "basic" ? (
    // File Input Container
    <div
      css={styles.fileInputContainer(selectFile.length !== 0)}
      onClick={() => {
        switch (type) {
          case "basic":
            inputFileRef.current?.click();
            break;
        }
      }}
    >
      <div>
        {/* Image 화면 미리보기 영역 */}
        <input
          type="file"
          id="fileInput"
          accept={defaultAcceptFileExtension}
          ref={inputFileRef}
          style={{ display: "none" }}
          onChange={handleChangeFile}
        />

        {/* Type이 basic일 경우 */}
        {selectFile.length > 0 && <BasicImageComponent file={selectFile[0]} />}

        {/* File의 정보가 없을 경우 */}
        {!selectFile.length && (
          <>
            <Camera />
            <span className="label">사진 추가</span>
          </>
        )}
      </div>
    </div>
  ) : (
    <MediaType access={`${defaultAcceptFileExtension}, video/mp4`} />
  );
}

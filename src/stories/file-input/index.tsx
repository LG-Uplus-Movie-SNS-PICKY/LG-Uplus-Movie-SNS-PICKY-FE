import { MouseEvent, useRef, useState } from "react";
import Camera from "@assets/icons/camera.svg?react";

import styles from "./index.styles";

// 컴포넌트 Props 타입 정의
export interface FileInputProps {
  type: "basic" | "media";
}

// useState() 객체 상태 정의
interface SelectImage {
  path: string | null;
  name: string;
}

export function FileInput({ type }: FileInputProps): JSX.Element {
  const defaultAcceptFileExtension = "image/png, image/jpg, image/jpeg";

  const [selectImage, setSelectImage] = useState<SelectImage>({
    path: null,
    name: "",
  });

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleChangeImageFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement; // event.target의 DOM Node를 HTMLInputElement 타입으로 단언

    // 타입 가드 -> target.files이 있을 경우
    if (target.files) {
      console.log(target.files);
      const file = target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectImage({
          path: typeof reader.result === "string" ? reader.result : null, // string | null
          name: file.name,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    // File Input Container
    <div
      css={styles.fileInputContainer()}
      onClick={() => {
        if (inputFileRef.current) inputFileRef.current.click();
      }}
    >
      <div>
        {/* Image 화면 미리보기 영역 */}
        <input
          type="file"
          id="fileInput"
          accept={
            // 타입이 basic일 경우 이미지 확장자만 업로드 가능 (PNG, JPG, JPEG)
            // 타입일 media일 경우 이미지 확장자 + 비디오 업로드 가능
            type === "basic"
              ? defaultAcceptFileExtension
              : `${defaultAcceptFileExtension}, video/*`
          }
          ref={inputFileRef}
          style={{ display: "none" }}
          multiple={type === "basic" ? false : true}
          onChange={handleChangeImageFile}
        />
        {!selectImage.path && <Camera />}
        {selectImage.path && (
          <img src={selectImage.path} alt={selectImage.name} />
        )}

        {/* Image 라벨 영역 */}
        {!selectImage.path && (
          <span className="label">
            {type === "basic" ? "사진 추가" : "사진/동영상 추가"}
          </span>
        )}
      </div>
    </div>
  );
}

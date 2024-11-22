import { MouseEvent, useEffect, useRef, useState } from "react";
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
  const [selectFile, setSelectFile] = useState<File[]>([]);

  const [selectImage, setSelectImage] = useState<SelectImage>({
    path: null,
    name: "",
  });

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  // const handleChangeFile = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const target = event.target as HTMLInputElement; // event.target의 DOM Node를 HTMLInputElement 타입으로 단언

  //   // 타입 가드 -> target.files이 있을 경우
  //   if (target.files) {
  //     const file = target.files[0];

  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setSelectImage({
  //         path: typeof reader.result === "string" ? reader.result : null, // string | null
  //         name: file.name,
  //       });
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // };

  // input type=file 파일 업로드 시 onChange 이벤트 핸들러 발생
  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement; // 타입 단언

    // 타입 가드 -> 파일 존재 여부
    if (target.files) {
      const files = Array.from(target.files); // 유사 배열 객체인 FileList를 배열로 전달 -> [File {}, File {}, ...]로 변환

      // 이미지를 한 개만 받을 수 있는 basic 타입일 경우
      if (type === "basic") {
        // input accept 속성값을 통해 이미지의 확장자를 제한시켰기 때문에 따로 예외 상황 처리 불필요
        // 또한, multiple 값을 통해 애초에 이미지 하나만 선택 가능
        setSelectFile([files[0]]);
      } else {
        // 이미지와 영상을 여러 개 받을 수 있는 media 타입일 경우

        // 현재 등록된 파일 중 이미지와 영상을 분류
        const currentImageFile = selectFile.filter((file) =>
          file.type.startsWith("image/")
        );

        const currentVideoFile = selectFile.filter(
          (file) => file.type === "video/mp4"
        );

        // 새로 등록된 파일 중 이미지와 영상을 분류
        const newImageFiles = files.filter((file) =>
          file.type.startsWith("image/")
        );

        const newVideoFiles = files.filter((file) => file.type === "video/mp4");

        // 기존 이미지, 비디오 파일과 추가한 파일의 개수의 총합
        const totalFiles =
          currentImageFile.length + currentVideoFile.length + files.length;

        // 영상 개수
        const totalNewVideos = currentVideoFile.length + newVideoFiles.length;

        // 파일 개수 제한 확인
        if (totalFiles > 5 || totalNewVideos > 2) {
          alert(
            "이미지와 동영상 총합은 최대 5개, 동영상은 2개까지 가능합니다."
          );
          return;
        }

        // 동영상 용량 제한 확인
        const largeVideos = newVideoFiles.filter(
          (video) => video.size > 10 * 1024 * 1024
        );
        if (largeVideos.length) {
          alert("업로드 가능한 동영상 용량은 10MB 이하입니다.");
          return;
        }

        setSelectFile((prev) => {
          return [...prev, ...files];
        });
      }
    }
  };

  useEffect(() => {
    console.log(selectFile);
  }, [selectFile]);

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
              : `${defaultAcceptFileExtension}, video/mp4`
          }
          ref={inputFileRef}
          style={{ display: "none" }}
          multiple={type === "basic" ? false : true}
          onChange={handleChangeFile}
        />
        {!selectImage.path && <Camera />}
        {selectImage.path && (
          <></>
          // <img src={selectImage.path} alt={selectImage.name} />
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

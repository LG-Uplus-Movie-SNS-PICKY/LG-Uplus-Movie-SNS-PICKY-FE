import { useRef, useState } from "react";
import styles from "./index.styles";

import Camera from "@assets/icons/camera.svg?react";

// 미디어 타입 컴포넌트 props 종류
interface BasicTypeProps {
  access: string; // input file에 업로드 할 수 있는 확장자 정보
}

interface BasicImageComponentProps {
  file: File;
  inputTag?: HTMLInputElement;
}

function BasicImageComponent({ file }: BasicImageComponentProps) {
  return <img src={URL.createObjectURL(file)} alt={file.name} />;
}

function BasicType({ access }: BasicTypeProps) {
  const [file, setFile] = useState<File[]>([]);

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  // input type=file 파일 업로드 시 onChange 이벤트 핸들러 발생
  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files?.length) {
      // input accept 속성값을 통해 이미지의 확장자를 제한시켰기 때문에 따로 예외 상황 처리 불필요
      // 또한, multiple 기본값을 통해 이미지 하나만 선택 가능
      setFile([files[0]]);
    }
  };

  return (
    // File Input Container
    <div
      css={styles.fileInputContainer(file.length !== 0)}
      onClick={() => inputFileRef.current?.click()}
    >
      <div>
        {/* Image 화면 미리보기 영역 */}
        <input
          type="file"
          id="fileInput"
          accept={access}
          ref={inputFileRef}
          style={{ display: "none" }}
          onChange={handleChangeFile}
        />

        {/* Type이 basic일 경우 */}
        {file.length > 0 && <BasicImageComponent file={file[0]} />}

        {/* File의 정보가 없을 경우 */}
        {!file.length && (
          <>
            <Camera />
            <span className="label">사진 추가</span>
          </>
        )}
      </div>
    </div>
  );
}

export default BasicType;

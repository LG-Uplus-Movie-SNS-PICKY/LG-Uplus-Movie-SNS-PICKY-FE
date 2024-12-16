import { useRef, useState } from "react";
import styles from "./index.styles";

import AddCircle from "@assets/icons/add_circle_media.svg?react";
import MediaFileSlider from "./slider";

// 미디어 타입 컴포넌트 props 종류
interface MediaTypeProps {
  access: string; // input file에 업로드 할 수 있는 확장자 정보
  mediaFiles?: File[];
  setMediaFiles?: React.Dispatch<React.SetStateAction<File[]>>;
}

function MediaType({ access, mediaFiles, setMediaFiles }: MediaTypeProps) {
  if (!mediaFiles || !setMediaFiles) return null;

  // const [mediaFiles, setMediaFiles] = useState<File[]>([]); // 업로드 된 파일 정보를 나타내는 상태 변수
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  // input type=file 파일 업로드 시 onChange 이벤트 핸들러 발생
  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event; // 이벤트가 발생한 Target만 디스트럭쳐링 문법을 통해 정보를 가져옴

    const videoLength = (files: File[]): number => {
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
      const largeVideo = files.filter(
        (file) => file.size > 10 * 1024 * 1024
      ).length;

      if (largeVideo) {
        alert("업로드 가능한 영상의 크기는 10MB 이하입니다.");
        return;
      }

      // 모든 예외에 통과한 경우 -> 이전 파일 + 새로운 파일 합치기
      setMediaFiles((prev) => [...prev, ...files]);
    }
  };

  // input file 삭제
  const handleDeleteFile = (deleteIdx: number) => {
    setMediaFiles([...mediaFiles.filter((_, idx) => idx !== deleteIdx)]);
  };

  return (
    <div
      css={styles.container(mediaFiles.length > 0)}
      onClick={() => {
        // 업로드 된 파일이 없을 경우에만 클릭 가능
        if (!mediaFiles.length) {
          inputFileRef.current?.click();
        }
      }}
    >
      {/* 아이콘 + 텍스트 */}
      <div>
        <input
          type="file"
          id="fileInput"
          accept={access}
          ref={inputFileRef}
          style={{ display: "none" }}
          onChange={handleChangeFile}
          multiple
        />

        {/* 업로드 된 파일이 없을 경우 */}
        {!mediaFiles.length && (
          <>
            <span className="label">사진/영상을 추가해 주세요.</span>
            <AddCircle />
          </>
        )}

        {/* 업로드 된 파일이 있을 경우 */}
        {mediaFiles.length > 0 && (
          <MediaFileSlider
            files={mediaFiles}
            inputRef={inputFileRef}
            handleDeleteFile={handleDeleteFile}
          />
        )}
      </div>
    </div>
  );
}

export default MediaType;

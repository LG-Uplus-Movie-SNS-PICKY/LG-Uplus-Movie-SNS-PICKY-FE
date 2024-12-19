import MediaType from "./components/media";
import BasicType from "./components/basic";

// 컴포넌트 Props 타입 정의
export interface FileInputProps {
  type: "basic" | "media";
  mediaFiles?: File[];
  setMediaFiles?: React.Dispatch<React.SetStateAction<File[]>>;
}

export function FileInput({
  type,
  mediaFiles,
  setMediaFiles,
}: FileInputProps): JSX.Element {
  const defaultAcceptFileExtension = "image/jpg, image/jpeg";

  return type === "basic" ? (
    <BasicType access={defaultAcceptFileExtension} />
  ) : (
    <MediaType
      access={`${defaultAcceptFileExtension}, video/mp4`}
      mediaFiles={mediaFiles && mediaFiles}
      setMediaFiles={setMediaFiles && setMediaFiles}
    />
  );
}

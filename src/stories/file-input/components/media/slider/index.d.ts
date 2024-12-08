import "swiper/css";
import "swiper/css/pagination";
interface MediaFileSliderProps {
    files: File[];
    inputRef: React.MutableRefObject<HTMLInputElement | null>;
    handleDeleteFile: (idx: number) => void;
}
declare function MediaFileSlider({ files, inputRef, handleDeleteFile, }: MediaFileSliderProps): import("@emotion/react/jsx-runtime").JSX.Element;
export default MediaFileSlider;

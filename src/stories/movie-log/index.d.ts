import "swiper/css";
import "swiper/css/pagination";
export interface BoardContentTypes {
    [key: string]: unknown;
    board_content_id: number;
    board_content_url: string;
    board_content_type: "Photo" | "Video";
}
interface MovieLogProps {
    boardContent: BoardContentTypes[];
}
export declare function MovieLog({ boardContent }: MovieLogProps): JSX.Element;
export {};

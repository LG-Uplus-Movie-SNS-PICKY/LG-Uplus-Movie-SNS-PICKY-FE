// Swiper Lib Import
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import styles from "./index.styles";

export interface BoardContentTypes {
  [key: string]: unknown; // 지정한 값 이외의 정보가 올 경우
  board_content_id: number;
  board_content_url: string;
  board_content_type: "Photo" | "Video";
}

interface MovieLogProps {
  boardContent: BoardContentTypes[];
}

export function MovieLog({ boardContent }: MovieLogProps): JSX.Element {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={4}
      direction="horizontal"
      modules={[Pagination, Mousewheel]}
      pagination={{
        dynamicBullets: true,
      }}
      mousewheel={{
        forceToAxis: true,
      }}
      css={styles.swiper()}
    >
      {boardContent.map((content, idx) => (
        <SwiperSlide key={content.board_content_id}>
          <img
            src={content.board_content_url}
            alt={content.board_content_id.toString()}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

// slidesPerView={"auto"}
// spaceBetween={10}
// direction={"horizontal"}
// freeMode={true}
// modules={[FreeMode, Mousewheel]}
// mousewheel={{
//   forceToAxis: true,
// }}
// css={styles.swiperContainer()}

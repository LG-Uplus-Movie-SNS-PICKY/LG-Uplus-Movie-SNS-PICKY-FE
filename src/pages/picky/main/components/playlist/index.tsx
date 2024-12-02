import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./index.styles";

function PlayListSection() {
  return (
    <div css={styles.container()}>
      {/* Playlist Data JSX Element Mapping */}
      <div css={styles.playlistCard()}>
        <h3>Playlist Title</h3>
        {/* Playlist Items Slider Mapping */}
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={10}
          direction={"horizontal"}
          freeMode={true}
          modules={[FreeMode, Mousewheel]}
          mousewheel={{
            forceToAxis: true,
          }}
          css={styles.swiperContainer()}
        ></Swiper>
      </div>
    </div>
  );
}

export default PlayListSection;

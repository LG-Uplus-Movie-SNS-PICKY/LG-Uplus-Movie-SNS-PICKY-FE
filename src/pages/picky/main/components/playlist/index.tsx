import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./index.styles";
import { PLAYLIST } from "./constants";
import { MovieItem } from "@stories/movie-item";

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
        >
          {PLAYLIST[0].movie_playlist_item.map((item) => (
            <SwiperSlide key={item.movie_id}>
              <MovieItem
                type="basic"
                src={`https://image.tmdb.org/t/p/original${item.movie_poster_url}`}
                title={item.movie_title}
                name={item.movie_title}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default PlayListSection;

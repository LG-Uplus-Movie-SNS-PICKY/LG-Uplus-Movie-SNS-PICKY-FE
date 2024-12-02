import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./index.styles";
import { PLAYLIST } from "./constants";
import { MovieItem } from "@stories/movie-item";
import { useEffect } from "react";
import axios from "axios";

// 리액트 쿼리 queryFn
async function fetchMovies(pageParam: number) {
  const { data } = await axios.get(
    `/api/movie/playlist?page=${pageParam}&limit=3`
  );
  return data;
}

function PlayListSection() {
  const handleClick = async () => {
    const response = await axios.get("/api/movie/playlist");
    console.log(response.data);
  };

  return (
    <div css={styles.container()} onClick={handleClick}>
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

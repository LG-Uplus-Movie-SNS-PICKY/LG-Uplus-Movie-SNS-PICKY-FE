import styles from "./index.styles";

import { GENRE_EMOJI } from "@constants/genre";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { useRecoilValueLoadable } from "recoil";
import { genresSelector } from "@recoil/selectors/genresSelector";

// API로 호출된 장르 데이터 타입 정의
interface GenreDataType {
  genre_id: number;
  genre_name: string;
}

function GenreTab() {
  const loadable = useRecoilValueLoadable(genresSelector);

  if (loadable.state === "loading") return <></>;
  if (loadable.state === "hasError") return <></>;

  const genres = loadable.contents.data;

  return (
    genres?.length > 0 && (
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={10}
        direction="horizontal"
        freeMode={true}
        modules={[FreeMode, Mousewheel]}
        mousewheel={{
          forceToAxis: true,
        }}
        css={styles.swiperContainer()}
      >
        {genres.map((genre: GenreDataType) => (
          <SwiperSlide key={genre.genre_id}>
            <button key={genre.genre_id} css={styles.genreButton()}>
              {/* genre_name 키는 GENRE_EMOJI 키에 존재한다는 타입 단언  */}
              {GENRE_EMOJI[genre.genre_name as keyof typeof GENRE_EMOJI]}
              <span>{genre.genre_name}</span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    )
  );
}

export default GenreTab;

{
  /* <Swiper
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
  {bestMovies.length > 0 &&
    bestMovies.map((movie, idx) => {
      return (
        <SwiperSlide key={idx}>
          <MovieItem
            type={isLogin ? "all" : "rate"}
            src={movie.src}
            title={movie.title}
            name={movie.name}
            rate={movie.rate}
            like={movie.like}
            comment={movie.comment}
          />
        </SwiperSlide>
      );
    })}
</Swiper> */
}

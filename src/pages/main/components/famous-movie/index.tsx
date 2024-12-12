import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Top10 from "@assets/icons/top10.svg?react";
import Info from "@assets/icons/info.svg?react";

import styles from "./index.styles";
import { MovieItem } from "@stories/movie-item";

import bestMovies from "@pages/main/constants";
import { useTopMovieQuery } from "@hooks/movie";
import { useEffect } from "react";

interface FamousMovieProps {
  isLogin: boolean;
}

function FamousMovie({ isLogin }: FamousMovieProps) {
  const { data, isLoading } = useTopMovieQuery();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div css={styles.famousContainer()}>
      {/* Title */}
      <div css={styles.titleWrapper()}>
        <div className="title">
          <Top10 />
          <h3>picky top 10</h3>
        </div>

        <Info />
      </div>

      {/* Content - Slider */}
      <Swiper
        slidesPerView={3.8}
        // spaceBetween={10}
        direction={"horizontal"}
        freeMode={true}
        modules={[FreeMode, Mousewheel]}
        mousewheel={{
          forceToAxis: true,
        }}
        css={styles.swiperContainer()}
      >
        {!isLoading &&
          data.data.length > 0 &&
          data.data.map((movie) => (
            <SwiperSlide key={movie.movieId}>
              <MovieItem
                type={isLogin ? "all" : "rate"}
                src={movie.posterUrl}
                title={movie.title}
                name={movie.title}
                rate={movie.totalRating}
                like={movie.likes}
                // comment={movie.comment}
                isLoading={isLoading}
              />
            </SwiperSlide>
          ))}

        {/* {bestMovies.length > 0 &&
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
                  isLoading={isLoading}
                />
              </SwiperSlide>
            );
          })} */}
      </Swiper>
    </div>
  );
}

export default FamousMovie;

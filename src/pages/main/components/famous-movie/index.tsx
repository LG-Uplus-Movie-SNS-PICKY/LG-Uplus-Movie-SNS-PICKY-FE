import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Top10 from "@assets/icons/top10.svg?react";
import Info from "@assets/icons/info.svg?react";

import styles from "./index.styles";
import { MovieItem } from "@stories/movie-item";

import { useTopMovieQuery } from "@hooks/movie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopMovieDataTypes } from "@type/api/movie";
import Loading from "@components/loading";

interface FamousMovieProps {
  isLogin: boolean;
}

function FamousMovie({ isLogin }: FamousMovieProps) {
  const { data, isLoading } = useTopMovieQuery();
  const navigate = useNavigate();

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
        direction={"horizontal"}
        freeMode={true}
        modules={[FreeMode, Mousewheel]}
        mousewheel={{
          forceToAxis: true,
        }}
        css={styles.swiperContainer()}
      >
        {isLoading && <Loading />}
        {!isLoading &&
          data.data.map((movie: TopMovieDataTypes) => (
            <SwiperSlide key={movie.movieId}>
              <MovieItem
                key={movie.movieId}
                type={isLogin ? "all" : "rate"}
                src={movie.posterUrl}
                title={movie.title}
                name={movie.title}
                rate={movie.totalRating}
                like={movie.likes}
                // comment={movie.comment}
                isLoading={isLoading}
                onClick={() => navigate(`/movie/${movie.movieId}`)}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default FamousMovie;

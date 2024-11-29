import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Top10 from "@assets/icons/top10.svg?react";
import Info from "@assets/icons/Info.svg?react";

import styles from "./index.styles";
import { MovieItem, MovieItemProps } from "@stories/movie-item";

const bestMovies: MovieItemProps[] = [
  {
    type: "rate",
    src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
    rate: 4.9,
    like: 274,
    comment: 49,
    title: "타이타닉",
    name: "titanic",
  },
  {
    type: "rate",
    src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
    rate: 4.9,
    like: 274,
    comment: 49,
    title: "타이타닉",
    name: "titanic",
  },
  {
    type: "rate",
    src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
    rate: 4.9,
    like: 274,
    comment: 49,
    title: "타이타닉",
    name: "titanic",
  },
  {
    type: "rate",
    src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
    rate: 4.9,
    like: 274,
    comment: 49,
    title: "타이타닉",
    name: "titanic",
  },
  {
    type: "rate",
    src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
    rate: 4.9,
    like: 274,
    comment: 49,
    title: "타이타닉",
    name: "titanic",
  },
  {
    type: "rate",
    src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
    rate: 4.9,
    like: 274,
    comment: 49,
    title: "타이타닉",
    name: "titanic",
  },
  {
    type: "rate",
    src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
    rate: 4.9,
    like: 274,
    comment: 49,
    title: "타이타닉",
    name: "titanic",
  },
  {
    type: "rate",
    src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
    rate: 4.9,
    like: 274,
    comment: 49,
    title: "타이타닉",
    name: "titanic",
  },
  {
    type: "rate",
    src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
    rate: 4.9,
    like: 274,
    comment: 49,
    title: "타이타닉",
    name: "titanic",
  },
  {
    type: "rate",
    src: "https://i.namu.wiki/i/J-AwFq-6xzVxDQpE3q3CwCL_QBzYfL6MPINXL1kWPeNlZXWNjayXfzXqqyi8luo4m4GM9Bsh_nhy9Ig3m5a8FQ.webp",
    rate: 4.9,
    like: 274,
    comment: 49,
    title: "타이타닉",
    name: "titanic",
  },
];

interface FamousMovieProps {
  isLogin: boolean;
}

function FamousMovie({ isLogin }: FamousMovieProps) {
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
      </Swiper>
    </div>
  );
}

export default FamousMovie;

import styles from "./index.styles";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import AddCircleIcon from "@assets/icons/add_circle_small.svg?react";
import image3 from "@assets/images/dummy/image3.jpeg";
import { MovieItem } from "@stories/movie-item";

const dummyMoviePlaylistData = [
  {
    poster: image3,
    name: "꼬미 시리즈 1",
  },
  {
    poster: image3,
    name: "꼬미 시리즈 2",
  },
  {
    poster: image3,
    name: "꼬미 시리즈 3",
  },
  {
    poster: image3,
    name: "꼬미 시리즈 4",
  },
  {
    poster: image3,
    name: "꼬미 시리즈 5",
  },
  {
    poster: image3,
    name: "꼬미 시리즈 6",
  },
  {
    poster: image3,
    name: "꼬미 시리즈 7",
  },
  {
    poster: image3,
    name: "꼬미 시리즈 8",
  },
  {
    poster: image3,
    name: "꼬미 시리즈 9",
  },
  {
    poster: image3,
    name: "꼬미 시리즈 10",
  },
  {
    poster: image3,
    name: "꼬미 시리즈 11",
  },
  {
    poster: image3,
    name: "꼬미 시리즈 12",
  },
];

function MoviePlaylistOpertionPage() {
  return (
    <>
      {/* Title */}
      <div css={styles.titleHeaderContainer()}>
        {/* 플레이리스트 개수 */}
        <div className="container">
          <div className="section total">
            <h3>Total Playlist:</h3>
            <span>36</span>
          </div>

          <div className="section add">
            <button>
              <AddCircleIcon width="16px" height="16px" />
              <span>추가</span>
            </button>
          </div>
        </div>
      </div>

      {/* Playlist Container */}
      <div css={styles.playlistContainer()}>
        {/* Playlist Card */}
        <div css={styles.playlistCard()}>
          {/* Playlist Header */}
          <div css={styles.playlistCardHeader()}>
            {/* PlayList Name + Actions Button */}
            <h3 className="playlist-title">빨간안경 이동진의 픽 Pick</h3>

            {/* Actions Button */}
            <div css={styles.actionButton()}>
              <button>수정</button>
              <button>삭제</button>
            </div>
          </div>

          {/* Playlist Content */}
          <div css={styles.reportInfoContainer()}>
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
              {dummyMoviePlaylistData.map((data, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <MovieItem
                      type="basic"
                      src={data.poster}
                      title={data.name}
                      name={data.name}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoviePlaylistOpertionPage;

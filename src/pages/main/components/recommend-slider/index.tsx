import Netflix from "@assets/icons/netflix.svg?react";
import DisneyPlus from "@assets/icons/disneyplus.svg?react";
import Watcha from "@assets/icons/watcha.svg?react";
import styles from "./index.styles";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { fetchRecommendMovie } from "@api/movie";
import { useRecommnedMovieQuery } from "@hooks/movie";
import { useEffect } from "react";

const dummyData = [
  {
    poster:
      "https://i.namu.wiki/i/55Y_mFY2MGI2pKrhXVfgXi27wSvdg3F4IovLwH-i5gf1nhWb-IL-6ZVAJW_MsnNahUNYljq7ep1uskFK-OiRkg.webp",
    title: "티파니에서 아침을",
    rate: 4.2,
    genres: ["드라마", "로맨스", "코미디"],
    service: [
      "netflix",
      "watcha",
      "tving",
      "disneyplus",
      "coupangplay",
      "wavve",
    ],
  },

  {
    poster:
      "https://i.namu.wiki/i/55Y_mFY2MGI2pKrhXVfgXi27wSvdg3F4IovLwH-i5gf1nhWb-IL-6ZVAJW_MsnNahUNYljq7ep1uskFK-OiRkg.webp",
    title: "티파니에서 아침을",
    rate: 4.2,
    genres: ["드라마", "로맨스", "코미디"],
    service: ["netflix", "watcha", "tving", "disneyplus", "coupangplay"],
  },

  {
    poster:
      "https://i.namu.wiki/i/55Y_mFY2MGI2pKrhXVfgXi27wSvdg3F4IovLwH-i5gf1nhWb-IL-6ZVAJW_MsnNahUNYljq7ep1uskFK-OiRkg.webp",
    title: "티파니에서 아침을",
    rate: 4.2,
    genres: ["드라마", "로맨스", "코미디"],
    service: ["netflix", "watcha", "tving", "disneyplus"],
  },

  {
    poster:
      "https://i.namu.wiki/i/55Y_mFY2MGI2pKrhXVfgXi27wSvdg3F4IovLwH-i5gf1nhWb-IL-6ZVAJW_MsnNahUNYljq7ep1uskFK-OiRkg.webp",
    title: "티파니에서 아침을",
    rate: 4.2,
    genres: ["드라마", "로맨스", "코미디"],
    service: ["netflix", "watcha", "tving"],
  },

  {
    poster:
      "https://i.namu.wiki/i/55Y_mFY2MGI2pKrhXVfgXi27wSvdg3F4IovLwH-i5gf1nhWb-IL-6ZVAJW_MsnNahUNYljq7ep1uskFK-OiRkg.webp",
    title: "티파니에서 아침을",
    rate: 4.2,
    genres: ["드라마", "로맨스", "코미디"],
    service: ["netflix", "watcha"],
  },
];
const posterDummySrc =
  "https://i.namu.wiki/i/55Y_mFY2MGI2pKrhXVfgXi27wSvdg3F4IovLwH-i5gf1nhWb-IL-6ZVAJW_MsnNahUNYljq7ep1uskFK-OiRkg.webp";

/**
 * 사용자 맞춤 영화를 보여주는 슬라이더
 * @returns
 */
function RecommendMovieSlider() {
  const { data, isLoading } = useRecommnedMovieQuery();

  // useEffect(() => {
  //   if (!isLoading) {
  //     console.log(data);
  //   }
  // }, [isLoading]);

  return (
    <Swiper
      slidesPerView={1.3}
      spaceBetween={30}
      centeredSlides={true}
      modules={[Autoplay]}
      loop={true}
      touchRatio={0}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      css={styles.swiperContainer()}
    >
      {dummyData.length > 0 &&
        dummyData.map((data, idx) => (
          <SwiperSlide key={idx}>
            <div css={styles.sliderItem(data.poster)}>
              {/* Background Image */}
              <div className="background" />

              {/* Content */}
              <div css={styles.content()}>
                {/* Badge Section */}
                <div css={styles.badgeContainer()}>
                  <div className="badge">PICKY 추천 영화</div>
                </div>

                {/* Movie Poster Section */}
                <div css={styles.moviePosterContainer()}>
                  <img src={data.poster} alt="image" />
                </div>

                {/* Movie Info Section */}
                <div css={styles.movieInfoContainer()}>
                  {/* Info */}
                  <div className="movie-info">
                    <h3>티파니에서 아침을</h3>
                    <div className="movie-sub-info">
                      <span className="rate">별점: ★ {data.rate}</span>
                      <span className="genres">{data.genres.join(", ")}</span>
                    </div>
                  </div>

                  {/* OTT Servie */}
                  <div className="ott-service">
                    <div className="badge">
                      <Netflix width={18} height={18} />
                    </div>
                    <div className="badge">
                      <Watcha width={18} height={18} />
                    </div>
                    <div className="badge more-service">2+</div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default RecommendMovieSlider;

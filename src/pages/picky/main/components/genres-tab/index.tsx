import styles from "./index.styles";

import { GENRE_EMOJI } from "@constants/genre";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { useRecoilValueLoadable } from "recoil";
import { genresSelector } from "@recoil/selectors/genresSelector";
import { GenreTabButton } from "@stories/genre-tab";
import { useLocation, useNavigate } from "react-router-dom";

// API로 호출된 장르 데이터 타입 정의
interface GenreDataType {
  genreId: number;
  name: string;
}

function GenreTab() {
  const navigate = useNavigate();
  const loadable = useRecoilValueLoadable(genresSelector);

  if (loadable.state === "loading") return <></>;
  if (loadable.state === "hasError") return <></>;

  const genres = loadable.contents.data;

  return (
    genres.length > 0 && (
      <Swiper
        // key={crypto.randomUUID()}
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
          <SwiperSlide key={genre.genreId}>
            <GenreTabButton
              label={genre.name}
              emoji={genre.name}
              btnType="Round"
              padding="8px 16px"
              onClick={() => navigate(`/genre/${genre.genreId}`)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    )
  );
}

export default GenreTab;

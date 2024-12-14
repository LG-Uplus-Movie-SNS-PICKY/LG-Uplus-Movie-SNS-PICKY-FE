import styles from "./index.styles";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { useRecoilValueLoadable } from "recoil";
import { genresSelector } from "@recoil/selectors/genresSelector";
import { GenreTabButton } from "@stories/genre-tab";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// API로 호출된 장르 데이터 타입 정의
interface GenreDataType {
  genreId: number;
  name: string;
}

interface GenreButtonsProps {
  onClick: (genreId: number) => void;
  selectedGenres?: number | number[];
  onInitialGenre?: (genreId: number) => void;
}

function GenreTab({
  onClick,
  selectedGenres,
  onInitialGenre,
}: GenreButtonsProps) {
  const navigate = useNavigate();
  const loadable = useRecoilValueLoadable(genresSelector);

  if (loadable.state === "loading") return <></>;
  if (loadable.state === "hasError") return <></>;

  const genres = loadable.contents.data;

  useEffect(() => {
    if (loadable.state === "hasValue" && onInitialGenre) {
      onInitialGenre(loadable.contents.data[0].genreId);
    }
  }, [loadable]);

  return (
    genres.length > 0 && (
      <Swiper
        key={crypto.randomUUID()}
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
              btnType="Rectangle"
              selected={
                Array.isArray(selectedGenres)
                  ? selectedGenres.includes(genre.genreId)
                  : !selectedGenres
                  ? loadable.contents.data[0].genreId === genre.genreId
                  : selectedGenres === genre.genreId
              }
              onClick={() => onClick(genre.genreId)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    )
  );
}

export default GenreTab;

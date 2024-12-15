import React, { useEffect, useState } from "react";
import styles from "./index.styles";

import Search from "@assets/icons/search_small.svg?react";
import Netflix from "@assets/icons/netflix.svg?react";
import Watcha from "@assets/icons/watcha.svg?react";
import Tving from "@assets/icons/tving.svg?react";
import Diesney from "@assets/icons/disneyplus.svg?react";
import Coupang from "@assets/icons/coupangplay.svg?react";
import Wavve from "@assets/icons/wavve.svg?react";

import Check from "@assets/icons/check.svg?react";
import GenreTab from "./component/genre-tab";
import { useGenreMovieQuery } from "@hooks/movie";
import { MovieDataTypes } from "@type/api/movie";
import MovieCard from "./component/movie-card";
import { useRecoilValueLoadable } from "recoil";
import { genresSelector } from "@recoil/selectors/genresSelector";

const ottDummyData = [
  { icon: Netflix, name: "netflix" },
  { icon: Watcha, name: "watcha" },
  { icon: Tving, name: "tving" },
  { icon: Diesney, name: "disneyplus" },
  { icon: Coupang, name: "coupangplay" },
  { icon: Wavve, name: "wavve" },
];

function TotalMoviesSection() {
  const loadable = useRecoilValueLoadable(genresSelector);
  const [selectButton, setSelectButton] = useState<number | null>(null);

  // 다른 장르 버튼 클릭 시 해당 장르 영화 변경
  const GenreOnClick = (movieId: number) => {
    setSelectButton(movieId);
  };

  useEffect(() => {
    if (loadable.state === "hasValue" && loadable.contents.data.length > 0) {
      setSelectButton(loadable.contents.data[0].genreId);
    }
  }, [loadable]);

  const { data: genreMovies, isLoading } = useGenreMovieQuery(
    selectButton ?? -1
  );

  useEffect(() => {
    if (!isLoading) {
      console.log(loadable.contents.data);
    }
  }, [isLoading]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Title */}
        <div css={styles.titleHeaderContainer()}>
          {/* 장르 필터 */}
          <GenreTab
            onClick={GenreOnClick}
            selectedGenres={selectButton ?? -1}
          />
        </div>

        {/* Movies Container */}
        <div css={styles.movieContainer()}>
          {Array.isArray(genreMovies?.pages) &&
            genreMovies?.pages.map((page, index) => (
              <React.Fragment key={index}>
                {/* Playlist Data JSX Element Mapping  */}
                {Array.isArray(page?.data.content) &&
                  page?.data.content.map((movie: MovieDataTypes) => (
                    <MovieCard
                      key={movie.movieId}
                      movie={movie}
                      genres={
                        loadable.state === "hasValue" && loadable.contents.data
                      }
                    />
                  ))}
              </React.Fragment>
            ))}
        </div>
      </div>
    </>
  );
}

export default TotalMoviesSection;

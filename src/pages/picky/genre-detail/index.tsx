import { GenreDataType } from "@components/genre";
import { genresSelector } from "@recoil/selectors/genresSelector";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";

function PickyGenreDetailPage() {
  const loadable = useRecoilValueLoadable(genresSelector);
  const { genreId } = useParams(); // 장르 아이디 param

  // 전역 상태로 관리되고 있는 장르와 일치하는 텍스트를 가져온다.
  if (loadable.state === "loading") return <></>;
  if (loadable.state === "hasError") return <></>;

  const genres = loadable.contents.data;
  const currentGenre: GenreDataType = genres.find(
    (genre: GenreDataType) => genre.genre_id === Number(genreId)
  );

  return (
    <>
      {/* 장르 타이틀 출력 */}
      <div>
        <h3>{currentGenre.genre_name}</h3>
      </div>

      {/* 장르에 해당하는 영화 데이터 출력 */}
    </>
  );
}

export default PickyGenreDetailPage;

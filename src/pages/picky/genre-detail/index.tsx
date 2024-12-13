import SEO from "@components/seo";
import styles from "./index.styles";

import { GenreDataType } from "@components/genre";
import { genresSelector } from "@recoil/selectors/genresSelector";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";

function PickyGenreDetailPage() {
  const [genreName, setGenreName] = useState("");
  const { genreId } = useParams(); // 장르 아이디 param

  const loadable = useRecoilValueLoadable(genresSelector);

  // // 전역 상태로 관리되고 있는 장르와 일치하는 텍스트를 가져온다.
  // if (loadable.state === "loading") return <></>;
  // if (loadable.state === "hasError") return <></>;

  // const genres = loadable.contents.data;
  // const currentGenre: GenreDataType = genres.find(
  //   (genre: GenreDataType) => genre.genreId === Number(genreId)
  // );

  // SEO을 위한 장르 이름 추출 useEffect()
  useEffect(() => {
    if (loadable.state === "hasValue") {
      setGenreName(
        loadable.contents.data.find(
          (genre: GenreDataType) => genre.genreId === Number(genreId)
        ).name
      );
    }
  }, [loadable]);

  return (
    <>
      <SEO
        title={`PICKY: ${genreName}`}
        description="사용자님이 원하는 장르의 영화를 찾아보세요"
        url={`/genres/${genreId}`}
      />

      {/* 장르 타이틀 출력 */}
      {/* <div css={styles.title()}>
        <h3>{currentGenre.genreId}</h3>
      </div> */}

      {/* 장르에 해당하는 영화 데이터 출력 */}
      <section css={styles.movies()}>
        <div>
          {Array.from({ length: 10 }, (_, idx) => (
            <React.Fragment key={idx}>
              {/* Movie Data Mapping */}
              <div css={styles.movieCard()}>
                <img src="https://image.tving.com/ntgs/contents/CTC/caim/CAIM1160/ko/20240920/0520/M000289333.jpg/dims/resize/F_webp,400" />
                <span className="alt-text">asdsda</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>
    </>
  );
}

export default PickyGenreDetailPage;

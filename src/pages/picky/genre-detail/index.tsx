import styles from "./index.styles";

import { GenreDataType } from "@components/genre";
import { genresSelector } from "@recoil/selectors/genresSelector";

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
      <div css={styles.title()}>
        <h3>{currentGenre.genre_name}</h3>
      </div>

      {/* 장르에 해당하는 영화 데이터 출력 */}

      <section css={styles.movies()}>
        <div>
          {Array.from({ length: 10 }, () => (
            <>
              {/* Movie Data Mapping */}
              <div css={styles.movieCard()}>
                <img src="https://image.tving.com/ntgs/contents/CTC/caim/CAIM1160/ko/20240920/0520/M000289333.jpg/dims/resize/F_webp,400" />
                <span className="alt-text">asdsda</span>
              </div>
            </>
          ))}
        </div>
      </section>
    </>
  );
}

export default PickyGenreDetailPage;

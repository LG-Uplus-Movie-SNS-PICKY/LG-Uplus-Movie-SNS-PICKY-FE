import { genresSelector } from "@recoil/selectors/genresSelector";
import { useRecoilValueLoadable } from "recoil";

import styles from "./index.styles";
import { GENRE_EMOJI } from "@constants/genre";

// API로 호출된 장르 데이터 타입 정의
export interface GenreDataType {
  genre_id: number;
  genre_name: string;
}

// 장르 전역 컴포넌트
function GenreButtons(): JSX.Element {
  // useRecoilValueLoadable -> 비동기 데이터의 처리 상태와 데이터를 반환
  const loadable = useRecoilValueLoadable(genresSelector);

  if (loadable.state === "loading") return <></>; // 로딩 중
  if (loadable.state === "hasError") return <></>; // 에러 발생

  const genres = loadable.contents.data;

  return genres?.length > 0 ? (
    genres.map((genre: GenreDataType) => (
      // 전역 장르 버튼 컴포넌트 정의
      <button key={genre.genre_id} css={styles.genreButton()}>
        {/* genre_name 키는 GENRE_EMOJI 키에 존재한다는 타입 단언  */}
        {GENRE_EMOJI[genre.genre_name as keyof typeof GENRE_EMOJI]}
        <span>{genre.genre_name}</span>
      </button>
    ))
  ) : (
    <></>
  );
}

export default GenreButtons;

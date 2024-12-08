import { genresSelector } from "@recoil/selectors/genresSelector";
import { useRecoilValueLoadable } from "recoil";

import styles from "./index.styles";
import { GENRE_EMOJI } from "@constants/genre";
import { GenreTabButton } from "@stories/genre-tab";
import { useNavigate } from "react-router-dom";

// API로 호출된 장르 데이터 타입 정의
export interface GenreDataType {
  genre_id: number;
  genre_name: string;
}

// 장르 전역 컴포넌트
function GenreButtons(): JSX.Element {
  const navigate = useNavigate();

  // useRecoilValueLoadable -> 비동기 데이터의 처리 상태와 데이터를 반환
  const loadable = useRecoilValueLoadable(genresSelector);

  if (loadable.state === "loading") return <></>; // 로딩 중
  if (loadable.state === "hasError") return <></>; // 에러 발생

  const genres = loadable.contents.data;

  return genres?.length > 0 ? (
    genres.map((genre: GenreDataType) => (
      // 전역 장르 버튼 컴포넌트 정의
      <GenreTabButton
        key={genre.genre_id}
        label={genre.genre_name}
        emoji={genre.genre_name}
        btnType="Rectangle"
        onClick={() => navigate(`/picky/genre/${genre.genre_id}`)}
      />
    ))
  ) : (
    <></>
  );
}

export default GenreButtons;

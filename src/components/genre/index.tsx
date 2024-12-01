import { genresSelector } from "@recoil/selectors/genresSelector";
import { useRecoilValueLoadable } from "recoil";

import Emoji from "@pages/signup/components/emoji";

import action from "@assets/images/action.png";
import romance from "@assets/images/romance.png";
import musical from "@assets/images/musical.png";
import comedy from "@assets/images/comedy.png";
import crime from "@assets/images/crime.png";
import animation from "@assets/images/animation.png";
import documentary from "@assets/images/documentary.png";
import horror from "@assets/images/horror.png";
import darama from "@assets/images/drama.png";
import thriller from "@assets/images/thriller.png";
import sf from "@assets/images/sf.png";
import fantasy from "@assets/images/fantasy.png";

interface GenreDataType {
  [key: string]: unknown;
  genre_id: number;
  genre_name: string;
}

const genreEmoji = {
  액션: <Emoji src={action} alt="액션" />,
  로맨스: <Emoji src={romance} alt="로맨스" />,
  뮤지컬: <Emoji src={musical} alt="뮤지컬" />,
  코미디: <Emoji src={comedy} alt="코미디" />,
  범죄: <Emoji src={crime} alt="범죄" />,
  애니메이션: <Emoji src={animation} alt="애니메이션" />,
  다큐: <Emoji src={documentary} alt="다큐" />,
  호러: <Emoji src={horror} alt="호러" />,
  드라마: <Emoji src={darama} alt="드라마" />,
  스릴러: <Emoji src={thriller} alt="스릴러" />,
  SF: <Emoji src={sf} alt="SF" />,
  판타지: <Emoji src={fantasy} alt="판타지" />,
};

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
      <button key={genre.genre_id} className="genre-btn">
        {genreEmoji[genre.genre_name as keyof typeof genreEmoji]}
        <span>{genre.genre_name}</span>
      </button>
    ))
  ) : (
    <></>
  );
}

export default GenreButtons;

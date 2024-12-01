import styles from "./index.styles";

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

import teddy from "@assets/images/teddy.png";
import bestMovies from "@pages/main/constants";
import { MovieItem } from "@stories/movie-item";

const genres = [
  { id: 1, name: "액션", emoji: <Emoji src={action} alt="액션" /> },
  { id: 2, name: "로맨스", emoji: <Emoji src={romance} alt="로맨스" /> },
  { id: 3, name: "뮤지컬", emoji: <Emoji src={musical} alt="뮤지컬" /> },
  { id: 4, name: "코미디", emoji: <Emoji src={comedy} alt="코미디" /> },
  { id: 5, name: "범죄", emoji: <Emoji src={crime} alt="범죄" /> },
  {
    id: 6,
    name: "애니메이션",
    emoji: <Emoji src={animation} alt="애니메이션" />,
  },
  { id: 7, name: "다큐", emoji: <Emoji src={documentary} alt="다큐" /> },
  { id: 8, name: "호러", emoji: <Emoji src={horror} alt="호러" /> },
  { id: 9, name: "드라마", emoji: <Emoji src={darama} alt="드라마" /> },
  { id: 10, name: "스릴러", emoji: <Emoji src={thriller} alt="스릴러" /> },
  { id: 11, name: "SF", emoji: <Emoji src={sf} alt="SF" /> },
  { id: 12, name: "판타지", emoji: <Emoji src={fantasy} alt="판타지" /> },
];

function GenresMovie() {
  return (
    <div css={styles.genreContainer()}>
      <div css={styles.genreCard()}>
        {/* Title */}
        <div className="title">
          <Emoji src={teddy} alt="teddy" width="16px" height="16px" />
          <span>PICKY가 추천하는 장르별 맞춤 영화</span>
        </div>

        {/* Genres Button */}
        <div className="genres">
          {genres.length > 0 &&
            genres.map((genre) => {
              return (
                <button key={genre.id} className="genre-btn">
                  {genre.emoji}
                  <span>{genre.name}</span>
                </button>
              );
            })}
        </div>

        {/* Select Genre Movies */}
        <div className="select-genre">
          {bestMovies.length > 0 &&
            bestMovies
              .slice(0, 6)
              .map((movie) => (
                <MovieItem
                  type="rate"
                  src={movie.src}
                  title={movie.title}
                  name={movie.name}
                  rate={movie.rate}
                  like={movie.like}
                  comment={movie.comment}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default GenresMovie;

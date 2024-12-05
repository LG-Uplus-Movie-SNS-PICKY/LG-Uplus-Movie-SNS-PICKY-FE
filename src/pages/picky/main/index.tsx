import BsetMovieSection from "./components/best-movies";
import GenreTab from "./components/genres-tab";
import MovieBackdropBanner from "./components/movie-backdrop-banner";
import PlayListSection from "./components/playlist";
import styles from "./index.styles";

export interface BestMovieTypes {
  movie_id: number;
  movie_title: string;
  movie_poster_url: string;
  movie_total_rating: number;
  movie_total_like: number;
  movie_total_line_review: number;
  movie_backdrop_url: string;
  movie_genres: string[];
}

const bestMovie: BestMovieTypes[] = [
  {
    movie_id: 1,
    movie_title: "대부 1",
    movie_poster_url: "/I1fkNd5CeJGv56mhrTDoOeMc2r.jpg",
    movie_total_rating: 4.5,
    movie_total_like: 291,
    movie_total_line_review: 72,
    movie_backdrop_url: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    movie_genres: ["드라마", "로맨스", "코미디"],
  },

  {
    movie_id: 2,
    movie_title: "이터널 선샤인",
    movie_poster_url: "/6HNRo7VYpvM5x5O921bEF2BG7f4.jpg",
    movie_total_rating: 4.9,
    movie_total_like: 428,
    movie_total_line_review: 231,
    movie_backdrop_url: "/12imOn96zRI2EMHOjOxm2qNY2BA.jpg",
    movie_genres: ["드라마", "로맨스", "코미디"],
  },

  {
    movie_id: 3,
    movie_title: "노인을 위한 나라는 없다",
    movie_poster_url: "/2SU078qZf8ZTNfl6XlqgYiQohhG.jpg",
    movie_total_rating: 4.2,
    movie_total_like: 192,
    movie_total_line_review: 32,
    movie_backdrop_url: "/kd9jFTTabg4xJpHDgxY0h8F9BzG.jpg",
    movie_genres: ["드라마", "로맨스", "코미디"],
  },

  {
    movie_id: 4,
    movie_title: "더 울프 월 스트리트",
    movie_poster_url: "/g4WhlVecCbBNhVT67ootHe6oe4A.jpg",
    movie_total_rating: 4.7,
    movie_total_like: 419,
    movie_total_line_review: 192,
    movie_backdrop_url: "/7Nwnmyzrtd0FkcRyPqmdzTPppQa.jpg",
    movie_genres: ["드라마", "로맨스", "코미디"],
  },

  {
    movie_id: 5,
    movie_title: "조커",
    movie_poster_url: "/wrCwH6WOvXQvVuqcKNUrLDCDxdw.jpg",
    movie_total_rating: 4.4,
    movie_total_like: 392,
    movie_total_line_review: 187,
    movie_backdrop_url: "/gZWl93sf8AxavYpVT1Un6EF3oCj.jpg",
    movie_genres: ["드라마", "로맨스", "코미디"],
  },

  {
    movie_id: 6,
    movie_title: "티파니에서 아침을",
    movie_poster_url: "/ylu8Gdl7HF8qrQr9cdjOo7AvuaA.jpg",
    movie_total_rating: 4.1,
    movie_total_like: 82,
    movie_total_line_review: 21,
    movie_backdrop_url: "/1HMoIkfVHckgXFWrabQS7uXPF3W.jpg",
    movie_genres: ["드라마", "로맨스", "코미디"],
  },

  {
    movie_id: 7,
    movie_title: "카사블랑카",
    movie_poster_url: "/2y4FgbomoL5Aa9EGM3dqDEvvDdT.jpg",
    movie_total_rating: 3.2,
    movie_total_like: 18,
    movie_total_line_review: 7,
    movie_backdrop_url: "/rrsG3xYrWifoduZtsIZ4ntoDfBY.jpg",
    movie_genres: ["드라마", "로맨스", "코미디"],
  },

  {
    movie_id: 8,
    movie_title: "어바웃 타임",
    movie_poster_url: "/cLfuuK1Y5FjX1xXDrrEa9ppnKuy.jpg",
    movie_total_rating: 4.3,
    movie_total_like: 298,
    movie_total_line_review: 192,
    movie_backdrop_url: "/3azw5uVGlaQtELBKG6bcHJlxZOk.jpg",
    movie_genres: ["드라마", "로맨스", "코미디"],
  },

  {
    movie_id: 9,
    movie_title: "쇼생크탈출",
    movie_poster_url: "/oAt6OtpwYCdJI76AVtVKW1eorYx.jpg",
    movie_total_rating: 5.0,
    movie_total_like: 471,
    movie_total_line_review: 418,
    movie_backdrop_url: "/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg",
    movie_genres: ["드라마", "로맨스", "코미디"],
  },

  {
    movie_id: 10,
    movie_title: "라이언 일병 구하기",
    movie_poster_url: "/2ATMbU4EljWkWcEJT9TElbQOMYY.jpg",
    movie_total_rating: 4.2,
    movie_total_like: 219,
    movie_total_line_review: 98,
    movie_backdrop_url: "/rW2xRFlJRbTnBJlQTSjQmjevIwb.jpg",
    movie_genres: ["드라마", "로맨스", "코미디"],
  },
].sort((a, b) => b.movie_total_rating - a.movie_total_rating);

function PickyPage() {
  // Top 10 영화 -> 리액트 쿼리
  return (
    <div css={styles.pickyPageContainer()}>
      {/* Movie Backdrop Banner (Best Movie 평점 1등) */}
      <MovieBackdropBanner movie={bestMovie[0]} />

      {/* Genres Tab - Slider(가로) */}
      <GenreTab />

      {/* Best Movies Section */}
      <BsetMovieSection bestMovie={bestMovie} />

      {/* Playlists */}
      {/* <PlayListSection /> */}
    </div>
  );
}

export default PickyPage;

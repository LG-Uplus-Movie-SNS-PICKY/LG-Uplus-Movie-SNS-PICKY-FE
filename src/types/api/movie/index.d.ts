// Top 10 Movies Type 정의
export interface TopMovieDataTypes {
  [key: string]: unknown; // 명시적이지 않은 데이터의 타입은 인덱싱 타입을 사용한다.
  movieId: number;
  posterUrl: string;
  title: string;
  totalRating: number;
  likes: number;
}

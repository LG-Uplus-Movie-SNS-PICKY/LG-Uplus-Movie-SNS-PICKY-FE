// Dashboard Overview List Item
import User from "@assets/icons/dashboard/user.svg?react";
import Movie from "@assets/icons/dashboard/movie.svg?react";
import Review from "@assets/icons/dashboard/review.svg?react";
import MovieLog from "@assets/icons/dashboard/movie-log.svg?react";

// list item 타입 지정
export interface OverviewListItemTypes {
  element: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

const data: Array<OverviewListItemTypes> = [
  { element: User, title: "USER", description: "사용자 정보 조회 및 관리" },
  { element: Movie, title: "Movie", description: "영화 정보 조회 및 관리" },
  {
    element: Review,
    title: "Review",
    description: "한줄평 정보 조회 및 관리",
  },
  {
    element: MovieLog,
    title: "MOVIE LOG",
    description: "무비로그 정보 조회 및 관리",
  },
];

// list item 반환
export default data;

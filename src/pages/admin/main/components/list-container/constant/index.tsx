// Dashboard Overview List Item
import User from "@assets/icons/dashboard/user.svg?react";
import Movie from "@assets/icons/dashboard/movie.svg?react";
import Review from "@assets/icons/dashboard/review.svg?react";
import MovieLog from "@assets/icons/dashboard/movie-log.svg?react";
import { useNavigate } from "react-router-dom";

// list item 타입 지정
export interface OverviewListItemTypes {
  element: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  bgColor: string;
  boxShadowColor: string;
  path: string;
}

// list item 반환
export const data: Array<OverviewListItemTypes> = [
  {
    element: User,
    title: "USER",
    description: "사용자 정보 조회 및 관리",
    bgColor: "linear-gradient(180deg, #9FD266 0%, #8FC455 100%)",
    boxShadowColor: "rgba(143, 196, 85, 0.25)",
    path: "/admin/user-management",
  },
  {
    element: Movie,
    title: "Movie",
    description: "영화 정보 조회 및 관리",
    bgColor: "linear-gradient(180deg, #EA5262 0%, #DC4655 100%)",
    boxShadowColor: "rgba(220, 70, 85, 0.25)",
    path: "/admin/movie-management",
  },
  {
    element: Review,
    title: "Review",
    description: "한줄평 정보 조회 및 관리",
    bgColor: "linear-gradient(180deg, #FECC55 0%, #F7BC43 100%)",
    boxShadowColor: "rgba(247, 188, 67, 0.25)",
    path: "/admin/review-management",
  },
  {
    element: MovieLog,
    title: "MOVIE LOG",
    description: "무비로그 정보 조회 및 관리",
    bgColor: "linear-gradient(180deg, #5B9AEA 0%, #4C8BDE 100%)",
    boxShadowColor: "rgba(76, 139, 222, 0.25)",
    path: "/admin/movie-log-management",
  },
];

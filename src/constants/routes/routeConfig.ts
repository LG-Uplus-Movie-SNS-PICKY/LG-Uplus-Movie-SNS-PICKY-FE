export interface RouteConfigTypes {
  path: string;
  header?: "basic" | "login" | "main" | "title" | "admin";
  label?: string;
  gnb: boolean;
  margin: string;
}

export const routeConfig: RouteConfigTypes[] = [
  { path: "/", header: "main", gnb: true, margin: "60px 0" },
  { path: "/auth/sign-in", gnb: false, margin: "0" },
  { path: "/auth/sign-up", gnb: false, margin: "0" },
  { path: "/user/:nickname", header: "main", gnb: true, margin: "60px 0" },
  {
    path: "/user/:nickname/edit",
    header: "title",
    label: "MY",
    gnb: false,
    margin: "60px 0 0 0",
  },
  { path: "/movie/:id", gnb: true, margin: "0 0 60px 0" },
  {
    path: "/movie/:id/review",

    gnb: true,
    margin: "0 0 60px 0",
  },
  { path: "/movie-log", header: "main", gnb: true, margin: "60px 0" },
  // { path: "/movie-log/:id", header: "main", gnb: true, margin: "60px 0" },
  {
    path: "/movie-log/detail/:boardId",
    header: "title",
    label: "게시글",
    gnb: false,
    margin: "60px 0 0 0",
  },
  { path: "/movie-log/add", gnb: false, margin: "0" },
  { path: "/movie-log/:boardId/edit", gnb: false, margin: "0" },
  { path: "/picky", header: "main", gnb: true, margin: "60px 0" },
  {
    path: "/genre/:genreId",
    header: "title",
    label: "",
    gnb: true,
    margin: "60px 0",
  },
  {
    path: "/notification",
    header: "title",
    label: "알림",
    gnb: false,
    margin: "60px 0 0 0",
  },
  {
    path: "/admin/*",
    header: "admin",
    gnb: false,
    margin: "60px 0 0 0",
  },
  { path: "/recommendation", header: "main", gnb: true, margin: "60px 0" },
  { path: "/search", gnb: false, margin: "0" },
  { path: "/error", gnb: false, margin: "0" },
];

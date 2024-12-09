import SEO from "@components/seo";
import FamousMovie from "./components/famous-movie";
import GenresMovie from "./components/genres-movie";
import LoginBanner from "./components/login-banner";
import RecommendMovieSlider from "./components/recommend-slider";
import Loading from "@components/loading";
import { useEffect } from "react";
import axios from "axios";

import board from "@constants/json/board/board.json";
import boardComments from "@constants/json/board/board_comments.json";
import boardContents from "@constants/json/board/board_contents.json";

const isLogin = false;

function Main() {
  useEffect(() => {
    // sessionStorage.setItem("user", JSON.stringify({ id: 1, name: "asd" }));
    const fetch = async () => {
      const data = await axios
        .post(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/movie`,
          {
            movie_info: {
              id: 466272,
              title: "원스 어폰 어 타임 인… 할리우드",
              original_title: "Once Upon a Time... in Hollywood",
              release_date: "2019-07-24",
              poster_path: "/1F2rDT1oNdvMyXF7gxbGxaXCzrz.jpg",
              overview:
                "자유의 바람이 불던 1969년 할리우드, 잊혀져 가는 액션스타 릭 달튼과 그의 스턴트 배우 겸 매니저인 클리프 부스는 과거의 영광을 되찾기 위해 고군분투하지만 새로운 스타들에 밀려 큰 성과를 거두진 못한다. 어느 날 릭의 옆집에 할리우드에서 가장 핫한 로만 폴란스키 감독과 배우 샤론 테이트 부부가 이사 오자 릭은 새로운 기회가 생길 수도 있다고 기뻐하지만 인사조차 나누지 못한다. 형편상 더 이상 함께 일할 수 없게 된 릭과 클리프는 각자의 길을 가기로 하고 릭의 집에서 술을 거나하게 마시던 중 뜻하지 않은 낯선 방문객을 맞이하게 되는데…",
              runtime: 162,
              genres: [
                {
                  id: 35,
                },
                {
                  id: 18,
                },
                {
                  id: 53,
                },
              ],

              credits: {
                cast: [
                  {
                    id: 6193,
                    character: "Rick Dalton",
                    original_name: "레오나르도 디카프리오",
                    profile_path: "/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
                  },
                  {
                    id: 287,
                    character: "Cliff Booth",
                    original_name: "브래드 피트",
                    profile_path: "/4rjnRCQ6bGFYdBb4UooOjsQy12c.jpg",
                  },
                  {
                    id: 234352,
                    character: "Sharon Tate",
                    original_name: "마고 로비",
                    profile_path: "/19kGK6naq4Fl2REdXgWYC3m2xEF.jpg",
                  },
                  {
                    id: 46593,
                    character: "Jay Sebring",
                    original_name: "에밀 허쉬",
                    profile_path: "/qxshYNcE9yYBvdY5oXp9v6lglG0.jpg",
                  },
                  {
                    id: 1392137,
                    character: "Pussycat",
                    original_name: "마가렛 퀄리",
                    profile_path: "/jStNyMj3acpLuH48awLVLqqlyaV.jpg",
                  },
                  {
                    id: 18082,
                    character: "Jim Stacy",
                    original_name: "티모시 올리펀트",
                    profile_path: "/7pHmRHE2wBNC9cBgNIRCBqFLoyZ.jpg",
                  },
                ],
                crew: [
                  {
                    id: 92303,
                    original_name: "Gary Archer",
                    profile_path: "/7cinROGhbaTpWPRrD12Za2XyZcV.jpg",
                    job: "Prosthetics",
                  },
                  {
                    id: 60536,
                    original_name: "Clay Cullen",
                    profile_path: "/45DYaloAlm6XlUMbOQuHxtI5dpP.jpg",
                    job: "Stunts",
                  },
                  {
                    id: 186573,
                    original_name: "Zack Duhame",
                    profile_path: "/mI6sdZQaeHDi3jXinS4g1jizywk.jpg",
                    job: "Stunt Double",
                  },
                ],
                directingCrew: [],
              },

              backdrop_path: "/oRiUKwDpcqDdoLwPoA4FIRh3hqY.jpg",
            },
            trailer: "ELeMaP8EPAA",
            ost: "PLDisKgcnAC4Tn2kjbXBPiXDu5lVCffkLr",
            movie_behind_videos: "PLb65SDpapC_l_VIASaPt9ELxTvzN_7YFu",
            selectPlatform: [2, 5, 7],
          },
          {
            headers: { Authorization: "1" },
          }
        )
        .then((res) => res.data);
      console.log(data);
    };
    fetch();
  });

  return (
    <>
      <SEO
        title="PICKY"
        description="PICKY는 영화 리뷰와 정보를 한곳에서 확인하고, 영화 팬들을 위한 최적의 커뮤니티 서비스입니다."
      />

      {/* Slider or Banner Section */}
      {isLogin ? <RecommendMovieSlider /> : <LoginBanner />}

      {/* Famous Movies Section */}
      <FamousMovie isLogin={isLogin} />

      {/* Genre Movie Section */}
      <GenresMovie />
    </>
  );
}

export default Main;

import SEO from "@components/seo";
import FamousMovie from "./components/famous-movie";
import GenresMovie from "./components/genres-movie";
import LoginBanner from "./components/login-banner";
import RecommendMovieSlider from "./components/recommend-slider";
import Loading from "@components/loading";
import { useEffect } from "react";
import axios from "axios";

const isLogin = false;

function Main() {
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`${import.meta.env.VITE_SERVER_URL}/api/v1/board/all`, {
          headers: {
            Authorization: "123",
          },
        })
        .then((res) => console.log(res.data));
    };

    fetch();
  }, []);

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

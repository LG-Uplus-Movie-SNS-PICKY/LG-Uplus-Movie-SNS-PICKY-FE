import SEO from "@components/seo";
import FamousMovie from "./components/famous-movie";
import GenresMovie from "./components/genres-movie";
import LoginBanner from "./components/login-banner";
import RecommendMovieSlider from "./components/recommend-slider";

const isLogin = true;

function Main() {
  return (
    <>
      {/* <SEO
        title="PICKY"
        description="영화 리뷰와 정보를 한곳에서, 영화 팬들의 소통을 위한 최적의 커뮤니티 서비스입니다."
      /> */}

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

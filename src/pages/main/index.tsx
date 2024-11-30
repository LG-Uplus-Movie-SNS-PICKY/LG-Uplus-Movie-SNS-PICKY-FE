import FamousMovie from "./components/famous-movie";
import GenresMovie from "./components/genres-movie";
import LoginBanner from "./components/login-banner";
import RecommendMovieSlider from "./components/recommend-slider";

const isLogin = true;

function Main() {
  return (
    <>
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

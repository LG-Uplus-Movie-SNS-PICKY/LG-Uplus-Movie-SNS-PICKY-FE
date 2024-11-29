import FamousMovie from "./components/famous-movie";
import GenresMovie from "./components/genres-movie";
import LoginBanner from "./components/login-banner";
import Slider from "./components/slider";

const isLogin = false;

function Main() {
  return (
    <>
      {/* Slider or Banner Section */}
      {isLogin ? <Slider /> : <LoginBanner />}

      {/* Famous Movies Section */}
      <FamousMovie isLogin={isLogin} />

      {/* Genre Movie Section */}
      <GenresMovie />
    </>
  );
}

export default Main;

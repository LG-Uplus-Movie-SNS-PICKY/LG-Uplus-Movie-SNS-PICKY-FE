import FamousMovie from "./components/famous-movie";
import GenresMovie from "./components/genres-movie";
import Slider from "./components/slider";

function Main() {
  return (
    <>
      {/* Slider Section */}
      <Slider />

      {/* Famous Movies Section */}
      <FamousMovie />

      {/* Genre Movie Section */}
      <GenresMovie />
    </>
  );
}

export default Main;

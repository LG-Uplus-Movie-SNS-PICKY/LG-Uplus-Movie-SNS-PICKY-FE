import FamousMovie from "@pages/main/components/famous-movie";
import { BestMovieTypes } from "../..";

interface BsetMovieSectionProps {
  bestMovie: BestMovieTypes[];
}

function BsetMovieSection({ bestMovie }: BsetMovieSectionProps) {
  return <FamousMovie isLogin={true} />;
}

export default BsetMovieSection;

interface LikeMovieData {
  id: number;
}

interface LikeMovieContentProps {
  data: LikeMovieData[];
}

function LikeMovieContent({ data }: LikeMovieContentProps) {
  return <div>LikeMovieContent</div>;
}

export default LikeMovieContent;

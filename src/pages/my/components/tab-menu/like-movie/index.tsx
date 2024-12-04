import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./index.styles";

import EmptyLike from "@assets/icons/my-page/empty-like.svg?react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useState } from "react";

export interface LikeMovieData {
  movie_id: number;
  movie_title: string;
  movie_poster_url: string;
}

interface LikeMovieContentProps {
  data: LikeMovieData[];
}

// 사용자가 좋아요를 누른 영화가 하나도 등록하지 않았을 경우
function EmptyLikeMovie() {
  return (
    <>
      <EmptyLike />
      <h3>좋아요 누른 영화 없음</h3>
    </>
  );
}

function ImageWithFallback({ src, title }: { src: string; title: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <LazyLoadImage
        src={src}
        alt={title}
        effect="blur"
        onLoad={() => setIsLoaded(true)}
      />
      {!isLoaded && <span>{title}</span>}
    </>
  );
}

function LikeMovieContent({ data }: LikeMovieContentProps) {
  return (
    <div css={styles.container()} className={data.length ? "" : "centered"}>
      {data.length === 0 && <EmptyLikeMovie />}
      {data.length > 0 &&
        data.map((movie) => (
          <div key={movie.movie_id} css={styles.movieCard()}>
            <ImageWithFallback
              src={movie.movie_poster_url}
              title={movie.movie_title}
            />
          </div>
        ))}
    </div>
  );
}

export default LikeMovieContent;

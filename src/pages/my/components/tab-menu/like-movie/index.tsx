import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./index.styles";

import EmptyLike from "@assets/icons/my-page/empty-like.svg?react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLikedMovies } from "@api/movie";

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
    <div css={styles.emptyState}>
      <EmptyLike />
      <h3>좋아요 누른 영화 없음</h3>
    </div>
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

function LikeMovieContent() {
  const { nickname } = useParams<{ nickname: string }>(); // URL에서 닉네임 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const [movies, setMovies] = useState<LikeMovieData[]>([]);

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`); // 클릭 시 영화 상세 페이지로 이동
  };

  return (
    <div css={styles.container()} className={movies.length ? "" : "centered"}>
      {/* {movies.length === 0 && <EmptyLikeMovie />}
      {movies.length > 0 &&
        movies.map((movie) => (
          <div
            key={movie.movie_id}
            css={styles.movieCard()}
            onClick={() => handleMovieClick(movie.movie_id)} // 클릭 이벤트 핸들러 추가
          >
            <ImageWithFallback
              src={movie.movie_poster_url}
              title={movie.movie_title}
            />
          </div>
        ))} */}
    </div>
  );
}

export default LikeMovieContent;

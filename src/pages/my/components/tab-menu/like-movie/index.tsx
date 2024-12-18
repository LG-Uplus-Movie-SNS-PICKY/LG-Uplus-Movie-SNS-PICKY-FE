import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from "./index.styles";

import EmptyLike from "@assets/icons/my-page/empty-like.svg?react";
import "react-lazy-load-image-component/src/effects/blur.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLikedMovies } from "@api/movie";
import { useUserLikedMovies } from "@hooks/movie";
import { useInView } from "react-intersection-observer";
import Loading from "@components/loading";
import {
  LikeMovieDataType,
  QueryLikeMoviesDataTypes,
} from "@type/api/profile/likes";

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
        src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${src}`}
        effect="blur"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(false)}
      />
      {!isLoaded && <span>{title}</span>}
    </>
  );
}

function LikeMovieContent() {
  const { nickname } = useParams<{ nickname: string }>(); // URL에서 닉네임 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const [movies, setMovies] = useState<LikeMovieData[]>([]);

  const {
    data: likeMovies,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
  } = useUserLikedMovies(nickname ? nickname : "");

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`); // 클릭 시 영화 상세 페이지로 이동
  };

  useEffect(() => {
    if (!isLoading) console.log(likeMovies);
  }, [isLoading]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  if (isLoading)
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </div>
    );

  return (
    <div
      css={styles.container()}
      className={
        likeMovies?.pages[0]?.data?.content?.numberOfElements !== 0
          ? ""
          : "centered"
      }
    >
      {likeMovies?.pages[0]?.data?.content?.numberOfElements === 0 && (
        <EmptyLikeMovie />
      )}
      {Array.isArray(likeMovies?.pages) &&
        likeMovies.pages.map((page, idx) => (
          <React.Fragment key={idx}>
            {Array.isArray(page.data.content) &&
              page.data.content.map((likeMovie: LikeMovieDataType) => (
                <div
                  key={likeMovie.movieLikeId}
                  css={styles.movieCard()}
                  onClick={() => handleMovieClick(likeMovie.movieId)}
                >
                  <ImageWithFallback
                    src={likeMovie.moviePosterUrl}
                    title={likeMovie.movieTitle}
                  />
                </div>
              ))}
          </React.Fragment>
        ))}

      <div ref={ref} style={{ width: "100%", height: "10px" }} />
    </div>
  );
}

export default LikeMovieContent;

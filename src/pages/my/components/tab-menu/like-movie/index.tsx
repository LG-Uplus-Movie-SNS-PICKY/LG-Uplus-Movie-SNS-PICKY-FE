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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // // 더미 데이터 정의 (테스트용)
  // const dummyData = {
  //   success: true,
  //   code: 200,
  //   message: "요청이 성공적으로 처리되었습니다.",
  //   data: {
  //     content: [
  //       {
  //         movieLikeId: 99,
  //         movieId: 12445,
  //         movieTitle: "해리 포터와 죽음의 성물 2",
  //         moviePosterUrl: "/ehUeFvQeo8Vr2aDIKLsLbC8okcw.jpg",
  //         movieTotalRating: 2.5,
  //       },
  //       {
  //         movieLikeId: 97,
  //         movieId: 1241982,
  //         movieTitle: "모아나 2",
  //         moviePosterUrl: "/2WVvPcVRqfjyVzIUVIcszGb6zT4.jpg",
  //         movieTotalRating: 2.5,
  //       },
  //       {
  //         movieLikeId: 96,
  //         movieId: 257211,
  //         movieTitle: "인턴",
  //         moviePosterUrl: "/gCmXCNfK1WU1CFjZjvfo3gBhiEa.jpg",
  //         movieTotalRating: 2.5,
  //       },
  //       {
  //         movieLikeId: 95,
  //         movieId: 4935,
  //         movieTitle: "하울의 움직이는 성",
  //         moviePosterUrl: "/3sVFlmzBCZpwlsosKHxyK4d9oDw.jpg",
  //         movieTotalRating: 2.5,
  //       },
  //       {
  //         movieLikeId: 94,
  //         movieId: 158445,
  //         movieTitle: "7번방의 선물",
  //         moviePosterUrl: "/c9TqJPm4pZCuiEXumTayoNIrBSK.jpg",
  //         movieTotalRating: 2.5,
  //       },
  //       {
  //         movieLikeId: 93,
  //         movieId: 330457,
  //         movieTitle: "겨울왕국 2",
  //         moviePosterUrl: "/lVcwSnzhSMWYXUQzyMilCztSE6I.jpg",
  //         movieTotalRating: 2.5,
  //       },
  //       {
  //         movieLikeId: 92,
  //         movieId: 597,
  //         movieTitle: "타이타닉",
  //         moviePosterUrl: "/132KjhVrWUqKFVfMAKKNkherytA.jpg",
  //         movieTotalRating: 2.5,
  //       },
  //     ],
  //   },
  // };

  // // 더미 데이터 테스트용 useEffect
  // useEffect(() => {
  //   // 더미 데이터로 상태 업데이트
  //   const loadDummyData = () => {
  //     try {
  //       setLoading(true);
  //       const movies = dummyData.data.content.map((movie) => ({
  //         movie_id: movie.movieId,
  //         movie_title: movie.movieTitle,
  //         movie_poster_url: `${import.meta.env.VITE_TMDB_IMAGE_URL}${movie.moviePosterUrl}`,
  //       }));
  //       setMovies(movies);
  //     } catch (err) {
  //       setError("더미 데이터를 불러오는 중 오류가 발생했습니다.");
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadDummyData();
  // }, []);

  useEffect(() => {
    if (!nickname) return;

    const loadLikedMovies = async () => {
      try {
        setLoading(true);
        const likedMovies = await fetchLikedMovies(nickname);
        setMovies(likedMovies);
      } catch (err) {
        setError("좋아요한 영화를 불러오는 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadLikedMovies();
  }, [nickname]);

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`); // 클릭 시 영화 상세 페이지로 이동
  };

  return (
    <div css={styles.container()} className={movies.length ? "" : "centered"}>
      {movies.length === 0 && <EmptyLikeMovie />}
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
        ))}
    </div>
  );
}

export default LikeMovieContent;

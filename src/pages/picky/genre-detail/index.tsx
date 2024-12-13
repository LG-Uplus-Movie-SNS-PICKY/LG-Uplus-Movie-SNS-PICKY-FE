import SEO from "@components/seo";
import styles from "./index.styles";

import { GenreDataType } from "@components/genre";
import { genresSelector } from "@recoil/selectors/genresSelector";
import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import { useGenreMovieQuery } from "@hooks/movie";
import Loading from "@components/loading";
import { MovieDataTypes } from "@type/api/movie";
import { MovieItem } from "@stories/movie-item";
import { useInView } from "react-intersection-observer";

function PickyGenreDetailPage() {
  const navigate = useNavigate();
  const { genreId } = useParams(); // 장르 아이디 param

  // React Intersection Observer -> 뷰포트 마지막을 감지하는 라이브러리르
  const { ref: currentPageEndViewport, inView } = useInView({
    threshold: 1.0, // 마지막 요소가 100% 뷰포트에 들어왔을 때 true
  });

  const {
    data: genreMovies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGenreMovieQuery(Number(genreId));
  const [genreName, setGenreName] = useState("");

  const loadable = useRecoilValueLoadable(genresSelector);

  // SEO을 위한 장르 이름 추출 useEffect()
  useEffect(() => {
    if (loadable.state === "hasValue") {
      setGenreName(
        loadable.contents.data.find(
          (genre: GenreDataType) => genre.genreId === Number(genreId)
        ).name
      );
    }
  }, [loadable]);

  // 뷰포트 마지막을 감지할 경우 더 가져올 데이터가 있을 경우에 플레이리스트 데이터 업데이트
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log("Yest");
      fetchNextPage();
    }

    console.log("No");
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!isLoading) {
      console.log(genreMovies);
    }
  }, [isLoading]);

  return (
    <>
      <SEO
        title={`PICKY: ${genreName}`}
        description="사용자님이 원하는 장르의 영화를 찾아보세요"
        url={`/genres/${genreId}`}
      />

      {/* 장르에 해당하는 영화 데이터 출력 */}
      <section css={styles.movies()}>
        <div>
          {isLoading && <Loading />}
          {!isLoading && Array.isArray(genreMovies?.pages[0]?.data.content)
            ? genreMovies?.pages[0]?.data.content.map(
                (movie: MovieDataTypes) => (
                  <MovieItem
                    key={movie.movieId}
                    type="all"
                    src={movie.posterUrl}
                    title={movie.title}
                    name={movie.title}
                    rate={movie.totalRating}
                    like={movie.likes}
                    onClick={() => navigate(`/movie/${movie.movieId}`)}
                  />
                )
              )
            : null}
        </div>

        <div ref={currentPageEndViewport} />
      </section>
    </>
  );
}

export default PickyGenreDetailPage;

//{
//   Array.from({ length: 10 }, (_, idx) => (
//     <React.Fragment key={idx}>
//       {/* Movie Data Mapping */}
//       <div css={styles.movieCard()}>
//         <img src="https://image.tving.com/ntgs/contents/CTC/caim/CAIM1160/ko/20240920/0520/M000289333.jpg/dims/resize/F_webp,400" />
//         <span className="alt-text">asdsda</span>
//       </div>
//     </React.Fragment>
//   ));
// }

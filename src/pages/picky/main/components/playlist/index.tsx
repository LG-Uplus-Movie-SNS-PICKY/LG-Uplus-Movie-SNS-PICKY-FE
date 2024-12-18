import React, { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./index.styles";
import { MovieItem } from "@stories/movie-item";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { usePlaylist } from "@hooks/playlist";
import Loading from "@components/loading";
import { useNavigate } from "react-router-dom";
import { PlaylistDataTypes } from "@type/api/playlist";

// 리액트 쿼리 queryFn
async function fetchMovies(pageParam: number) {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_SERVER_URL
    }/api/movie/playlist?page=${pageParam}&limit=3`
  );
  return data;
}

function PlayListSection() {
  // 리액트 쿼리를 이용한 스크롤 데이터 업데이트
  const {
    data: playlists,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = usePlaylist();

  const navigate = useNavigate();

  // React Intersection Observer -> 뷰포트 마지막을 감지하는 라이브러리르
  const { ref, inView } = useInView({
    threshold: 1.0, // 마지막 요소가 100% 뷰포트에 들어왔을 때 true
  });

  // 뷰포트 마지막을 감지할 경우 더 가져올 데이터가 있을 경우에 플레이리스트 데이터 업데이트
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (!isLoading) console.log(playlists);
  }, [isLoading]);

  if (isLoading) return <Loading />;

  return (
    <div css={styles.container()}>
      {/* Playlist 스크롤링 */}
      {Array.isArray(playlists?.pages) &&
        playlists.pages.map((page, idx) => (
          <React.Fragment key={idx}>
            {Array.isArray(page.data.content) &&
              page.data.content.map((playlist: PlaylistDataTypes) => (
                <div css={styles.playlistCard()} key={playlist.playlistId}>
                  <h3>{playlist.title}</h3>

                  {/* Playlist에 속한 영화 슬라이드 효과 부여 */}
                  <Swiper
                    slidesPerView={3.8}
                    spaceBetween={10}
                    direction={"horizontal"}
                    freeMode={true}
                    modules={[FreeMode, Mousewheel]}
                    mousewheel={{
                      forceToAxis: true,
                    }}
                    css={styles.swiperContainer()}
                  >
                    {playlist.getSimpleMovieResps.length > 0 &&
                      playlist.getSimpleMovieResps.map((movie) => {
                        return (
                          <SwiperSlide key={movie.movieId}>
                            <MovieItem
                              type="basic"
                              src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${
                                movie.posterUrl
                              }`}
                              title={movie.title}
                              name={movie.title}
                              onClick={() =>
                                navigate(`/movie/${movie.movieId}`)
                              }
                            />
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                </div>
              ))}
          </React.Fragment>
        ))}

      {/* 현재 라우트 Viewport 마지막 영역 */}
      <div ref={ref} className="inView"></div>
    </div>
  );
}

export default PlayListSection;

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

interface PlaylistItemTypes {
  [key: string]: unknown;
  movie_id: number;
  movie_poster_url: string;
  movie_title: string;
}

interface PlaylistDataTypes {
  movie_playlist_id: number;
  movie_playlist_title: string;
  movie_playlist_item: PlaylistItemTypes[];
}

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
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["playlist"],
    queryFn: ({ pageParam = 1 }) => fetchMovies(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.nextPage ?? undefined;
    },
  });

  // React Intersection Observer -> 뷰포트 마지막을 감지하는 라이브러리르
  const { ref, inView } = useInView({
    threshold: 1.0, // 마지막 요소가 100% 뷰포트에 들어왔을 때 true
  });

  // 뷰포트 마지막을 감지할 경우 더 가져올 데이터가 있을 경우에 플레이리스트 데이터 업데이트
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <div>로딩 중...</div>;

  if (isError) return <div>에러가 발생했습니다. {error.message}</div>;

  return (
    <div css={styles.container()}>
      {/* 페이지 순회 -> 무한 스크롤링 */}
      {Array.isArray(data?.pages) &&
        data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {/* Playlist Data JSX Element Mapping  */}
            {Array.isArray(page?.data) &&
              page?.data.map((list: PlaylistDataTypes) => (
                <div css={styles.playlistCard()} key={list.movie_playlist_id}>
                  <h3>{list.movie_playlist_title}</h3>
                  {/* Playlist Items Slider Mapping */}
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
                    {list.movie_playlist_item.length > 0 &&
                      list.movie_playlist_item.map((item) => (
                        <SwiperSlide key={item.movie_id}>
                          <MovieItem
                            type="basic"
                            src={`https://image.tmdb.org/t/p/original${item.movie_poster_url}`}
                            title={item.movie_title}
                            name={item.movie_title}
                          />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              ))}
          </React.Fragment>
        ))}

      <div ref={ref}>
        {isFetchingNextPage
          ? "불러오는 중..."
          : hasNextPage
          ? "더 이상 데이터가 없습니다"
          : ""}
      </div>
    </div>
  );
}

export default PlayListSection;

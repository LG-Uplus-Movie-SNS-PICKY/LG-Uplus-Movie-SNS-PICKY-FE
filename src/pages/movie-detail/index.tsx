// pages/MovieDetail/index.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieHeader from "./components/movie-header";
import MoviePoster from "./components/movie-poster";
import MovieRating from "./components/movie-rating";
import MovieInfo from "./components/movie-info";
import MovieReview from "./components/movie-review";
import MovieFooter from "./components/movie-footer";
import {
  MovieDetailContainer,
  ReviewHeader,
  Title,
  ReviewCountContainer,
  ReviewCount,
} from "./index.styles";
import { Button } from "@stories/button";
import { useNavigate, useParams } from "react-router-dom";
import PlusSvg from "@assets/icons/plus.svg?react";
import SEO from "@components/seo";

interface MovieDetailProps {
  imageUrl?: string;
  title?: string;
  year?: string;
  nation?: string;
  production?: string;
  age?: string;
  genre?: string;
  ott?: string[];
  rating?: number;
  content?: string;
  castData?: Array<{ name: string; role: string; image: string }>;
  reviews?: Array<{
    rating: number;
    text: string;
    user: string;
    date: string;
    likes: number;
    dislikes: number;
  }>;
}

function MovieDetail(props: MovieDetailProps) {
  const { id } = useParams(); // URL에서 movieId 추출
  console.log("movieId:", id); // movieId가 undefined인지 확인
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // const handleReviewClick = () => {
  //   navigate(`/movie/${movieId}/review`); // movieId 변수를 사용
  // };

  // 더미 데이터
  const dummyData = {
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/ko/thumb/f/f2/%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg/1200px-%EC%96%B4%EB%B2%A4%EC%A0%B8%EC%8A%A4-_%EC%97%94%EB%93%9C%EA%B2%8C%EC%9E%84_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg",
    title: "어벤져스: 엔드게임",
    year: "2019",
    nation: "미국",
    production: "MARVEL",
    age: "12",
    genre: "액션/모험/SF",
    ott: ["Netflix", "DisneyPlus", "Watcha"],
    rating: 4.0,
    content:
      "인피니티 워 이후 절반만 살아남은 지구, 마지막 희망이 된 어벤져스, 먼저 떠난 그들을 위해 모든 것을 걸었다. 위대한 어벤져스, 운명을 바꿀 최후의 전쟁이 펼쳐진다.",
    castData: [
      {
        name: "조 루소",
        role: "감독",
        image:
          "https://image.cine21.com/resize/cine21/still/2019/0418/14_25_08__5cb80a34c0dcf[X252,310].jpg",
      },
      {
        name: "안소니 루소",
        role: "감독",
        image:
          "https://image.cine21.com/resize/cine21/still/2019/0418/14_24_12__5cb809fc6dad1[X252,310].jpg",
      },
      {
        name: "로버트 다우니 주니어",
        role: "주연 | 토니 스타크/아이언맨",
        image:
          "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201604/21/htm_20160421164314998976.jpg",
      },
      {
        name: "크리스 에반스",
        role: "주연 | 스티브 로저스/ 캡틴 아메리카",
        image:
          "https://i.namu.wiki/i/6vKIsA4CfvqF59ZciHoKZjZwhMj9LOG2FTQv22cOgl1e5lfRrKvgpSHbwbhNORT_auVb9gLDc2Vy29uwhTUWqg.webp",
      },
      {
        name: "크리스 헴스워스",
        role: "주연 | 토르",
        image:
          "https://i.namu.wiki/i/RF2bnphJY00BhrytswngMDRsL_whNOouWTEXlAuQjtYWjzXsVfV_4iwF_CVC-zkujGe9yK0jGPVVihDOG7SBWw.webp",
      },
      {
        name: "스칼렛 요한슨",
        role: "주연 | 나타샤 로마노프/블랙 위도우",
        image:
          "https://fpost.co.kr/board/data/editor/2106/e0692777cc11265ef2fe7df0e9519ef5_1624928133_7986.jpg",
      },
    ],
    reviews: [
      // Add this reviews array
      // {
      //   rating: 4.0,
      //   text: "이 시절 마블 그리워요!!",
      //   user: "jaes****",
      //   date: "2022.12.24",
      //   likes: 18,
      //   dislikes: 0,
      // },
      // {
      //   rating: 4.0,
      //   text: "이 시절 마블 그리워요!!",
      //   user: "kimy****",
      //   date: "2022.12.25",
      //   likes: 12,
      //   dislikes: 2,
      // },
      // {
      //   rating: 5.0,
      //   text: "이 시절 마블 그리워요!!",
      //   user: "parkj****",
      //   date: "2022.12.26",
      //   likes: 30,
      //   dislikes: 3,
      // },
    ],
  };

  useEffect(() => {
    // API 호출
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/movie/${id}`,
          {
            headers: { Authorization: "123" },
          }
        ).then(res => res.data);

        console.log(response)

        setMovieData(response.movie_info); // API에서 반환된 데이터에 맞게 설정
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.message || "Failed to fetch movie data");
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movieData) {
    return <div>No movie data found</div>;
  }

  return (
    <>
      <SEO
        title={`${movieData.original_title}(${movieData.release_date.split("-")[0]})`}
        description={movieData.overview}
        image={movieData.poster_path}
        url={`http://localhost:5173/${location.pathname}`}
      />

      <MovieDetailContainer>
        <MovieHeader />
        <MoviePoster
          imageUrl={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}
          title={movieData.original_title}
          year={new Date(movieData.release_date).getFullYear()} // 년도만 추출
          nation="N/A" // nation 정보가 없다면 기본값 설정
          genre={movieData.genres.map((genre: any) => genre.name).join(", ")} // 장르 이름 표시
          ott={dummyData.ott}
        />

        <MovieRating rating={movieData.rating || 0} />
        <MovieInfo content={movieData.overview} castData={movieData.credits.cast} />
        <ReviewHeader>
          <Title>관람평</Title>
          <ReviewCountContainer>
            <ReviewCount>{dummyData.reviews.length}</ReviewCount>
            <PlusSvg />
          </ReviewCountContainer>
        </ReviewHeader>
        <MovieReview reviews={dummyData.reviews} />
        <Button btnType="More" label="모두 보기"  />
        <MovieFooter
          year={movieData.release_date.split("-")[0]}
          production="N/A" // 제작 정보가 없으므로 기본값 설정
          age="N/A" // 연령 제한 정보가 없으므로 기본값 설정
          genre={movieData.genres.map((genre: any) => genre.name).join(", ")}
        />
      </MovieDetailContainer>
    </>
  );
}

export default MovieDetail;

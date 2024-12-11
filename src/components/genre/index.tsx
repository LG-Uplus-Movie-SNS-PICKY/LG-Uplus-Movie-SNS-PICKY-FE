import { genresSelector } from "@recoil/selectors/genresSelector";
import { useRecoilValueLoadable } from "recoil";
import { GenreTabButton } from "@stories/genre-tab";
import React, { useState } from "react";

// API로 호출된 장르 데이터 타입 정의
export interface GenreDataType {
  genre_id: number;
  genre_name: string;
}

interface GenreButtonsProps {
  onClick: (genreId: number) => void;
}

// 장르 전역 컴포넌트
function GenreButtons({ onClick }: GenreButtonsProps): JSX.Element {
  // 선택된 장르 상태 관리
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  // useRecoilValueLoadable -> 비동기 데이터의 처리 상태와 데이터를 반환
  const loadable = useRecoilValueLoadable(genresSelector);

  if (loadable.state === "loading") return <></>; // 로딩 중
  if (loadable.state === "hasError") return <></>; // 에러 발생

  const genres = loadable.contents.data;

  const handleGenreClick = (genreId: number) => {
    // 선택된 장르 상태 업데이트
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId) // 선택 취소
        : [...prev, genreId] // 새로 선택
    );
    onClick(genreId);
  };

  return genres.length > 0 ? (
    genres.map((genre: GenreDataType) => (
      // 전역 장르 버튼 컴포넌트 정의
      <GenreTabButton
        key={genre.genre_id}
        label={genre.genre_name}
        emoji={genre.genre_name}
        btnType="Rectangle"
        onClick={() => handleGenreClick(genre.genre_id)}
        // 선택 여부에 따라 추가 스타일 전달
        selected={selectedGenres.includes(genre.genre_id)}
      />
    ))
  ) : (
    <></>
  );
}

export default GenreButtons;
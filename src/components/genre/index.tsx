import { genresSelector } from "@recoil/selectors/genresSelector";
import { useRecoilValueLoadable } from "recoil";
import { GenreTabButton } from "@stories/genre-tab";
import { useEffect } from "react";

// API로 호출된 장르 데이터 타입 정의
export interface GenreDataType {
  genreId: number;
  name: string;
}

interface GenreButtonsProps {
  onClick: (genreId: number) => void;
  selectedGenres?: number | number[];
  onInitialGenre?: (genreId: number) => void;
}

// 장르 전역 컴포넌트
function GenreButtons({
  onClick,
  selectedGenres,
  onInitialGenre,
}: GenreButtonsProps): JSX.Element {
  // useRecoilValueLoadable -> 비동기 데이터의 처리 상태와 데이터를 반환
  const loadable = useRecoilValueLoadable(genresSelector);

  useEffect(() => {
    if (loadable.state === "hasValue" && onInitialGenre) {
      onInitialGenre(loadable.contents.data[0].genreId);
    }
  }, [loadable]);

  return loadable.state === "hasValue"
    ? loadable.contents.data.map((genre: GenreDataType) => {
        return (
          // 전역 장르 버튼 컴포넌트 정의
          <GenreTabButton
            key={genre.genreId}
            label={genre.name}
            emoji={genre.name}
            btnType="Rectangle"
            selected={
              Array.isArray(selectedGenres)
                ? selectedGenres.includes(genre.genreId)
                : !selectedGenres
                ? loadable.contents.data[0].genreId === genre.genreId
                : selectedGenres === genre.genreId
            }
            onClick={() => onClick(genre.genreId)}
          />
        );
      })
    : null;
}

export default GenreButtons;

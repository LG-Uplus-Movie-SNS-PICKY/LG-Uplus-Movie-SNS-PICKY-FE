import styles from "./index.styles";

import Star from "@assets/icons/star.svg?react";
import Like from "@assets/icons/like.svg?react";
import Comment from "@assets/icons/comment.svg?react";
import Checked from "@assets/icons/checked-movie.svg?react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useState } from "react";

export interface MovieItemProps {
  type: "basic" | "rate" | "all";
  src: string;
  title: string;
  rate?: number;
  like?: number;
  comment?: number;
  state?: string;
  name: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  onClick?: (movieId?: number) => void;
}

interface RateComponentProps {
  rate: number;
}

interface InfoComponentProps {
  like: number;
  comment: number;
}

// 평점을 보여주는 컴포넌트
function RateComponent({ rate }: RateComponentProps): JSX.Element {
  return (
    <div css={styles.movieItemRate()}>
      <span>평점</span>
      <Star width="12px" />
      <span>{rate.toFixed(1)}</span>
    </div>
  );
}

// 좋아요와 댓글의 개수를 보여주는 컴포넌트
function InfoComponent({ like, comment }: InfoComponentProps): JSX.Element {
  return (
    <div css={styles.movieItemAllInfo()}>
      {/* 좋아요 개수 */}
      <div className="item_layout">
        <Like width="12px" />
        <span>{like}</span>
      </div>

      {/* 댓글 개수 */}
      <div className="item_layout">
        <Comment width="12px" />
        <span>{comment}</span>
      </div>
    </div>
  );
}

export function MovieItem({
  type,
  src,
  title,
  rate = 0,
  like = 0,
  comment = 0,
  state = "abouttime",
  name,
  style,
  disabled,
  isLoading,
  onClick,
}: MovieItemProps): JSX.Element {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      css={styles.movieItemContainer()}
      style={style}
      onClick={() => onClick && onClick()}
    >
      {/* 영화 썸네일 이미지 */}
      <div css={styles.movieItemThumbnail(type === "basic" && state === name)}>
        {type === "basic" && state === name ? <Checked /> : null}
        <LazyLoadImage
          src={`${import.meta.env.VITE_TMDB_IMAGE_URL}${src}`}
          effect={"blur"}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(false)}
        />
        {!imageLoaded && <span className="alt">{title}</span>}
      </div>

      {/* 영화 제목 */}
      {!disabled && <span className="movie-title">{title}</span>}

      {/* Type === "rate" : 별점만 보여주기 */}
      {type !== "basic" && <RateComponent rate={rate} />}

      {/* Type === "all" 별점 + 댓글 수 + 좋아요 수 보여주기 */}
      {type === "all" && <InfoComponent like={like} comment={comment} />}
    </div>
  );
}

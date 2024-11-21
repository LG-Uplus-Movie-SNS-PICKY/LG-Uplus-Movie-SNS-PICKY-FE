export interface MovieItemProps {
  type: "basic" | "rate" | "all";
  rate?: number;
  like?: number;
  comment?: number;
}

interface RateComponentProps {
  count: number;
}

interface InfoComponentProps {
  likeCount: number;
  commentCount: number;
}

// 평점을 보여주는 컴포넌트
function RateComponent({ count }: RateComponentProps): JSX.Element {
  return <></>;
}

// 좋아요와 댓글의 개수를 보여주는 컴포넌트
function InfoComponent({
  likeCount,
  commentCount,
}: InfoComponentProps): JSX.Element {
  return <></>;
}

export function MovieItem({
  type,
  rate,
  like,
  comment,
}: MovieItemProps): JSX.Element {
  return (
    <div>
      {/* 영화 썸네일 이미지 */}
      <div>
        <img />
      </div>

      {/* 영화 제목 */}
      <span></span>

      {/* Type === "rate" : 별점만 보여주기 */}
      <div></div>

      {/* Type === "all" 별점 + 댓글 수 + 좋아요 수 보여주기 */}
      <div></div>
    </div>
  );
}

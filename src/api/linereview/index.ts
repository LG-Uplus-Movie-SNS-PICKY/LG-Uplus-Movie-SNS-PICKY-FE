import apiClient from "@api";

// 특정 영화 한줄평 조회 GET API
export async function fetchLineReviewMovie(
  movieId: number,
  lastReviewId?: number,
  lastCreatedAt?: string
) {
  let params = new URLSearchParams();

  if (lastReviewId && lastCreatedAt) {
    params.append("lastReviewId", lastReviewId.toString());
    params.append("lastCreatedAt", lastCreatedAt.toString());
  }

  const { data } = await apiClient.get(
    `/linereview/movie/${movieId}?${params.toString()}`
  );
  return data;
}

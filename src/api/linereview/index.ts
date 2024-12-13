import apiClient from "@api";

// 특정 영화 상세 조회 GET API
export async function fetchLineReviewMovie(
  movieId: number,
  lastReviewId?: number,
  lastCreatedAt?: number
) {
  const params = new URLSearchParams();

  if (lastReviewId && lastCreatedAt) {
    params.append("lastReviewId", lastReviewId.toString());
    params.append("lastCreatedAt", lastCreatedAt.toString());
  }

  const { data } = await apiClient.get(`/linereview/movie/${movieId}`);
  return data;
}

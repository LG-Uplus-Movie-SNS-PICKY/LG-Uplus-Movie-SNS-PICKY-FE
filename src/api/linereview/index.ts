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

// 한줄평 생성 API
export async function createLineReview(reviewData: {
  movieId: number;
  rating: number;
  context: string;
  isSpoiler: boolean;
}) {
  const { data } = await apiClient.post("/linereview/create", reviewData);
  return data;
}

// 한줄평 좋아요/싫어요 API
export async function toggleLineReviewLike(lineReviewId: number, preference: "LIKE" | "DISLIKE") {
  const params = {
    lineReviewId,
    preference,
  };

  const { data } = await apiClient.post("/linereviewlike", params);
  return data;
}

// 영화 평점 분포 API 요청
export async function fetchRatings(movieId: number) {
  const { data } = await apiClient.get(`/linereview/movie/${movieId}/ratings`);
  return data.data;
}

// 영화 성별 분포 API 요청
export async function fetchGenders(movieId: number) {
  const { data } = await apiClient.get(`/linereview/movie/${movieId}/genders`);
  return data.data; 
}
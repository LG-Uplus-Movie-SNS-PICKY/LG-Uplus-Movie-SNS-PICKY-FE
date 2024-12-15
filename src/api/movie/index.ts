import apiClient from "@api";

// Top 10 Movie 조회 GET API
export async function fetchTopMovie() {
  const { data } = await apiClient.get("/movie/top10");
  return data;
}

// 사용자 추천 영화 조회 GET API
export async function fetchRecommendMovie() {
  const { data } = await apiClient.get("/movie/recommend");
  return data;
}

// 장르별 영화 조회 GET API
export async function fetchGenreMovie(
  genreId: number,
  lastMovieId: number,
  lastLikeCount: number
) {
  const params = new URLSearchParams({ genreId: genreId.toString() });

  if (lastMovieId && lastLikeCount) {
    params.append("lastMovieId", lastMovieId.toString());
    params.append("lastLikeCount", lastLikeCount.toString());
  }

  const { data } = await apiClient.get(`/movie/genre?${params.toString()}`);
  return data;
}

// 영화 상세 조회 GET API
export async function fetchMovieDetail(movieId: number) {
  const { data } = await apiClient.get(`/movie/${movieId}`);
  return data;
}

// 영화 좋아요 API
export async function toggleMovieLike(movieId: number): Promise<{ success: boolean; message: string }> {
  try {
    const { data } = await apiClient.post(`/movie/${movieId}/like`);
    return data;
  } catch (error: any) {
    console.error("영화 좋아요 상태 변경 실패:", error);
    throw error;
  }
}
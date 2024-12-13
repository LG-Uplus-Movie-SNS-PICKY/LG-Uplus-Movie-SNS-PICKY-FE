import apiClient from "@api";

// Top 10 Movie 조회 GET
export async function fetchTopMovie() {
  const { data } = await apiClient.get("/movie/top10");
  return data;
}

// 사용자 추천 영화 조회 GET
export async function fetchRecommendMovie() {
  const { data } = await apiClient.get("/movie/recommend");
  return data;
}

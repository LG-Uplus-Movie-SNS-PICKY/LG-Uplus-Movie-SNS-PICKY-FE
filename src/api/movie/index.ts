import apiClient from "@api";

// Top 10 Movie 조회
export async function fetchTopMovie() {
  const { data } = await apiClient.get("/best/movie");
  return data;
}

import apiClient from "@api";

// Top 10 Movie 조회
export async function fetchTop10Movie() {
  const { data } = await apiClient.get("/best/movie");
  return data;
}

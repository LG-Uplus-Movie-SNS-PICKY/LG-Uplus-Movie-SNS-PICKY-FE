import apiClient from "@api";

// 플레이리스트 조회 API 호출
export async function fetchPlaylists(lastPlaylistId: number) {
  const params = new URLSearchParams();

  // lastPlaylistId가 입력되면 해당 값을 Query String에 포함시킨다.
  if (lastPlaylistId) {
    params.append("last-playlist-id", lastPlaylistId.toString());
  }

  const { data } = await apiClient.get(`/playlist/all?${params.toString()}`);

  return data;
}

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

// 플레이리스트 추가를 위한 POST API
export async function fetchCreatePlaylist(title: string, movieIds: number[]) {
  const { data } = await apiClient.post("/admin/playlist", {
    title,
    movieIds,
  });

  return data;
}

// 플레이리스트 업데이트를 위한 PATCH API
export async function fetchUpdatePlaylist(
  playlistId: number,
  title: string,
  movieIds: number[]
) {
  const { data } = await apiClient.patch("/admin/playlist", {
    playlistId,
    title,
    movieIds,
  });

  return data;
}

// 영화 삭제
export async function fetchDeletePlaylist(playlistId: number) {
  const { data } = await apiClient.delete(
    `/admin/playlist/${playlistId}`
  );
  return data;
}

// 영화 조회 API 호출
export async function fetchCallPlaylist(
  lastMovieId?: number,
  createdAt?: string,
  size: number = 10
) {
  const params = new URLSearchParams();

  if (lastMovieId) {
    params.append("last-movie-id", lastMovieId.toString());
  }
  if (createdAt) {
    params.append("created-at", createdAt);
  }
  params.append("size", size.toString());

  const { data } = await apiClient.get(`/admin/playlist/movies?${params.toString()}`);
  return data;
}
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

export async function fetchCreatePlaylist(movieIds: number[], title: string) {
  try {
    console.log("API 요청 데이터:", { title, movieIds });
    console.log("movieIds 배열:", movieIds);
    const response = await apiClient.post("/admin/playlist", {
      movieIds, // JSON 형식에 맞게 전달
      title,
    });
    console.log("API 응답 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("플레이리스트 생성 요청 중 오류 발생:", error);
    throw error; // 상위에서 에러 처리
  }
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
  const { data } = await apiClient.delete(`/admin/playlist/${playlistId}`);
  return data;
}

// 영화 조회 API 호출
export async function fetchCallPlaylist(
  lastMovieId?: number,
  createdAt?: string,
  size: number = 10
) {
  const { data } = await apiClient.get("/admin/playlist/movies", {
    params: {
      ...(lastMovieId && { "last-movie-id": lastMovieId }),
      ...(createdAt && { "created-at": createdAt }),
      size,
    },
  });
  return data;
}

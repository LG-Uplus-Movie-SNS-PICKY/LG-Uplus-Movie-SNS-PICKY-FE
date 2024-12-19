import axios from "axios";

// 비하인드 영상 Playlist 동영상 가져오기
export async function fetchBehindVideos(
  playlistId: string,
  apiKey: string
): Promise<string[]> {
  try {
    const { data } = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet",
          playlistId,
          key: apiKey,
          maxResults: 5,
        },
      }
    );

    if (!data || !data.items) {
      throw new Error("API 응답에 items가 없습니다.");
    }

    // videoId 추출
    const videoIds = data.items
      .map((item: any) => {
        const videoId = item.snippet?.resourceId?.videoId;
        if (!videoId) {
          return null;
        }
        return videoId;
      })
      .filter(Boolean); // null 값 제거

    return videoIds;
  } catch (error: any) {
    throw error;
  }
}

// OST Playlist 동영상 가져오기
export async function fetchOstVideos(
  playlistId: string,
  apiKey: string
): Promise<any[]> {
  try {
    const { data } = await axios.get(
      "https://www.googleapis.com/youtube/v3/playlistItems",
      {
        params: {
          part: "snippet",
          playlistId,
          key: apiKey,
          maxResults: 10,
        },
      }
    );

    if (!data || !data.items) {
      throw new Error("API 응답에 items가 없습니다.");
    }

    return data.items;
  } catch (error: any) {
    throw error;
  }
}

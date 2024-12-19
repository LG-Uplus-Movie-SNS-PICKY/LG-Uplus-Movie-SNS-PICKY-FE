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
          console.warn("videoId를 찾을 수 없습니다:", item);
          return null;
        }
        return videoId;
      })
      .filter(Boolean); // null 값 제거

    return videoIds;
  } catch (error: any) {
    console.error(
      "비하인드 영상 가져오기 실패:",
      error.response?.data || error.message
    );
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

    console.log("OST 동영상 데이터:", data.items);
    return data.items;
  } catch (error: any) {
    console.error(
      "OST 동영상 가져오기 실패:",
      error.response?.data || error.message
    );
    throw error;
  }
}

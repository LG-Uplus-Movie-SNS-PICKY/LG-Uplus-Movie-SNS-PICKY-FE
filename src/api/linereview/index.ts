import apiClient from "@api";

// 특정 영화 한줄평 조회 GET API
export async function fetchLineReviewMovie(
  movieId: number,
  lastReviewId?: number,
  lastCreatedAt?: string,
  sortType: string = "LATEST"
) {
  let params = new URLSearchParams({ sortType });

  if (lastReviewId && lastCreatedAt) {
    // 최신순으로 정렬을 할 경우
    if (sortType === "LATEST") {
      params.append("lastReviewId", lastReviewId.toString());
      params.append("lastCreatedAt", lastCreatedAt.toString());
    }

    // 좋아요순으로 정렬을 할 경우
    else {
      params.append("lastReviewId", lastReviewId.toString());
    }
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
export async function toggleLineReviewLike(
  lineReviewId: number,
  preference: "LIKE" | "DISLIKE"
) {
  const params = {
    lineReviewId,
    preference,
  };

  try {
    const { data } = await apiClient.post("/linereviewlike", params);
    return data;
  } catch (error: any) {
    // console.error("API 요청 본문:", params); // 요청 데이터 확인
    // console.error("API 응답 오류:", error.response?.data || error.message); // 응답 데이터 확인
    throw error; // 에러 다시 던지기
  }
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

// 특정 유저의 한줄평 조회 GET API
export async function fetchLineReviewsByUser(
  nickname: string,
  lastReviewId?: number
) {
  const params = new URLSearchParams({ size: "10" });

  if (lastReviewId) {
    params.append("lastReviewId", lastReviewId.toString());
  }

  const { data } = await apiClient.get(
    `/linereview/user/${nickname}?${params.toString()}`
  );
  return data;
}

// 한줄평 수정 PATCH API
export async function updateLineReview(
  linereviewId: number,
  updatedData: { context: string; isSpoiler: boolean }
) {
  try {
    const response = await apiClient.patch(
      `/linereview/${linereviewId}`,
      updatedData
    );
    return response.data; // 서버 응답 데이터 반환
  } catch (error: any) {
    throw error;
  }
}

// 한줄평 삭제 DELETE API
export async function deleteLineReview(lineReviewId: number) {
  try {
    const { data } = await apiClient.delete(
      `/linereview/delete/${lineReviewId}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

// 특정 유저의 무비로그(게시글) 조회 GET API
export const fetchUserBoards = async (
  nickname: string,
  size: number = 10,
  lastBoardId: number | null = null
) => {
  try {
    const response = await apiClient.get(`/board/user/${nickname}`, {
      params: {
        size,
        lastBoardId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

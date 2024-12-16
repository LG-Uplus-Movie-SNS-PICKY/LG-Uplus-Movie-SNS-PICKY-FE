import apiClient from "@api";

// 특정 영화 한줄평 조회 GET API
export async function fetchLineReviewMovie(
  movieId: number,
  lastReviewId?: number,
  lastCreatedAt?: string
) {
  let params = new URLSearchParams();

  if (lastReviewId && lastCreatedAt) {
    params.append("lastReviewId", lastReviewId.toString());
    params.append("lastCreatedAt", lastCreatedAt.toString());
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
export async function toggleLineReviewLike(lineReviewId: number, preference: "LIKE" | "DISLIKE") {
  const params = {
    lineReviewId,
    preference,
  };

  try {
    const { data } = await apiClient.post("/linereviewlike", params);
    console.log("API 요청 성공:", data); // 성공 로그
    return data;
  } catch (error: any) {
    console.error("API 요청 본문:", params); // 요청 데이터 확인
    console.error("API 응답 오류:", error.response?.data || error.message); // 응답 데이터 확인
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
  size: number = 10,
  lastReviewId?: number,
  lastCreatedAt?: string
) {
  const params = new URLSearchParams();
  params.append("size", size.toString());

  if (lastReviewId) {
    params.append("lastReviewId", lastReviewId.toString());
  }
  if (lastCreatedAt) {
    params.append("lastCreatedAt", lastCreatedAt);
  }

  try {
    const { data } = await apiClient.get(`/linereview/user/${nickname}?${params.toString()}`);
    console.log("API Response:", data);

    // 응답 데이터 구조 확인 및 파싱
    if (data?.data?.content) {
      return {
        context: data.data.content, // 리뷰 데이터
        lastCursor: data.data.pageable, // 페이징 정보
      };
    } else {
      console.error("API 응답 구조가 예상과 다릅니다:", data);
      throw new Error("API 응답 오류");
    }
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
}

// 한줄평 수정 PATCH API
export async function updateLineReview(
  linereviewId: number,
  updatedData: { context: string; isSpoiler: boolean }
) {
  try {
    const response = await apiClient.patch(`/linereview/${linereviewId}`, updatedData);
    return response.data; // 서버 응답 데이터 반환
  } catch (error: any) {
    console.error("PATCH 요청 오류:", error.response?.data || error.message);
    throw error;
  }
}

// 한줄평 삭제 DELETE API
export async function deleteLineReview(lineReviewId: number) {
  try {
    const { data } = await apiClient.delete(`/linereview/${lineReviewId}`);
    return data;
  } catch (error) {
    console.error("한줄평 삭제 중 오류 발생:", error);
    throw error;
  }
}
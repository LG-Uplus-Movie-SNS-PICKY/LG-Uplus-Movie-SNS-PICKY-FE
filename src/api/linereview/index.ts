import apiClient from "@api";

// // 특정 영화 한줄평 조회 GET API
// export async function fetchLineReviewMovie(
//   movieId: number,
//   lastReviewId?: number,
//   lastCreatedAt?: string
// ) {
//   let params = new URLSearchParams();

//   if (lastReviewId && lastCreatedAt) {
//     params.append("lastReviewId", lastReviewId.toString());
//     params.append("lastCreatedAt", lastCreatedAt.toString());
//   }

//   const { data } = await apiClient.get(
//     `/linereview/movie/${movieId}?${params.toString()}`
//   );
//   return data;
// }

// 특정 영화 한줄평 조회 GET API
// export async function fetchLineReviewMovie(
//   movieId: number,
//   lastReviewId?: number,
//   lastCreatedAt?: string,
//   includeSpoilers?: boolean,
//   sortBy?: string
// ) {
//   const params = new URLSearchParams();

//   if (lastReviewId && lastCreatedAt) {
//     params.append("lastReviewId", lastReviewId.toString());
//     params.append("lastCreatedAt", lastCreatedAt);
//   }

//   if (includeSpoilers !== undefined) {
//     params.append("includeSpoilers", includeSpoilers.toString());
//   }

//   if (sortBy) {
//     params.append("sortBy", sortBy);
//   }

//   console.log("API 요청 파라미터:", params.toString()); // 디버깅

//   try {
//     const { data } = await apiClient.get(
//       `/linereview/movie/${movieId}?${params.toString()}`
//     );

//     console.log("API 응답 데이터:", data); // 디버깅
//     return data;
//   } catch (error) {
//     console.error("API 호출 실패:", error); // 오류 처리
//     throw error; // 에러를 던져 `useInfiniteQuery`에서 처리하도록 함
//   }
// }

export async function fetchLineReviewMovie(
  movieId: number,
  lastReviewId?: number,
  lastCreatedAt?: string,
  includeSpoilers: boolean = false, // 기본값 설정
  sortBy: string = "likes" // 기본값 설정
) {
  const params = new URLSearchParams();

  if (lastReviewId && lastCreatedAt) {
    params.append("lastReviewId", lastReviewId.toString());
    params.append("lastCreatedAt", lastCreatedAt);
  }

  params.append("includeSpoilers", includeSpoilers.toString());
  params.append("sortBy", sortBy);

  console.log("API 요청 파라미터:", params.toString()); // 디버깅

  try {
    const { data } = await apiClient.get(
      `/linereview/movie/${movieId}?${params.toString()}`
    );

    console.log("API 응답 데이터:", data); // 디버깅
    return data;
  } catch (error) {
    console.error("API 호출 실패:", error); // 오류 처리
    throw error; // 에러를 던져 `useInfiniteQuery`에서 처리하도록 함
  }
}
import apiClient from "@api";
import { MovieDetailTypes } from "@type/api/movie";
import axios from "axios";

// 영화 등록 POST API
export async function fetchMovieCreate(
  movieInfo: Record<string, boolean>,
  trailer: string,
  ost: string,
  behind: string[],
  streaming: Record<string, boolean>
) {
  const { data } = await apiClient.post("/movie", {
    movie_info: movieInfo,
    trailer,
    ost,
    movie_behind_videos: behind,
    streaming_platform: streaming,
  });

  return data;
}

// 영화 정보 수정 PATCH API
export async function fetchMovieDetailUpdate(
  movieId: number,
  movieInfo: MovieDetailTypes
) {
  // console.log(movieInfo);
  const { data } = await apiClient.patch(`/movie/${movieId}`, movieInfo);
  return data;
}

// Top 10 Movie 조회 GET API
export async function fetchTopMovie() {
  const { data } = await apiClient.get("/movie/top10");
  return data;
}

// 사용자 추천 영화 조회 GET API
export async function fetchRecommendMovie() {
  const { data } = await apiClient.get("/movie/recommend");
  return data;
}

// 장르별 영화 조회 GET API
export async function fetchGenreMovie(
  genreId: number,
  lastMovieId: number,
  lastLikeCount: number
) {
  const params = new URLSearchParams({ genreId: genreId.toString() });

  if (lastMovieId && lastLikeCount) {
    params.append("lastMovieId", lastMovieId.toString());
    params.append("lastLikeCount", lastLikeCount.toString());
  }

  const { data } = await apiClient.get(`/movie/genre?${params.toString()}`);
  return data;
}

// TMDB 영화 조회 GET API
export async function fetchSearchMovie(movieSearch: string) {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: movieSearch,
        language: "ko-KR",
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
    }
  );

  return data.results;
}

// TMDB 영화 상세 조회 GET API
export async function fetchMovieDetailInfo(movieId: number) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      params: {
        append_to_response: "credits",
        language: "ko-KR",
      },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      },
    }
  );

  return data;
}

// 모든 게시글 조회 API
// lastBoardId -> 마지막 게시물 아이디 값을
export async function fetchAllData(lastBoardId: number) {
  const param = new URLSearchParams(); // ?id=${id}

  // lastBoardId가 존재한다면 params에 추가하겠습니다.
  if (lastBoardId) {
    param.append("lastBoardId", lastBoardId.toString());
  }

  const { data } = await apiClient.get(`/board/all?${param.toString()}`); // /board/all? //board/adll?last={}
  return data;
}

// 게시글 삭제 API
export async function deletePost(boardId: number) {
  const { data } = await apiClient.delete(`/board/${boardId}`);
  return data;
}

// 게시글 좋아요/좋아요 취소 API
export async function toggleLike(boardId: number) {
  const { data } = await apiClient.post(`/board/${boardId}/likes`);
  return data;
}

// 영화 상세 조회 GET API
export async function fetchMovieDetail(movieId: number) {
  const { data } = await apiClient.get(`/movie/${movieId}`);
  return data;
}

// 영화 좋아요 API
export async function toggleMovieLike(
  movieId: number
): Promise<{ success: boolean; message: string }> {
  try {
    const { data } = await apiClient.post(`/movie/${movieId}/like`);
    return data;
  } catch (error: any) {
    console.error("영화 좋아요 상태 변경 실패:", error);
    throw error;
  }
}

//무비로그 댓글 조회
export async function fetchComments(
  boardId: number,
  size: number = 10,
  lastCommentId?: number
) {
  try {
    const params = new URLSearchParams({ size: size.toString() });

    if (lastCommentId) {
      params.append("lastCommentId", lastCommentId.toString());
    }

    const { data } = await apiClient.get(
      `/board/${boardId}/comments?${params.toString()}`
    );

    return data;
  } catch (error) {
    console.error("댓글 조회 중 오류 발생:", error);
    throw error;
  }
}

// 댓글 생성 POST API
export async function createComment(boardId: number, content: string) {
  try {
    const { data } = await apiClient.post(`/board/${boardId}/comment`, {
      content,
    });
    return data;
  } catch (error) {
    console.error("댓글 작성 중 오류 발생:", error);
    throw error;
  }
}

// 댓글 삭제 DELETE API
export async function deleteComment(
  boardId: number,
  commentId: number
): Promise<void> {
  try {
    await apiClient.delete(`/board/${boardId}/comments/${commentId}`);
  } catch (error) {
    console.error("댓글 삭제 중 오류 발생:", error);
    throw error;
  }
}

// 게시글 생성 API 호출
export const createBoard = async (
  boardContext: string,
  movieId: number,
  isSpoiler: boolean,
  mediaFiles: File[]
) => {
  const formData = new FormData();

  // JSON 데이터 추가
  const jsonData = {
    boardContext,
    movieId,
    isSpoiler,
  };

  formData.append(
    "request",
    new Blob([JSON.stringify(jsonData)], { type: "application/json" })
  );

  // 이미지 및 비디오 파일 추가
  if (mediaFiles.length > 0) {
    mediaFiles.forEach((file) => {
      const types = file.type;

      if (types.startsWith("image/")) formData.append("image", file);
      if (types.startsWith("video/")) formData.append("video", file);
    });
  }

  console.log("Current formData is Images:");
  console.log(formData.getAll("image"));

  console.log("Current formData is Videos:");
  console.log(formData.getAll("video"));

  // API 요청
  const response = await apiClient.post("/board", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// 게시글 수정 API
export const updateBoard = async (
  boardId: number,
  boardContext: string,
  isSpoiler: boolean
) => {
  try {
    const { data } = await apiClient.post(`/board/${boardId}`, {
      boardContext,
      isSpoiler,
    });
    return data;
  } catch (error) {
    console.error("게시글 수정 중 오류 발생:", error);
    throw error;
  }
};

// 좋아요한 영화 목록 조회 API
export async function fetchLikedMovies(nickname: string) {
  try {
    const { data } = await apiClient.get(`/movie/user/${nickname}`);

    // 응답 데이터 가공
    const movies = data?.data?.content?.map((movie: any) => ({
      movie_id: movie.movieId,
      movie_title: movie.movieTitle,
      movie_poster_url: `${import.meta.env.VITE_TMDB_IMAGE_URL}${
        movie.moviePosterUrl
      }`, // 포스터 URL 완성
      movie_total_rating: movie.movieTotalRating,
    }));

    return movies || []; // 결과가 없으면 빈 배열 반환
  } catch (error) {
    console.error("좋아요한 영화 조회 중 오류 발생:", error);
    throw error;
  }
}

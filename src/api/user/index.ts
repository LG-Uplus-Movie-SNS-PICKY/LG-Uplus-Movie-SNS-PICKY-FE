import apiClient from "@api";

// 닉네임 중복 체크를 위한 GET API
export async function fetchNicknameValidation(nickname: string) {
  const { data } = await apiClient.get("/user/nickname-validation", {
    params: {
      nickname,
    },
  });

  return data;
}

// 장르 정보를 가져오는 GET API
export async function fetchGenres() {
  const { data } = await apiClient.get("/user/genres");
  return data;
}

// 선택한 장르에 맞는 영화 정보를 가져오는 POST API
export async function fetchMoviesByGenre(favoriteGenres: number[]) {
  const { data } = await apiClient.post("/user/movies-by-genres", {
    genreIds: favoriteGenres,
  });

  return data;
}

// 사용자의 정보를 가져오는 GET API
export async function fetchGetUserInfo() {
  const { data } = await apiClient.get("/user");
  return data;
}

// 사용자의 모든 정보를 보내는 PATCH API
export async function fetchSignUpUser(formData: FormData) {
  const { data } = await apiClient.patch("/user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

// 사용자 프로필 (닉네임, 프로필 사진)를 보내는 PATCH API
export async function fetchProfileUser(formData: FormData) {
  const { data } = await apiClient.patch("/user/mypage", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

// 마이페이지 (게시글 수, 팔로워 수, 팔로잉 수)를 가져오는 GET API
export async function fetchUserInfo(nickname: string) {
  const { data } = await apiClient.get(`/user/mypage/${nickname}`);
  return data;
}

/** 영화 검색 API */
export async function fetchMovieSearch(keyword: string) {
  const { data } = await apiClient.get("/api/v1/movie/search", {
    params: { keyword },
  });
  return data;
}

/** 사용자 검색 API */
export async function fetchUserSearch(keyword: string) {
  const { data } = await apiClient.get("/api/v1/user/search", {
    params: { keyword },
  });
  return data;
}
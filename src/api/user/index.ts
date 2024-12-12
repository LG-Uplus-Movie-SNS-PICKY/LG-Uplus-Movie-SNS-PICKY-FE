import apiClient from "@api";

// 닉네임 중복 체크를 위한 GEÍT API
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

// 사용자의 모든 정보를 보내는 PATCH API
export async function fetchSignUpUser(formData: FormData) {
  const { data } = await apiClient.patch(
    `${import.meta.env.VITE_SERVER_URL}/api/v1/user`,
    formData
  );
  
  return data;
}

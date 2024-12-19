import apiClient from "@api";
import { getCookie } from "@util/cookie";
import { isEmpty } from "lodash";

// 닉네임 중복 체크를 위한 GET API
export async function fetchNicknameValidation(nickname: string) {
  const token = getCookie("token") || {};
  const user = getCookie("user") || {};
  let accessToken;

  if (!isEmpty(token) && isEmpty(user)) {
    accessToken = token.localJwtDto.accessToken;
  }

  if (isEmpty(token) && !isEmpty(user)) {
    accessToken = user.localJwtDto.accessToken;
  }

  const { data } = await apiClient.get("/user/nickname-validation", {
    params: {
      nickname,
    },
    headers: { Authorization: `Bearer ${accessToken}` },
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
  const token = getCookie("token") || {};

  if (!isEmpty(token)) {
    const { data } = await apiClient.post(
      "/user/movies-by-genres",
      {
        genreIds: favoriteGenres,
      },
      { headers: { Authorization: `Bearer ${token.localJwtDto.accessToken}` } }
    );

    return data;
  }

  return;
}

// 사용자의 정보를 가져오는 GET API
export async function fetchGetUserInfo() {
  const token = getCookie("token") || {};
  const user = getCookie("user") || {};
  let accessToken;

  if (!isEmpty(token) && isEmpty(user)) {
    accessToken = token.localJwtDto.accessToken;
  }

  if (isEmpty(token) && !isEmpty(user)) {
    accessToken = user.localJwtDto.accessToken;
  }

  const { data } = await apiClient.get("/user", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return data;
}

// 회원가입 완료 후 사용자에게 감사 이메일 발송 POSTAPI
export async function fetchPostRegisterUserEmail() {
  const { data } = await apiClient.post("/email/register");
  return data;
}

// 사용자의 모든 정보를 보내는 PATCH API
export async function fetchSignUpUser(formData: FormData) {
  const token = getCookie("token") || {};
  const user = getCookie("user") || {};
  let accessToken;

  if (!isEmpty(token) && isEmpty(user))
    accessToken = token.localJwtDto.accessToken;
  if (isEmpty(token) && !isEmpty(user))
    accessToken = user.localJwtDto.accessToken;

  const { data } = await apiClient.patch("/user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
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

// 마이페이지에서 유저 정보를 가져오는 GET API
export async function fetchUserInfo(nickname: string) {
  const { data } = await apiClient.get(`/user/mypage/${nickname}`);
  return data;
}

// 회원탈퇴 DELETE API
export async function cancelMembership(platform: string, oAuth2Token: any) {
  const response = await apiClient.delete(`/oauth/${platform}/user`, {
    data: { oAuth2Token }, // DELETE 메서드의 경우, data로 payload를 전달해야 합니다.
  });
  return response.data;
}

/** 영화 검색 API */
export async function fetchMovieSearch(keyword: string) {
  const { data } = await apiClient.get(`/movie/search`, {
    params: { keyword },
  });

  return data.data;
}

/** 유저 검색 API */
export async function fetchUserSearch(keyword: string) {
  const { data } = await apiClient.get(`/user/search`, {
    params: { keyword }, // 인코딩하지 않고 전달
  });

  return data.data;
}

// 팔로우 신청/삭제 API
export async function toggleFollow(followingId: number) {
  const tokenString = getCookie("user");
  let accessToken = "";

  if (tokenString) {
    const token =
      typeof tokenString === "string" ? JSON.parse(tokenString) : tokenString;
    accessToken = token.localJwtDto?.accessToken;
    if (!accessToken) throw new Error("유효한 액세스 토큰이 없습니다.");
  } else {
    throw new Error("인증 정보가 없습니다.");
  }

  const { data } = await apiClient.post(
    "/follow",
    {}, // 본문 비움
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { followingId }, // 쿼리 파라미터로 followingId 전달
    }
  );

  return data;
}

// 사용자의 팔로워 목록을 가져오는 API
export const fetchFollowersList = async (
  nickname: string,
  lastFollowerId: number
) => {
  const params = new URLSearchParams({ size: "10" });

  if (lastFollowerId) {
    params.append("lastFollowerId", lastFollowerId.toString());
  }

  const { data } = await apiClient.get(
    `/follow/followers/${nickname}?${params.toString()}`
  );
  return data;
};

// 사용자의 팔로잉 목록을 가져오는 API
export const fetchFollowingsList = async (
  nickname: string,
  lastFollowerId: number
) => {
  const params = new URLSearchParams({ size: "10" });

  if (lastFollowerId) {
    console.log(lastFollowerId);
    params.append("lastFollowingId", lastFollowerId.toString());
  }

  const { data } = await apiClient.get(
    `/follow/followings/${nickname}?${params.toString()}`
  );

  return data;
};

import apiClient from "@api";

export async function fetchNicknameValidation(nickname: string) {
    const { data } = await apiClient.get('/user/nickname-validation', {
        params: {
            nickname
        }, 
    });

    return data
}


// const response = await axios.get(
//     `${import.meta.env.VITE_SERVER_URL}/api/v1`,
//     {
//       params: {
//         nickname,
//       },
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );

//   export async function fetchTopMovie() {
//     const { data } = await apiClient.get("/best/movie");
//     return data;
//   }
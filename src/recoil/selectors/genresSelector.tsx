import { selector } from "recoil";
import axios from "axios";

// 장르는 관리자가 추가하지 않는 이상 정적 데이터에 가깝기 때문에 읽기 전용 전역 상태 값을 생성한다.
export const genresSelector = selector({
  key: "genresSelector",
  get: async () => {
    // 장르 API 호출
    return await axios.get("/api/movie/genre").then((res) => res);
  },
});

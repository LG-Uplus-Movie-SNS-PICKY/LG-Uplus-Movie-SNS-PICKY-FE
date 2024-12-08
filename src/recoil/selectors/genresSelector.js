var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { selector } from "recoil";
import axios from "axios";
// 장르는 관리자가 추가하지 않는 이상 정적 데이터에 가깝기 때문에 읽기 전용 전역 상태 값을 생성한다.
export const genresSelector = selector({
    key: "genresSelector",
    get: () => __awaiter(void 0, void 0, void 0, function* () {
        // 장르 API 호출
        return yield axios
            .get("https://api.picky-movie.com/api/v1/user/genres")
            .then((res) => res);
    }),
});

import { useEffect, useState } from "react";
import axios from "axios";

import User from "@assets/icons/dashboard/list-item/user.svg?react";
import ReportUser from "@assets/icons/dashboard/list-item/report-user.svg?react";
import AccountUser from "@assets/icons/dashboard/list-item/account-suspended-user.svg?react";

import Genre from "@assets/icons/dashboard/list-item/genre.svg?react";
import Movie from "@assets/icons/dashboard/list-item/moive.svg?react";
import PlayList from "@assets/icons/dashboard/list-item/playlist.svg?react";

import Review from "@assets/icons/dashboard/list-item/review.svg?react";
import ReportReview from "@assets/icons/dashboard/list-item/report_review.svg?react";

import MovieLog from "@assets/icons/dashboard/list-item/movie_log.svg?react";
import ReportMovieLog from "@assets/icons/dashboard/list-item/report-movie_log.svg?react";

import { DashboardAPIResponse, DashboardInfoListTypes } from "../type/index.d";
import { RESPONSE_DATA } from "../constant";

// Dasahboard List Item을 구성할 데이터 API Custom Hook
// Todo -> React Query로 수정
function useDashboardData() {
  const [listItemData, setListItemData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 의존성 배열을 비워둠으로 컴포넌트 생성 시 딱 한번만 API 호출
  useEffect(() => {
    // API 함수 선언
    async function fetchAndProcessData() {
      // 불러오기 시작하기 전에 loading과 error 상태를 초기화 시킨다.
      setIsLoading(true);
      setError(null);

      // 예외 처리
      try {
        const response = await RESPONSE_DATA;
        const {
          userData,
          movieData,
          reviewData,
          movieLogData,
        }: DashboardAPIResponse = response;

        // const data: DashboardInfoListTypes = [
        //   {
        //     listTitle: "USER",
        //     listItem: {
        //       itemIcon:
        //     }
        //   }
        // ]
      } catch (error) {
      } finally {
        // finally 키워드를 통해 loading 상태는 무조건 끝낸다.
        setIsLoading(false);
      }
    }

    // API 함수 호출
    fetchAndProcessData();
  }, []);

  // { API 데이터, loading 상태, Error } 반환
  return {};
}

export default useDashboardData;

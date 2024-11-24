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
function useDashboardData(): { listItemData: DashboardInfoListTypes[] } {
  const [listItemData, setListItemData] = useState<DashboardInfoListTypes[]>(
    []
  );
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

        const data: DashboardInfoListTypes[] = [
          {
            listTitle: "USER",
            listItem: [
              {
                itemIcon: User,
                itemBgColor:
                  "linear-gradient(180deg, #87C3E2 0%, #007BFF 100%)",
                itemTitle: "사용자",
                itemTotalCount: 2170,
                subItems: [
                  { subItemTitle: "일반 사용자", subItemTotalCount: 1938 },
                  { subItemTitle: "평론가", subItemTotalCount: 215 },
                  { subItemTitle: "관리자", subItemTotalCount: 17 },
                ],
              },

              {
                itemIcon: ReportUser,
                itemBgColor:
                  "linear-gradient(180deg, #FFC766 0%, #FFA500 100%)",
                itemTitle: "신고",
                itemTotalCount: 294,
                subItems: [
                  { subItemTitle: "처리 완료", subItemTotalCount: 72 },
                  { subItemTitle: "처리 미완료", subItemTotalCount: 224 },
                ],
              },

              {
                itemIcon: AccountUser,
                itemBgColor:
                  "linear-gradient(180deg, #FF706C 0%, #E53935 100%)",
                itemTitle: "정지 사용자",
                itemTotalCount: 78,
                subItems: [
                  { subItemTitle: "이의 신청 정보", subItemTotalCount: 29 },
                  { subItemTitle: "이의 신청 접수", subItemTotalCount: 4 },
                ],
              },
            ],
          },

          {
            listTitle: "MOVIE",
            listItem: [
              {
                itemIcon: Genre,
                itemBgColor:
                  "linear-gradient(180deg, #D4A5F5 0%, #8E44AD 100%)",
                itemTitle: "장르",
                itemTotalCount: 15,
              },

              {
                itemIcon: Movie,
                itemBgColor:
                  "linear-gradient(180deg, #F5B041 0%, #D35400 100%)",
                itemTitle: "신고",
                itemTotalCount: 305,
              },

              {
                itemIcon: PlayList,
                itemBgColor:
                  "linear-gradient(180deg, #5DADE2 0%, #21618C 100%)",
                itemTitle: "플레이리스트",
                itemTotalCount: 36,
              },
            ],
          },

          {
            listTitle: "REVIEW",
            listItem: [
              {
                itemIcon: Review,
                itemBgColor:
                  "linear-gradient(180deg, #B8E2C1 0%, #74B78D 100%)",
                itemTitle: "한줄평",
                itemTotalCount: 7213,
              },

              {
                itemIcon: ReportReview,
                itemBgColor:
                  "linear-gradient(180deg, #FFC4C4 0%, #E57373 100%)",
                itemTitle: "신고",
                itemTotalCount: 1204,
                subItems: [
                  { subItemTitle: "처리 완료", subItemTotalCount: 617 },
                  { subItemTitle: "처리 미완료", subItemTotalCount: 587 },
                ],
              },
            ],
          },

          {
            listTitle: "MOVIE LOG",
            listItem: [
              {
                itemIcon: MovieLog,
                itemBgColor:
                  "linear-gradient(180deg, #F9E79F 0%, #F1C40F 100%)",
                itemTitle: "무비로그",
                itemTotalCount: 4621,
              },

              {
                itemIcon: ReportMovieLog,
                itemBgColor:
                  "linear-gradient(180deg, #FFA07A 0%, #D35400 100%)",
                itemTitle: "신고",
                itemTotalCount: 2394,
                subItems: [
                  { subItemTitle: "신고 무비로그", subItemTotalCount: 192 },
                  { subItemTitle: "신고 댓글", subItemTotalCount: 2124 },
                  { subItemTitle: "처리 완료", subItemTotalCount: 78 },
                ],
              },
            ],
          },
        ];

        setListItemData(data);
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
  return { listItemData };
}

export default useDashboardData;

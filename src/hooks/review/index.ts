import { fetchLineReviewMovie } from "@api/linereview";
import { useInfiniteQuery } from "@tanstack/react-query";

// 특정 영화 한줄평 조회 React Query - Custom Hook
// export const useLineReviewMovieQuery = (movieId: number) => {
//   return useInfiniteQuery({
//     queryKey: ["lineReview", movieId],
//     queryFn: ({ pageParam }) =>
//       fetchLineReviewMovie(
//         movieId,
//         pageParam.lastReviewId,
//         pageParam.lastCreatedAt
//       ),

//     getNextPageParam: (lastPage) => {
//       // console.log("lastPage");
//       // console.log(lastPage);

//       if (!lastPage?.data?.last) {
//         return {
//           lastMovidId:
//             lastPage?.data?.content[lastPage?.data?.content.length - 1].movieId,
//           lastLikeCount:
//             lastPage?.data?.content[lastPage?.data?.content.length - 1].likes,
//         };
//       }

//       return undefined;
//     },

//     initialPageParam: { lastMovidId: 0, lastLikeCount: 0 },
//     enabled: !!genreId,
//     staleTime: 1000 * 60 * 10,
//     gcTime: 1000 * 60 * 30,
//   });
// };

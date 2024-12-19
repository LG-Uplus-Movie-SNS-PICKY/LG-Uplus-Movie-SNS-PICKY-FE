import styles from "./index.styles";

import PlaylistBgImage from "@assets/images/playlist.jpg";

// 대시보드 Overview import
import DashboardListItem from "./components/list-container";
import { data as OverviewItems } from "./components/list-container/constant";

// 대시보드 Info import
// import useDashboardData from "./components/info-container/hook";
import { DashboardInfoListProps } from "@hooks/admin/info/types";
import DashboardInfoContainer from "@components/pages/admin/info";
import SEO from "@components/seo";
import OperationCard from "./components/operation-card";

function AdminDashboardPage({ data }: DashboardInfoListProps) {
  return (
    <>
      <SEO title="ADMIN" />

      {/* Movie Operation Card */}
      <OperationCard />

      {/* Playlist Operation Card */}
      <OperationCard
        image={PlaylistBgImage}
        title="새로운 플레이리스트를 만들어보세요!"
        context="PICKY가 추천하는 영화를 사용자들과 공유해보세요."
      />

      {/* User Container */}
      {/* Movie Container */}
      {/* Review Container */}
      {/* Movie Log Container */}
      {/* {Array.isArray(data) &&
        data.map((element, idx) => {
          return <DashboardInfoContainer key={idx} data={element} />;
        })} */}
    </>
  );
}

export default AdminDashboardPage;

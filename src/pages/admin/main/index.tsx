import styles from "./index.styles";

// 대시보드 Overview import
import DashboardListItem from "./components/list-container";
import { data as OverviewItems } from "./components/list-container/constant";

// 대시보드 Info import
// import useDashboardData from "./components/info-container/hook";
import { DashboardInfoListProps } from "@hooks/admin/info/types";
import DashboardInfoContainer from "@components/pages/admin/info";

function AdminDashboardPage({ data }: DashboardInfoListProps) {
  return (
    <>
      {/* Dashboard Overview Wrapper */}
      <div css={styles.dashboardWrapper()}>
        <h1 className="dashboard-title">dashboard</h1>

        {/* Dashboard Overview Container */}
        <div css={styles.dashboardContainer()}>
          {/* Redirect Container Mapping */}
          {OverviewItems &&
            OverviewItems.map((item, idx) => {
              return (
                <DashboardListItem
                  key={idx}
                  element={item.element}
                  title={item.title}
                  description={item.description}
                  bgColor={item.bgColor}
                  boxShadowColor={item.boxShadowColor}
                  path={item.path}
                />
              );
            })}
        </div>
      </div>

      {/* User Container */}
      {/* Movie Container */}
      {/* Review Container */}
      {/* Movie Log Container */}
      {Array.isArray(data) &&
        data.map((element, idx) => {
          return <DashboardInfoContainer key={idx} data={element} />;
        })}
    </>
  );
}

export default AdminDashboardPage;

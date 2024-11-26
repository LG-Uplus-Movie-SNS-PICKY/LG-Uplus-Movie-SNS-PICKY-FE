import DashboardInfoContainer from "@components/pages/admin/info";
import { DashboardInfoListProps } from "@hooks/admin/info/types";

{
  /* <DashboardInfoContainer data={data[0]} /> */
}

function ReviewManagementPage({ data }: DashboardInfoListProps) {
  if (Array.isArray(data)) return null;
  else {
    return <>{data && <DashboardInfoContainer data={data} />}</>;
  }
}

export default ReviewManagementPage;

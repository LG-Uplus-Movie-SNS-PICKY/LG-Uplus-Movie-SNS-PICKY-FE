import DashboardInfoContainer from "@components/pages/admin/info";
import { DashboardInfoListProps } from "@hooks/admin/info/types";

function MovieLogManagementPage({ data }: DashboardInfoListProps) {
  if (Array.isArray(data)) return null;
  else {
    return <>{data && <DashboardInfoContainer data={data} />}</>;
  }
}

export default MovieLogManagementPage;

import DashboardInfoContainer from "@components/pages/admin/info";
import { DashboardInfoListProps } from "@hooks/admin/info/types";

function UserManagementPage({ data }: DashboardInfoListProps) {
  if (Array.isArray(data)) return null;
  else {
    return <>{data && <DashboardInfoContainer data={data} />}</>;
  }
}

export default UserManagementPage;

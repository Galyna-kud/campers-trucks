import { getCampersFilters } from "@/lib/api";
import SideBarClient from "./SideBar.client";

export default async function Sidebar() {
  const filtersData = await getCampersFilters();

  return <SideBarClient filtersData={filtersData} />;
}
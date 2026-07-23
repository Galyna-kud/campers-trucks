import { getCampers } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CatalogClient from "./Catalog.client";
import { Metadata } from "next";
import { getFilters } from "@/utils/getFilters";

export const metadata: Metadata = {
  title: "Camper Catalog | Rent Campers Online",
  description:
    "Explore our wide selection of fully equipped campers. Compare features, prices, and book the perfect camper for your next journey.",
  openGraph: {
    title: "Camper Catalog | Rent Campers Online",
    description:
      "Find your ideal camper and start your next adventure with Campers Trucks.",
    url: "https://campers-trucks.vercel.app/catalog",
  },
};

interface CatalogProps {
  searchParams: Promise<Record<string, string | undefined>>;
}
export default async function Catalog({ searchParams }: CatalogProps) {
  const params = await searchParams;
  const filters = getFilters(params);

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam = 1 }) =>
      getCampers({ page: pageParam, perPage: 4, ...filters }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}
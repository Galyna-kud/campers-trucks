"use client";

import { useSearchParams } from "next/navigation";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/Button/Button";
import CamperList from "@/components/CamperList/CamperList";
import { getCampers } from "@/lib/api";
import css from "./Catalog.module.css";
import Loader from "@/components/Loader/Loader";
import ErrorState from "@/components/ErrorState/ErrorState";
import { getFilters } from "@/utils/getFilters";

export default function CatalogClient() {
  const searchParams = useSearchParams();
  const filters = getFilters(searchParams);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isError,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam = 1 }) => {
      return getCampers({
        page: pageParam,
        perPage: 4,
        ...filters,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  const campers = data?.pages.flatMap((page) => page.campers) ?? [];

  const isFilterLoading = isFetching && !isFetchingNextPage;

  const queryClient = useQueryClient();

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: ["campers"] });
  };

  return (
    <section className={css.container}>
      {isFilterLoading && <Loader />}
      {isError && <ErrorState onRetry={handleRetry} />}
      {!isFilterLoading && campers.length > 0 && (
        <CamperList campers={campers} />
      )}

      {hasNextPage && campers.length > 0 && !isFilterLoading && (
        <Button
          className={css.btnLoadMore}
          text={isFetchingNextPage ? "Loading..." : "Load More"}
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        />
      )}

      {status === "success" && campers.length === 0 && (
        <p className={css.noResults}>
          Sorry, no campers found for these filters. Try something else, please.
        </p>
      )}
    </section>
  );
}
"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { usePostFilters } from "@/modules/posts/hooks/use-post-filters";
import { columns } from "@/modules/posts/ui/components/columns";
import { PostsListHeader } from "@/modules/posts/ui/components/posts-list-header";
import { DataTable } from "@/components/data-table";
import { DataPagination } from "@/components/ui/data-pagination";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

export const PostsView = () => {
  const trpc = useTRPC();
  const [filters, setFilters] = usePostFilters();

  const { data } = useSuspenseQuery(
    trpc.posts.getMany.queryOptions({
      page: filters.page ?? 1,
      search: filters.search,
      status: filters.status ?? undefined,
    })
  );

  return (
    <div className="flex flex-col gap-4 p-6">
      <PostsListHeader />
      <DataTable columns={columns} data={data.items} showHeader={true} />
      <DataPagination
        page={filters.page ?? 1}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
    </div>
  );
};

export const PostsViewLoading = () => {
  return (
    <LoadingState
      title="Loading posts..."
      description="Please wait while we load your posts."
    />
  );
};

export const PostsViewError = () => {
  return (
    <ErrorState
      title="Failed to load posts"
      description="Please try again later."
    />
  );
};

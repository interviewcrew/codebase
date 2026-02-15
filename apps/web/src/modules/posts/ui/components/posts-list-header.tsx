"use client";

import { PostsSearchFilter } from "@/modules/posts/ui/components/posts-search-filter";
import { NewPostDialog } from "@/modules/posts/ui/components/new-post-dialog";
import { usePostFilters } from "@/modules/posts/hooks/use-post-filters";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

export const PostsListHeader = () => {
  const [filters, setFilters] = usePostFilters();

  const hasFilters = filters.search || filters.status;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <PostsSearchFilter
          search={filters.search}
          onSearchChange={(value) =>
            setFilters({ search: value, page: 1 })
          }
        />
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setFilters({ search: "", status: null, page: 1 })
            }
          >
            <XIcon className="size-4 mr-1" />
            Clear filters
          </Button>
        )}
      </div>
      <NewPostDialog />
    </div>
  );
};

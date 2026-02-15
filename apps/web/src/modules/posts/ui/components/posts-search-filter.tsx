"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface PostsSearchFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const PostsSearchFilter = ({
  search,
  onSearchChange,
}: PostsSearchFilterProps) => {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input
        placeholder="Search posts..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9 w-64"
      />
    </div>
  );
};

import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

import { useTRPC } from "@/trpc/client";
import { MAX_PAGE_SIZE } from "@/constants";

import {
  CommandResponsiveDialog,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";
import { useQuery } from "@tanstack/react-query";

interface DashboardCommandProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: DashboardCommandProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const trpc = useTRPC();
  const { data: posts } = useQuery(
    trpc.posts.getMany.queryOptions({
      pageSize: MAX_PAGE_SIZE,
      search: search,
    })
  );

  return (
    <CommandResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      shouldFilter={false}
    >
      <CommandInput
        placeholder="Search posts..."
        value={search}
        onValueChange={(value) => setSearch(value)}
      />
      <CommandList>
        <CommandGroup heading="Posts">
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No posts found
            </span>
          </CommandEmpty>
          {posts?.items.map((post) => (
            <CommandItem
              key={post.id}
              onSelect={() => {
                router.push(`/dashboard/posts/${post.id}`);
                setOpen(false);
              }}
            >
              {post.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandResponsiveDialog>
  );
};

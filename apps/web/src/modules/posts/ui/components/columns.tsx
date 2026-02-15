"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { PostGetMany } from "@/modules/posts/types";

export const columns: ColumnDef<PostGetMany[number]>[] = [
  {
    accessorKey: "title",
    header: () => <div className="text-left pl-2">Title</div>,
    cell: ({ row }) => (
      <Link
        href={`/dashboard/posts/${row.original.id}`}
        className="pl-2 hover:underline font-medium"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let variant: "default" | "secondary" | "destructive" | "outline" =
        "secondary";

      switch (status) {
        case "published":
          variant = "default";
          break;
        case "draft":
          variant = "outline";
          break;
        case "archived":
          variant = "secondary";
          break;
      }

      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-left pl-2">Created</div>,
    cell: ({ row }) => format(new Date(row.original.createdAt), "PPP"),
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-left pl-2">Updated</div>,
    cell: ({ row }) => format(new Date(row.original.updatedAt), "PPP"),
  },
];

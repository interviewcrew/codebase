"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { UpdatePostForm } from "@/modules/posts/ui/components/update-post-form";
import type { PostGetById } from "@/modules/posts/types";

interface UpdatePostDialogProps {
  post: PostGetById;
  trigger?: React.ReactNode;
}

export const UpdatePostDialog = ({ post, trigger }: UpdatePostDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline" size="sm">
            <PencilIcon className="size-4 mr-1" />
            Edit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <UpdatePostForm
          post={post}
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

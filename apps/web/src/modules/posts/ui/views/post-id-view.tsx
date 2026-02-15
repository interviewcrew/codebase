"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { PostIdViewHeader } from "@/modules/posts/ui/components/post-id-view-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { format } from "date-fns";

interface PostIdViewProps {
  postId: string;
}

export const PostIdView = ({ postId }: PostIdViewProps) => {
  const trpc = useTRPC();
  const { data: post } = useSuspenseQuery(
    trpc.posts.getById.queryOptions({ id: postId })
  );

  return (
    <div className="flex flex-col gap-4 p-6">
      <PostIdViewHeader post={post} />
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">{post.title}</CardTitle>
              <Badge
                variant={
                  post.status === "published"
                    ? "default"
                    : post.status === "draft"
                    ? "outline"
                    : "secondary"
                }
              >
                {post.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Created {format(new Date(post.createdAt), "PPP")} &middot;
              Updated {format(new Date(post.updatedAt), "PPP")}
            </p>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
              {post.content || (
                <span className="text-muted-foreground italic">
                  No content yet.
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const PostIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading post..."
      description="Please wait while we load the post details."
    />
  );
};

export const PostIdViewError = () => {
  return (
    <ErrorState
      title="Failed to load post"
      description="Please try again later."
    />
  );
};

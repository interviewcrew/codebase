import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Suspense } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { auth } from "@/lib/auth";
import { trpc, getQueryClient } from "@/trpc/server";

import {
  PostIdView,
  PostIdViewError,
  PostIdViewLoading,
} from "@/modules/posts/ui/views/post-id-view";

export const metadata = {
  title: "Post Details",
};

interface PostPageProps {
  params: Promise<{ postId: string }>;
}

const PostPage = async ({ params }: PostPageProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { postId } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.posts.getById.queryOptions({ id: postId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<PostIdViewError />}>
        <Suspense fallback={<PostIdViewLoading />}>
          <PostIdView postId={postId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default PostPage;

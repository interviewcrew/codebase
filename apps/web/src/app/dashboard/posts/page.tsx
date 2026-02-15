import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Suspense } from "react";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { auth } from "@/lib/auth";
import { trpc, getQueryClient } from "@/trpc/server";
import { loadSearchParams } from "@/modules/posts/params";

import {
  PostsView,
  PostsViewError,
  PostsViewLoading,
} from "@/modules/posts/ui/views/posts-view";

export const metadata = {
  title: "Posts",
};

interface PostsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const PostsPage = async ({ searchParams }: PostsPageProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const params = await loadSearchParams(searchParams);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    trpc.posts.getMany.queryOptions({
      page: params.page ?? 1,
      search: params.search,
      status: params.status ?? undefined,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<PostsViewError />}>
        <Suspense fallback={<PostsViewLoading />}>
          <PostsView />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default PostsPage;

import { createTRPCRouter } from '@/trpc/init';
import { postsRouter } from '@/modules/posts/server/procedures';
import { adminRouter } from '@/modules/admin/server/procedures';

export const appRouter = createTRPCRouter({
  posts: postsRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;

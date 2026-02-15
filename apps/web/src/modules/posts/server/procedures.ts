import { db } from "@/db";
import { posts } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { createPostSchema, updatePostSchema } from "@/modules/posts/schemas";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "@/constants";
import z from "zod";
import { count, desc, eq, ilike, and, getTableColumns } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const postsRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(1)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
        status: z.enum(["draft", "published", "archived"]).nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search, status } = input;
      const userId = ctx.auth.user.id;

      const whereCondition = and(
        eq(posts.userId, userId),
        search ? ilike(posts.title, `%${search}%`) : undefined,
        status ? eq(posts.status, status) : undefined
      );

      const data = await db
        .select(getTableColumns(posts))
        .from(posts)
        .where(whereCondition)
        .orderBy(desc(posts.createdAt), desc(posts.id))
        .offset(
          ((page || DEFAULT_PAGE) - 1) * (pageSize || DEFAULT_PAGE_SIZE)
        )
        .limit(pageSize || DEFAULT_PAGE_SIZE);

      const [total] = await db
        .select({ count: count() })
        .from(posts)
        .where(whereCondition);

      const totalPages = Math.ceil(
        total.count / (pageSize ?? DEFAULT_PAGE_SIZE)
      );

      return { items: data, totalPages, totalItems: total.count };
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const userId = ctx.auth.user.id;
      const [post] = await db
        .select(getTableColumns(posts))
        .from(posts)
        .where(and(eq(posts.id, input.id), eq(posts.userId, userId)))
        .limit(1);

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }
      return post;
    }),

  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdPost] = await db
        .insert(posts)
        .values({ ...input, userId: ctx.auth.user.id })
        .returning();
      return createdPost;
    }),

  update: protectedProcedure
    .input(updatePostSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.auth.user.id;
      const [post] = await db
        .select(getTableColumns(posts))
        .from(posts)
        .where(and(eq(posts.id, input.id), eq(posts.userId, userId)))
        .limit(1);

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }

      const [updatedPost] = await db
        .update(posts)
        .set(input)
        .where(and(eq(posts.id, input.id), eq(posts.userId, userId)))
        .returning();

      return updatedPost;
    }),

  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.auth.user.id;
      const [post] = await db
        .select(getTableColumns(posts))
        .from(posts)
        .where(and(eq(posts.id, input.id), eq(posts.userId, userId)))
        .limit(1);

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }

      const [deletedPost] = await db
        .delete(posts)
        .where(and(eq(posts.id, input.id), eq(posts.userId, userId)))
        .returning();

      return deletedPost;
    }),
});

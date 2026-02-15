import { createTRPCRouter, adminProcedure } from "@/trpc/init";
import { db } from "@/db";
import { user, posts } from "@/db/schema";

import { z } from "zod";
import { count, desc, eq, sql } from "drizzle-orm";

export const adminRouter = createTRPCRouter({
  getStats: adminProcedure.query(async () => {
    const [userCount] = await db.select({ count: count() }).from(user);
    const [postCount] = await db.select({ count: count() }).from(posts);

    return {
      users: userCount.count,
      posts: postCount.count,
    };
  }),

  getGrowthStats: adminProcedure
    .input(
      z.object({
        interval: z.enum(["day", "week", "month"]).default("week"),
      })
    )
    .query(async ({ input }) => {
      const { interval } = input;

      const getChartData = async (table: typeof user | typeof posts) => {
        const data = await db
          .select({
            date: sql`date_trunc(${interval}, ${table.createdAt})`.mapWith(
              (value: string) => value
            ),
            count: count(),
          })
          .from(table)
          .groupBy(sql`date_trunc(${interval}, ${table.createdAt})`)
          .orderBy(sql`date_trunc(${interval}, ${table.createdAt})`);

        return data.map((item) => ({
          date: item.date as string,
          count: item.count,
        }));
      };

      const [usersChart, postsChart] = await Promise.all([
        getChartData(user),
        getChartData(posts),
      ]);

      return {
        users: usersChart,
        posts: postsChart,
      };
    }),

  getUsers: adminProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ input }) => {
      const { page, limit } = input;
      const offset = (page - 1) * limit;

      const [total] = await db.select({ count: count() }).from(user);

      const users = await db
        .select()
        .from(user)
        .orderBy(desc(user.createdAt))
        .limit(limit)
        .offset(offset);

      return {
        items: users,
        total: total.count,
        totalPages: Math.ceil(total.count / limit),
      };
    }),

  getPosts: adminProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ input }) => {
      const { page, limit } = input;
      const offset = (page - 1) * limit;

      const [total] = await db.select({ count: count() }).from(posts);

      const items = await db
        .select({
          id: posts.id,
          title: posts.title,
          status: posts.status,
          createdAt: posts.createdAt,
          userName: user.name,
        })
        .from(posts)
        .leftJoin(user, eq(posts.userId, user.id))
        .orderBy(desc(posts.createdAt))
        .limit(limit)
        .offset(offset);

      return {
        items,
        total: total.count,
        totalPages: Math.ceil(total.count / limit),
      };
    }),
});

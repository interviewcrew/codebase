import { cache } from 'react';
import { headers } from 'next/headers';

import { initTRPC, TRPCError } from '@trpc/server';
import { auth } from '@/lib/auth';

export const createTRPCContext = cache(async () => {
    return { userId: "user_123"}
})

const t = initTRPC.create({});

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Unauthorized" });
    }

    return next({ ctx: { ...ctx, auth: session } });
});

export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
    const { user } = ctx.auth;
    const adminDomain = process.env.ADMIN_EMAIL_DOMAIN;

    if (!adminDomain || !user.email.endsWith(`@${adminDomain}`) || !user.emailVerified) {
        throw new TRPCError({ code: "FORBIDDEN", message: "You are not authorized to view this page" });
    }

    return next({ ctx });
});

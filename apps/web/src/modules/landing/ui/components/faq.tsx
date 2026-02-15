"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What's included in this boilerplate?",
    answer:
      "Authentication (email + social), PostgreSQL with Drizzle ORM, tRPC API layer, admin dashboard, GDPR cookie consent, Inngest background jobs, Vercel Analytics, and a complete example CRUD module (Posts) demonstrating the full pattern.",
  },
  {
    question: "What technologies does this use?",
    answer:
      "Next.js 15 with React 19, TypeScript, Tailwind CSS 4, tRPC, Drizzle ORM, Better Auth, Inngest, Radix UI (shadcn/ui), and TanStack Query/Table. It's structured as a Turborepo monorepo with PNPM workspaces.",
  },
  {
    question: "How do I add a new feature module?",
    answer:
      "Follow the Posts module pattern: create a directory under src/modules/ with schemas, types, params, hooks, server procedures, and UI components. Register the tRPC router in _app.ts and add route pages under src/app/dashboard/.",
  },
  {
    question: "Can I deploy this to production?",
    answer:
      "Yes. The boilerplate is designed for Vercel deployment with Docker Compose for local development. It includes production-ready patterns for authentication, database migrations, background jobs, and analytics.",
  },
];

export default function FAQ() {
  return (
    <div className="bg-gradiant-to-b from-bg-transparent to-bg-white dark:from-bg-transparent to-bg-gray-900 mt-32">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="mt-16">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger className="text-base font-semibold text-gray-900 dark:text-white hover:no-underline items-center min-h-24">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

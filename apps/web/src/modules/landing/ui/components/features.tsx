import { DatabaseIcon, KeyRoundIcon, LayoutDashboardIcon, ZapIcon } from "lucide-react";

const features = [
  {
    name: "Authentication Built In",
    description:
      "Email/password and social login (Google, GitHub) with Better Auth. Session management, email verification, and admin roles out of the box.",
    icon: KeyRoundIcon,
    color: "bg-cyan-600/80 dark:bg-sky-600/60",
  },
  {
    name: "Database & ORM",
    description:
      "PostgreSQL with Drizzle ORM for type-safe database access. Schema migrations, studio, and a clean module pattern for organizing your data layer.",
    icon: DatabaseIcon,
    color: "bg-fuchsia-600/80 dark:bg-fuchsia-600/60",
  },
  {
    name: "Full-Stack Type Safety",
    description:
      "End-to-end type safety with tRPC. Define your API once and get autocomplete, validation, and error handling across client and server.",
    icon: ZapIcon,
    color: "bg-yellow-600/80 dark:bg-yellow-600/60",
  },
  {
    name: "Dashboard & Admin",
    description:
      "Pre-built dashboard with sidebar navigation, data tables, pagination, and an admin panel. GDPR-compliant cookie consent included.",
    icon: LayoutDashboardIcon,
    color: "bg-cyan-600/80 dark:bg-cyan-600/60",
  },
];

export default function Features() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-16 lg:mt-32">
      <div className="mx-auto max-w-2xl lg:text-center">
        <h2 className="text-base/7 font-semibold text-cyan-700 dark:text-cyan-500">
          Everything You Need
        </h2>
        <p className="mt-2 text-4xl font-semibold text-pretty text-gray-900 sm:text-5xl lg:text-balance dark:text-white tracking-tight">
          Start building, not configuring
        </p>
        <p className="mt-6 text-lg/8 text-gray-700 dark:text-gray-300">
          A production-ready foundation with authentication, database, API layer, and
          UI components. Just add your business logic.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <dt className="text-base/7 font-semibold text-gray-900 dark:text-white">
                <div
                  className={`absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg ${feature.color}`}
                >
                  <feature.icon
                    aria-hidden="true"
                    className="size-6 text-white"
                  />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-2 text-base/7 text-gray-600 dark:text-gray-400">
                {feature.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

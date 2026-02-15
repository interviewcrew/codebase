import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function Hero() {
  return (
    <div className="bg-transparent min-h-[20vh]">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 md:py-2 lg:px-8"
        >
          <div className="flex flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">My App</span>
              <Image
                alt="Logo"
                src="/logo-light.svg"
                className="h-8 w-auto dark:hidden md:hidden"
                width={32}
                height={32}
              />
              <Image
                alt="Logo"
                src="/logo-dark.svg"
                className="h-8 w-auto hidden dark:block dark:md:hidden"
                width={32}
                height={32}
              />
              <Image
                alt="Logo"
                src="/logo-typography-light.svg"
                className="h-16 w-auto hidden md:block dark:md:hidden"
                width={158}
                height={64}
              />
              <Image
                alt="Logo"
                src="/logo-typography-dark.svg"
                className="h-16 w-auto hidden dark:md:block"
                width={158}
                height={64}
              />
            </a>
          </div>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <div className="flex flex-1 justify-end items-center">
            <Link
              href="/sign-in"
              className="text-sm/6 font-semibold text-gray-900 dark:text-white"
            >
              Sign in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>

      <div className="relative isolate">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75 dark:opacity-20"
          />
        </div>
        <div>
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-xl md:max-w-4xl xl:max-w-7xl text-center p-6 mt-24 md:p-24 md:mt-16 md:bg-gray-200/30 md:dark:bg-white/10 md:rounded-lg md:bg-clip-padding md:backdrop-filter md:backdrop-blur-sm md:border md:shadow-lg md:dark:shadow-gray-100/10">
              <h1 className="text-4xl tracking-tight text-gray-900 sm:text-5xl lg:text-balance dark:text-white">
                <span className="block text-base font-bold tracking-widest uppercase text-cyan-600 dark:text-cyan-400 mb-4">
                  My App
                </span>
                <strong className="block mb-2 font-semibold text-pretty">
                  Your Next.js Boilerplate
                </strong>
                <div className="text-4xl leading-10">
                  Auth, database, tRPC, and more. Ready to build.
                </div>
              </h1>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/sign-up">
                  <Button
                    size="lg"
                    className="text-base bg-cyan-800 dark:bg-cyan-700 dark:text-white hover:bg-cyan-600 dark:hover:bg-cyan-500"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link
                  href="/sign-in"
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                >
                  Sign in <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75 dark:opacity-20"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";

import LoginBrand from "@/components/auth/login/LoginBrand";
import LoginHero from "@/components/auth/login/LoginHero";
import LoginForm from "@/components/auth/login/LoginForm";

export default function LoginPageLayout() {
  return (
    <main className="h-screen overflow-hidden bg-[#F7F8F7]">
      <div className="grid h-screen w-full lg:grid-cols-[1.08fr_0.92fr]">
        {/* LEFT SIDE */}
        <LoginHero />

        {/* RIGHT LOGIN SIDE */}
        <section className="h-screen overflow-hidden bg-[#FFFFFF]">
          <div className="flex h-full items-center justify-center px-6 sm:px-10">
            <div className="w-full max-w-[390px]">
              {/* Mobile brand */}
              <div className="mb-10 lg:hidden">
                <LoginBrand />
              </div>

              {/* Heading */}
              <div className="mb-8">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#064B52]">
                  Account access
                </p>

                <h2 className="text-[34px] font-semibold leading-tight tracking-[-0.04em] text-[#182124]">
                  Welcome back
                </h2>

                <p className="mt-3 text-[13px] leading-6 text-[#6E7B7D]">
                  Sign in to continue to your workspace.
                </p>
              </div>

              {/* Login form */}
              <div className="rounded-[22px] border border-[#DDE3E3] bg-white p-6 shadow-[0_18px_50px_-35px_rgba(6,75,82,0.35)] sm:p-7">
                <LoginForm />
              </div>

              {/* Register */}
              <div className="mt-7 text-center">
                <p className="text-[13px] text-[#6E7B7D]">
                  Don&apos;t have an account?{" "}

                  <Link
                    href="/register"
                    className="font-semibold text-[#064B52] transition hover:text-[#0B626A]"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
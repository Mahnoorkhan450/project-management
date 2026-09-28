
"use client";

import Link from "next/link";

import RegisterBrand from "@/components/auth/register/RegisterBrand";
import RegisterHero from "@/components/auth/register/RegisterHero";
import RegisterForm from "@/components/auth/register/RegisterForm";

export default function RegisterPageLayout() {
  return (
    <main className="h-screen overflow-hidden bg-[#FAF8FC]">
      <div className="grid h-screen w-full lg:grid-cols-[1.08fr_0.92fr]">

        {/* LEFT SIDE */}
        <RegisterHero />

        {/* RIGHT REGISTER SIDE */}
        <section className="h-screen overflow-hidden bg-[#FFFDFE]">
          <div className="flex h-full items-center justify-center px-6 py-6 sm:px-10">
            <div className="w-full max-w-[390px]">

              {/* Mobile brand */}
              <div className="mb-7 lg:hidden">
                <RegisterBrand />
              </div>

              {/* Heading */}
              <div className="mb-6">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#064B52]">
                  Get started
                </p>

                <h2 className="text-[32px] font-semibold leading-tight tracking-[-0.04em] text-[#302A3A]">
                  Create your account
                </h2>

                <p className="mt-2.5 text-[13px] leading-6 text-[#8C8492]">
                  Set up your workspace and start
                  managing your projects with ease.
                </p>
              </div>

              {/* Register form */}
              <div className="rounded-[22px] border border-[#ECE8F0] bg-white p-6 shadow-[0_18px_50px_-35px_rgba(75,55,95,0.4)] sm:p-7">
                <RegisterForm />
              </div>

              {/* Login link */}
              <div className="mt-6 text-center">
                <p className="text-[13px] text-[#928A96]">
                  Already have an account?{" "}

                  <Link
                    href="/login"
                    className="font-semibold text-[#064B52] transition hover:text-[#0B626A]"
                  >
                    Sign in
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


import { CheckCircle2, Sparkles } from "lucide-react";

import RegisterBrand from "@/components/auth/register/RegisterBrand";

export default function RegisterHero() {
  return (
    <section className="relative hidden h-screen overflow-hidden bg-[#F7F8F7] lg:block">
      {/* Base background */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#F7F8F7_0%,#EAF1F0_48%,#F3F7F6_100%)]" />

      {/* Soft teal glow */}
      <div className="absolute -left-32 -top-28 h-[520px] w-[520px] rounded-full bg-[#BFD9D8]/65 blur-[95px]" />

      {/* Soft green glow */}
      <div className="absolute -bottom-40 -right-28 h-[520px] w-[520px] rounded-full bg-[#D5E7DF]/70 blur-[105px]" />

      {/* Warm center */}
      <div className="absolute left-[32%] top-[30%] h-[330px] w-[330px] rounded-full bg-[#F4F7F3]/80 blur-[90px]" />

      {/* White glow */}
      <div className="absolute left-[18%] top-[45%] h-[240px] w-[240px] rounded-full bg-white/70 blur-[80px]" />

      {/* Decorative shapes */}
      <div className="absolute -right-20 top-16 h-52 w-52 rotate-12 rounded-[60px] border border-white/70 bg-white/20 backdrop-blur-[2px]" />

      <div className="absolute -right-8 top-28 h-36 w-36 rotate-[28deg] rounded-[45px] border border-white/60" />

      <div className="absolute -bottom-24 -left-10 h-48 w-48 rotate-[-18deg] rounded-[60px] border border-white/70 bg-white/15" />

      {/* Rings */}
      <div className="absolute right-[14%] top-[14%] h-24 w-24 rounded-full border border-white/80" />

      <div className="absolute right-[16%] top-[16%] h-16 w-16 rounded-full border border-white/60" />

      {/* Dots */}
      <div className="absolute left-[13%] top-[22%] h-3 w-3 rounded-full bg-[#78A9A5]/70" />

      <div className="absolute left-[47%] top-[15%] h-2 w-2 rounded-full bg-[#91BDB2]/70" />

      <div className="absolute bottom-[27%] right-[20%] h-3 w-3 rounded-full bg-[#86B3A8]/70" />

      <div className="absolute bottom-[19%] left-[39%] h-1.5 w-1.5 rounded-full bg-[#A4C7BC]/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col px-12 py-9 xl:px-20">

        {/* Brand */}
        <RegisterBrand />

        {/* Main content */}
        <div className="flex flex-1 items-center">
          <div className="w-full max-w-[570px]">

            {/* Label */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/60 px-3.5 py-1.5 shadow-sm backdrop-blur">
              <Sparkles
                size={12}
                className="text-[#0B626A]"
              />

              <span className="text-[10px] font-semibold text-[#53686A]">
                Start organizing your work
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[44px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#182124] xl:text-[56px]">
              Build better.
              <br />

              <span className="text-[#064B52]">
                Work together.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-[450px] text-[14px] leading-7 text-[#6E7B7D]">
              Create your workspace, organize projects,
              manage tasks and keep everything your team
              needs in one place.
            </p>

            {/* Features */}
            <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2.5">
              <Feature text="Projects & tasks" />
              <Feature text="Team collaboration" />
              <Feature text="Progress tracking" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-[10px] font-medium text-[#6E7B7D]">
            © 2026 Worknest
          </p>

          <p className="mt-1 text-[9px] text-[#8A9698]">
            Simple · Focused · Organized
          </p>
        </div>
      </div>
    </section>
  );
}

function Feature({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle2
        size={13}
        className="text-[#3E8B73]"
      />

      <span className="text-[10px] font-medium text-[#657577]">
        {text}
      </span>
    </div>
  );
}


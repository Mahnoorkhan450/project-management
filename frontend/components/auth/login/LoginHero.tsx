import { CheckCircle2, Sparkles } from "lucide-react";

import LoginBrand from "@/components/auth/login/LoginBrand";
import LoginDashboardPreview from "@/components/auth/login/LoginDashboardPreview";

export default function LoginHero() {
  return (
    <section className="relative hidden h-screen overflow-hidden bg-[#F2F6F6] lg:block">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#F8FAFA_0%,#E8F1F1_48%,#F5F8F7_100%)]" />

      {/* Teal glow */}
      <div className="absolute -left-32 -top-28 h-[520px] w-[520px] rounded-full bg-[#B9D8D8]/60 blur-[95px]" />

      {/* Green glow */}
      <div className="absolute -bottom-40 -right-28 h-[520px] w-[520px] rounded-full bg-[#CFE3DA]/70 blur-[105px]" />

      {/* Warm center glow */}
      <div className="absolute left-[32%] top-[30%] h-[330px] w-[330px] rounded-full bg-[#F4F8F5]/80 blur-[90px]" />

      {/* White soft glow */}
      <div className="absolute left-[18%] top-[45%] h-[240px] w-[240px] rounded-full bg-white/70 blur-[80px]" />

      {/* Top-right glass shapes */}
      <div className="absolute -right-20 top-16 h-52 w-52 rotate-12 rounded-[60px] border border-white/70 bg-white/20 backdrop-blur-[2px]" />

      <div className="absolute -right-8 top-28 h-36 w-36 rotate-[28deg] rounded-[45px] border border-white/60" />

      {/* Bottom-left glass shape */}
      <div className="absolute -bottom-24 -left-10 h-48 w-48 rotate-[-18deg] rounded-[60px] border border-white/70 bg-white/15" />

      {/* Rings */}
      <div className="absolute right-[14%] top-[14%] h-24 w-24 rounded-full border border-white/80" />

      <div className="absolute right-[16%] top-[16%] h-16 w-16 rounded-full border border-white/60" />

      {/* Small dots */}
      <div className="absolute left-[13%] top-[22%] h-3 w-3 rounded-full bg-[#8FB9B9]/70" />

      <div className="absolute left-[47%] top-[15%] h-2 w-2 rounded-full bg-[#82AFA4]/70" />

      <div className="absolute bottom-[27%] right-[20%] h-3 w-3 rounded-full bg-[#A4C8BE]/70" />

      <div className="absolute bottom-[19%] left-[39%] h-1.5 w-1.5 rounded-full bg-[#9CBDB5]/60" />

      {/* Main content */}
      <div className="relative z-10 flex h-full flex-col px-12 py-9 xl:px-20">
        {/* Brand */}
        <LoginBrand />

        {/* Center content */}
        <div className="flex flex-1 items-center">
          <div className="w-full max-w-[570px]">
            {/* Label */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/60 px-3.5 py-1.5 shadow-sm backdrop-blur">
              <Sparkles
                size={12}
                className="text-[#064B52]"
              />

              <span className="text-[10px] font-semibold text-[#536A6C]">
                Everything in one workspace
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[44px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#182124] xl:text-[56px]">
              Plan clearly.
              <br />

              <span className="text-[#064B52]">
                Work confidently.
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-[450px] text-[14px] leading-7 text-[#657577]">
              Organize projects, manage tasks and keep
              your team moving forward in one beautifully
              simple workspace.
            </p>

            {/* Dashboard Preview */}
            <LoginDashboardPreview />

            {/* Features */}
            <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2.5">
              <Feature text="Clear priorities" />
              <Feature text="Simple planning" />
              <Feature text="Team visibility" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-[10px] font-medium text-[#718082]">
            © 2026 Worknest
          </p>

          <p className="mt-1 text-[9px] text-[#9AA5A6]">
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
"use client";

import Link from "next/link";
import {
  FolderKanban,
  ListTodo,
  Users,
} from "lucide-react";

export default function Home() {
  return (
    <main className="h-screen overflow-hidden bg-[#F7F8F7] text-[#182124]">
      {/* HEADER */}
      <header className="h-[70px] border-b border-[#DDE3E3] bg-white">
        <div className="mx-auto flex h-full max-w-[1380px] items-center justify-between px-6 lg:px-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#064B52]">
              <span className="text-sm font-bold text-white">W</span>
            </div>

            <div>
              <p className="text-[17px] font-bold tracking-tight text-[#182124]">
                Worknest
              </p>

              <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#6E7B7D]">
                Project Management
              </p>
            </div>
          </Link>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-[#064B52] transition hover:bg-[#DCE9E9]"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-[#064B52] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0B626A]"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <section className="h-[calc(100vh-70px)]">
        <div className="mx-auto flex h-full max-w-[1380px] flex-col justify-center px-6 py-8 lg:px-10">

          {/* HERO */}
          <div className="mx-auto max-w-[850px] text-center">
            <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-[#DDE3E3] bg-white px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3E8B73]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#064B52]">
                Simple project management
              </span>
            </div>

            <h1 className="text-[48px] font-bold leading-[1.05] tracking-[-0.045em] sm:text-[58px] lg:text-[64px]">
              Manage your work.
              <span className="block text-[#064B52]">
                Keep your team aligned.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-[650px] text-[16px] leading-7 text-[#6E7B7D]">
              Plan projects, organize tasks, and collaborate with your team
              through one clear and focused workspace built for productive work.
            </p>

            <div className="mt-8">
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-[#064B52] px-7 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(6,75,82,0.14)] transition hover:bg-[#0B626A]"
              >
                Create workspace
              </Link>
            </div>
          </div>

          {/* INFORMATION CARDS */}
          <div className="mx-auto mt-14 grid w-full max-w-[1120px] grid-cols-1 gap-4 md:grid-cols-3">

            {/* PROJECTS */}
            <InfoCard
              icon={<FolderKanban size={18} />}
              title="Projects"
              quote="Organize your work with clarity."
              text="Plan projects, track progress, and keep every important milestone on schedule."
            />

            {/* TASKS */}
            <InfoCard
              icon={<ListTodo size={18} />}
              title="Tasks"
              quote="Turn priorities into focused work."
              text="Keep daily work structured, manageable, and easy to follow from planning to completion."
            />

            {/* TEAM */}
            <InfoCard
              icon={<Users size={18} />}
              title="Team"
              quote="Keep everyone moving together."
              text="Share responsibilities, coordinate work, and keep your entire team aligned."
            />

          </div>

          {/* SMALL QUOTE */}
          <p className="mt-9 text-center text-[11px] italic text-[#8A9495]">
            “Clear work creates better progress.”
          </p>
        </div>
      </section>
    </main>
  );
}

/* ============================= */
/* INFORMATION CARD */
/* ============================= */

function InfoCard({
  icon,
  title,
  quote,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  quote: string;
  text: string;
}) {
  return (
    <div className="group min-h-[200px] rounded-xl border border-[#DDE3E3] bg-white p-6 transition duration-200 hover:-translate-y-0.5 hover:border-[#B9CCCC] hover:shadow-[0_10px_30px_rgba(24,33,36,0.06)]">

      {/* Icon */}
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#DCE9E9] text-[#064B52] transition duration-200 group-hover:bg-[#064B52] group-hover:text-white">
        {icon}
      </div>

      {/* Title */}
      <h2 className="mt-6 text-[19px] font-bold tracking-tight text-[#064B52]">
        {title}
      </h2>

      {/* Bold Quote */}
      <p className="mt-2 text-[13px] font-bold leading-5 text-[#182124]">
        {quote}
      </p>

      {/* Description */}
      <p className="mt-2 max-w-[300px] text-[12px] leading-5 text-[#6E7B7D]">
        {text}
      </p>
    </div>
  );
}
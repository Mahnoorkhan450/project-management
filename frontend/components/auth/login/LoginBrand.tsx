import { LayoutDashboard } from "lucide-react";

export default function LoginBrand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DDE3E3] bg-white/85 shadow-[0_8px_25px_-15px_rgba(6,75,82,0.35)] backdrop-blur">
        <LayoutDashboard
          size={18}
          strokeWidth={2}
          className="text-[#064B52]"
        />
      </div>

      <div>
        <h1 className="text-[16px] font-bold tracking-[-0.02em] text-[#182124]">
          Worknest
        </h1>

        <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-[#6E7B7D]">
          Work management
        </p>
      </div>
    </div>
  );
}
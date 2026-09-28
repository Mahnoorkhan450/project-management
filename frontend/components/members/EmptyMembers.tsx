import { Users } from "lucide-react";

interface EmptyMembersProps {
  search?: string;
}

export default function EmptyMembers({
  search = "",
}: EmptyMembersProps) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-[#DDE3E3] bg-white px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DCE9E9]">
        <Users className="h-5 w-5 text-[#064B52]" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-[#182124]">
        {search ? "No members found" : "No team members yet"}
      </h3>

      <p className="mt-1 max-w-sm text-sm text-[#6E7B7D]">
        {search
          ? "Try searching with a different name, email, team or department."
          : "Add members to your teams to see them here."}
      </p>
    </div>
  );
}
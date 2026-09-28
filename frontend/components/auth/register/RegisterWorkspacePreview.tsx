import { CheckCircle2, Users } from "lucide-react";

export default function RegisterWorkspacePreview() {
  return (
    <div className="relative mt-9 h-[215px] max-w-[510px]">
      {/* Main workspace card */}
      <div className="absolute left-0 top-7 w-[345px] rounded-[20px] border border-white/90 bg-white/90 p-5 shadow-[0_25px_55px_-30px_rgba(6,75,82,0.38)] backdrop-blur">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#6E7B7D]">
              Workspace
            </p>

            <p className="mt-1 text-[13px] font-semibold text-[#182124]">
              My projects
            </p>
          </div>

          {/* Members */}
          <div className="flex -space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#DCE9E9] text-[8px] font-semibold text-[#064B52]">
              MK
            </div>

            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#DDEBE5] text-[8px] font-semibold text-[#3E8B73]">
              AL
            </div>

            <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#E8EDEB] text-[8px] font-semibold text-[#657577]">
              +
            </div>
          </div>
        </div>

        {/* Project rows */}
        <div className="mt-5 space-y-2.5">
          <ProjectRow
            title="Website redesign"
            progress="72%"
          />

          <ProjectRow
            title="Mobile application"
            progress="48%"
          />

          <ProjectRow
            title="Marketing campaign"
            progress="86%"
          />
        </div>
      </div>

      {/* Floating team card */}
      <div className="absolute right-0 top-0 w-[180px] rounded-[20px] border border-white/90 bg-white/95 p-4 shadow-[0_25px_55px_-30px_rgba(6,75,82,0.38)] backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#DCE9E9]">
            <Users
              size={14}
              className="text-[#064B52]"
            />
          </div>

          <span className="text-[9px] font-semibold text-[#53686A]">
            Team workspace
          </span>
        </div>

        <p className="mt-4 text-[23px] font-bold text-[#182124]">
          12
        </p>

        <p className="mt-0.5 text-[9px] text-[#6E7B7D]">
          active members
        </p>

        <div className="mt-4 flex items-center gap-1.5">
          <CheckCircle2
            size={12}
            className="text-[#3E8B73]"
          />

          <span className="text-[9px] font-medium text-[#657577]">
            Ready to collaborate
          </span>
        </div>
      </div>
    </div>
  );
}

function ProjectRow({
  title,
  progress,
}: {
  title: string;
  progress: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF2F1]">
        <CheckCircle2
          size={12}
          className="text-[#0B626A]"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="truncate text-[9px] font-semibold text-[#536164]">
            {title}
          </span>

          <span className="ml-2 text-[8px] font-medium text-[#7D898B]">
            {progress}
          </span>
        </div>

        <div className="mt-1 h-1 overflow-hidden rounded-full bg-[#E8EDED]">
          <div
            className="h-full rounded-full bg-[#0B626A]"
            style={{
              width: progress,
            }}
          />
        </div>
      </div>
    </div>
  );
}
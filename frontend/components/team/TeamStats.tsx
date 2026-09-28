interface TeamStatsProps {
  totalTeams: number;
  totalMembers: number;
  totalProjects: number;
}

export default function TeamStats({
  totalTeams,
  totalMembers,
  totalProjects,
}: TeamStatsProps) {
  const stats = [
    {
      label: "Total Teams",
      value: totalTeams,
      description: "Across your workspace",
    },
    {
      label: "Team Members",
      value: totalMembers,
      description: "Active members",
    },
    {
      label: "Team Projects",
      value: totalProjects,
      description: "Connected projects",
    },
  ];

  return (
    <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-[#DDE3E3] bg-white p-5 shadow-[0_2px_10px_rgba(16,23,25,0.03)]"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6E7B7D]">
            {stat.label}
          </p>

          <p className="mt-3 text-2xl font-semibold text-[#182124]">
            {stat.value}
          </p>

          <p className="mt-1 text-xs text-[#6E7B7D]">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );
}
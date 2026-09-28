export default function MembersLoading() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="flex animate-pulse items-center gap-3 rounded-xl border border-[#DDE3E3] bg-white p-3"
        >
          <div className="h-10 w-10 rounded-full bg-[#DCE9E9]" />

          <div className="flex-1 space-y-2">
            <div className="h-3 w-32 rounded bg-[#DCE9E9]" />
            <div className="h-2.5 w-48 rounded bg-[#EDF1F1]" />
          </div>
        </div>
      ))}
    </div>
  );
}
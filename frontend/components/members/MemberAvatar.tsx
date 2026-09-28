interface MemberAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

export default function MemberAvatar({
  name,
  size = "md",
}: MemberAvatarProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg",
  };

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#DCE9E9] font-semibold text-[#064B52] ${sizes[size]}`}
    >
      {initials || "U"}
    </div>
  );
}
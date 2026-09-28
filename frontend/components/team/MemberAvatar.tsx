interface MemberAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-8 w-8 text-[10px]",
  md: "h-10 w-10 text-xs",
  lg: "h-12 w-12 text-sm",
};

export default function MemberAvatar({
  name,
  size = "md",
}: MemberAvatarProps) {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      title={name}
      className={`flex shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#DCE9E9] font-semibold text-[#064B52] ${sizes[size]}`}
    >
      {initials}
    </div>
  );
}
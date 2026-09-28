interface AvatarProps {
  name?: string;
  src?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
};

const getInitials = (
  name: string
) => {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export default function Avatar({
  name = "User",
  src,
  size = "md",
}: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`
          rounded-full object-cover
          ${sizes[size]}
        `}
      />
    );
  }

  return (
    <div
      className={`
        flex items-center justify-center
        rounded-full bg-slate-900
        font-semibold text-white
        ${sizes[size]}
      `}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  );
}
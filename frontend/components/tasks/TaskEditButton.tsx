
"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";

interface TaskEditButtonProps {
  taskId: number;
  onClick?: () => void;
}

export default function TaskEditButton({
  taskId,
  onClick,
}: TaskEditButtonProps) {
  return (
    <Link
      href={`/tasks/${taskId}/edit`}
      onClick={onClick}
      role="menuitem"
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-[#182124] transition hover:bg-[#F1F4F4] hover:text-[#064B52]"
    >
      <Pencil
        size={15}
        className="text-[#064B52]"
      />

      <span>Edit Task</span>
    </Link>
  );
}

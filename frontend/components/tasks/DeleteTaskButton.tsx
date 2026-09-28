"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Trash2,
} from "lucide-react";

import { deleteTask } from "@/services/taskService";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface DeleteTaskButtonProps {
  taskId: number;
  taskTitle: string;
  onDeleted?: (taskId: number) => void;
}

export default function DeleteTaskButton({
  taskId,
  taskTitle,
  onDeleted,
}: DeleteTaskButtonProps) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => {
    setError("");
    setOpen(true);
  };

  const handleClose = () => {
    if (deleting) return;

    setOpen(false);
    setError("");
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError("");

      await deleteTask(taskId);

      setOpen(false);

      onDeleted?.(taskId);
    } catch (err: any) {
      console.error(
        "Delete task error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to delete this task. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {/* Delete Menu Item */}

      <button
        type="button"
        role="menuitem"
        onClick={handleOpen}
        className="
          flex
          w-full
          items-center
          gap-3
          rounded-lg
          px-3
          py-2.5
          text-left
          text-xs
          font-medium
          text-red-600
          transition
          hover:bg-red-50
        "
      >
        <Trash2 size={15} />

        <span>Delete Task</span>
      </button>

      {/* Delete Modal */}

      <Modal
        open={open}
        onClose={handleClose}
        title="Delete task?"
        size="md"
      >
        <div>
          {/* Warning */}

          <div className="flex items-start gap-3">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-red-50
                text-red-600
              "
            >
              <AlertTriangle size={20} />
            </div>

            <div>
              <p
                className="
                  text-sm
                  leading-5
                  text-[#6E7B7D]
                  dark:text-[#AAB8BA]
                "
              >
                This action cannot be undone.
              </p>
            </div>
          </div>

          {/* Task Name */}

          <div
            className="
              mt-5
              rounded-xl
              border
              border-[#DDE3E3]
              bg-[#F7F8F7]
              px-4
              py-3
              dark:border-[#344649]
              dark:bg-[#243437]
            "
          >
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-wider
                text-[#8A9698]
                dark:text-[#8FA0A2]
              "
            >
              Task
            </p>

            <p
              className="
                mt-1
                break-words
                text-sm
                font-semibold
                text-[#182124]
                dark:text-[#F1F5F5]
              "
            >
              {taskTitle}
            </p>
          </div>

          {/* Error */}

          {error && (
            <div
              className="
                mt-4
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                text-red-700
                dark:border-red-900/50
                dark:bg-red-950/30
                dark:text-red-300
              "
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Actions */}

          <div
            className="
              mt-6
              flex
              flex-col-reverse
              gap-3
              sm:flex-row
              sm:justify-end
            "
          >
            <Button
              type="button"
              variant="secondary"
              size="md"
              disabled={deleting}
              onClick={handleClose}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="danger"
              size="md"
              loading={deleting}
              onClick={handleDelete}
            >
              {deleting
                ? "Deleting..."
                : "Delete Task"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
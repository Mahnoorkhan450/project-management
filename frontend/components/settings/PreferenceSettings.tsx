
"use client";

import {
  Settings2,
  Flag,
  CircleCheck,
} from "lucide-react";

import type {
  Settings,
  UpdateSettingsData,
  TaskPriority,
  TaskStatus,
} from "@/services/settingsService";

import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

import usePreferenceSettings from "@/hooks/usePreferenceSettings";

interface Props {
  settings: Settings;

  onSave: (
    data: UpdateSettingsData
  ) => Promise<{
    success: boolean;
    message: string;
  }>;

  saving: boolean;
}

export default function PreferenceSettings({
  settings,
  onSave,
  saving,
}: Props) {
  const {
    priority,
    setPriority,
    status,
    setStatus,
    handleSave,
  } = usePreferenceSettings({
    settings,
    onSave,
  });

  return (
    <Card
      className="
        border-[#DDE3E3]
        bg-white
        p-6
        shadow-none
        dark:border-[#293638]
        dark:bg-[#172326]
      "
    >
      {/* Header */}

      <div className="flex items-start gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-[#DCE9E9]
            dark:bg-[#315054]
          "
        >
          <Settings2
            size={19}
            className="
              text-[#064B52]
              dark:text-[#A5D2D4]
            "
          />
        </div>

        <div>
          <h2
            className="
              text-base
              font-semibold
              text-[#182124]
              dark:text-[#F1F5F5]
            "
          >
            Preferences
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-[#6E7B7D]
              dark:text-[#AAB8BA]
            "
          >
            Set the default behavior for new
            tasks.
          </p>
        </div>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSave}
        className="mt-7 space-y-6"
      >
        {/* Default Task Priority */}

        <div>
          <label
            htmlFor="defaultTaskPriority"
            className="
              mb-2
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-[#182124]
              dark:text-[#F1F5F5]
            "
          >
            <Flag
              size={16}
              className="
                text-[#064B52]
                dark:text-[#A5D2D4]
              "
            />

            Default Task Priority
          </label>

          <p
            className="
              mb-3
              text-xs
              text-[#6E7B7D]
              dark:text-[#AAB8BA]
            "
          >
            New tasks will use this priority by
            default.
          </p>

          <Select
            id="defaultTaskPriority"
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value as TaskPriority
              )
            }
            disabled={saving}
            options={[
              {
                label: "Low",
                value: "LOW",
              },
              {
                label: "Medium",
                value: "MEDIUM",
              },
              {
                label: "High",
                value: "HIGH",
              },
            ]}
            className="
              h-11
              border-[#DDE3E3]
              focus:border-[#064B52]
              focus:ring-[#064B52]/10
              dark:border-[#344649]
              dark:bg-[#172326]
              dark:text-[#F1F5F5]
            "
          />
        </div>

        {/* Default Task Status */}

        <div>
          <label
            htmlFor="defaultTaskStatus"
            className="
              mb-2
              flex
              items-center
              gap-2
              text-sm
              font-medium
              text-[#182124]
              dark:text-[#F1F5F5]
            "
          >
            <CircleCheck
              size={16}
              className="
                text-[#064B52]
                dark:text-[#A5D2D4]
              "
            />

            Default Task Status
          </label>

          <p
            className="
              mb-3
              text-xs
              text-[#6E7B7D]
              dark:text-[#AAB8BA]
            "
          >
            New tasks will start with this status.
          </p>

          <Select
            id="defaultTaskStatus"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as TaskStatus
              )
            }
            disabled={saving}
            options={[
              {
                label: "To Do",
                value: "TODO",
              },
              {
                label: "In Progress",
                value: "IN_PROGRESS",
              },
            ]}
            className="
              h-11
              border-[#DDE3E3]
              focus:border-[#064B52]
              focus:ring-[#064B52]/10
              dark:border-[#344649]
              dark:bg-[#172326]
              dark:text-[#F1F5F5]
            "
          />
        </div>

        {/* Save */}

        <div
          className="
            flex
            items-center
            justify-end
            border-t
            border-[#E8ECEC]
            pt-5
            dark:border-[#2B3A3D]
          "
        >
          <Button
            type="submit"
            loading={saving}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
}

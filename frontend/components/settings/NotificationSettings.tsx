
"use client";

import {
  Bell,
  Mail,
  FolderKanban,
  Users,
} from "lucide-react";

import type {
  Settings,
  UpdateSettingsData,
} from "@/services/settingsService";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import useNotificationSettings from "@/hooks/useNotificationSettings";

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

interface ToggleProps {
  checked: boolean;
  disabled: boolean;
  onChange: () => void;
}

function Toggle({
  checked,
  disabled,
  onChange,
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`
        relative
        h-6
        w-11
        shrink-0
        rounded-full
        transition

        ${
          checked
            ? "bg-[#064B52]"
            : "bg-[#C8D1D1]"
        }

        ${
          disabled
            ? "cursor-not-allowed opacity-60"
            : ""
        }
      `}
    >
      <span
        className={`
          absolute
          top-1
          h-4
          w-4
          rounded-full
          bg-white
          shadow-sm
          transition

          ${
            checked
              ? "left-6"
              : "left-1"
          }
        `}
      />
    </button>
  );
}

export default function NotificationSettings({
  settings,
  onSave,
  saving,
}: Props) {
  const {
    taskNotifications,
    projectUpdates,
    teamActivity,

    toggleTaskNotifications,
    toggleProjectUpdates,
    toggleTeamActivity,

    handleSave,
  } = useNotificationSettings({
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
          <Bell
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
            Notifications
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-[#6E7B7D]
              dark:text-[#AAB8BA]
            "
          >
            Choose which activities you want to
            receive notifications about.
          </p>
        </div>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSave}
        className="mt-7"
      >
        <div
          className="
            divide-y
            divide-[#E8ECEC]
            dark:divide-[#2B3A3D]
          "
        >
          {/* Task Notifications */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-6
              py-4
              first:pt-0
            "
          >
            <div className="flex min-w-0 items-start gap-3">
              <div
                className="
                  mt-0.5
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#F3F6F6]
                  dark:bg-[#243437]
                "
              >
                <Mail
                  size={17}
                  className="
                    text-[#064B52]
                    dark:text-[#A5D2D4]
                  "
                />
              </div>

              <div>
                <p
                  className="
                    text-sm
                    font-medium
                    text-[#182124]
                    dark:text-[#F1F5F5]
                  "
                >
                  Task Notifications
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-[#6E7B7D]
                    dark:text-[#AAB8BA]
                  "
                >
                  Get notified when tasks are
                  assigned or updated.
                </p>
              </div>
            </div>

            <Toggle
              checked={taskNotifications}
              disabled={saving}
              onChange={
                toggleTaskNotifications
              }
            />
          </div>

          {/* Project Updates */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-6
              py-4
            "
          >
            <div className="flex min-w-0 items-start gap-3">
              <div
                className="
                  mt-0.5
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#F3F6F6]
                  dark:bg-[#243437]
                "
              >
                <FolderKanban
                  size={17}
                  className="
                    text-[#064B52]
                    dark:text-[#A5D2D4]
                  "
                />
              </div>

              <div>
                <p
                  className="
                    text-sm
                    font-medium
                    text-[#182124]
                    dark:text-[#F1F5F5]
                  "
                >
                  Project Updates
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-[#6E7B7D]
                    dark:text-[#AAB8BA]
                  "
                >
                  Receive updates about changes
                  to your projects.
                </p>
              </div>
            </div>

            <Toggle
              checked={projectUpdates}
              disabled={saving}
              onChange={
                toggleProjectUpdates
              }
            />
          </div>

          {/* Team Activity */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-6
              py-4
              last:pb-0
            "
          >
            <div className="flex min-w-0 items-start gap-3">
              <div
                className="
                  mt-0.5
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#F3F6F6]
                  dark:bg-[#243437]
                "
              >
                <Users
                  size={17}
                  className="
                    text-[#064B52]
                    dark:text-[#A5D2D4]
                  "
                />
              </div>

              <div>
                <p
                  className="
                    text-sm
                    font-medium
                    text-[#182124]
                    dark:text-[#F1F5F5]
                  "
                >
                  Team Activity
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-[#6E7B7D]
                    dark:text-[#AAB8BA]
                  "
                >
                  Get notified about important
                  team activity.
                </p>
              </div>
            </div>

            <Toggle
              checked={teamActivity}
              disabled={saving}
              onChange={
                toggleTeamActivity
              }
            />
          </div>
        </div>

        {/* Save */}

        <div
          className="
            mt-5
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

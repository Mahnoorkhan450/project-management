
"use client";

import { SlidersHorizontal } from "lucide-react";

import type {
  Settings,
  UpdateSettingsData,
} from "@/services/settingsService";

import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

import useGeneralSettings from "@/hooks/useGeneralSettings";

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

export default function GeneralSettings({
  settings,
  onSave,
  saving,
}: Props) {
  const {
    language,
    setLanguage,
    timeZone,
    setTimeZone,
    dateFormat,
    setDateFormat,
    handleSave,
  } = useGeneralSettings({
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
          <SlidersHorizontal
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
            General
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-[#6E7B7D]
              dark:text-[#AAB8BA]
            "
          >
            Configure your language and regional
            preferences.
          </p>
        </div>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSave}
        className="mt-7 space-y-5"
      >
        {/* Language */}

        <Select
          id="language"
          label="Language"
          value={language}
          onChange={(e) =>
            setLanguage(e.target.value)
          }
          disabled={saving}
          options={[
            {
              label: "English",
              value: "English",
            },
            {
              label: "Urdu",
              value: "Urdu",
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

        {/* Time Zone */}

        <Select
          id="timezone"
          label="Time Zone"
          value={timeZone}
          onChange={(e) =>
            setTimeZone(e.target.value)
          }
          disabled={saving}
          options={[
            {
              label:
                "Pakistan Standard Time (GMT+5)",
              value: "Asia/Karachi",
            },
            {
              label:
                "Gulf Standard Time (GMT+4)",
              value: "Asia/Dubai",
            },
            {
              label: "London (GMT+0)",
              value: "Europe/London",
            },
            {
              label:
                "Eastern Time (GMT-5)",
              value: "America/New_York",
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

        {/* Date Format */}

        <Select
          id="dateFormat"
          label="Date Format"
          value={dateFormat}
          onChange={(e) =>
            setDateFormat(e.target.value)
          }
          disabled={saving}
          options={[
            {
              label: "DD/MM/YYYY",
              value: "DD/MM/YYYY",
            },
            {
              label: "MM/DD/YYYY",
              value: "MM/DD/YYYY",
            },
            {
              label: "YYYY-MM-DD",
              value: "YYYY-MM-DD",
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
            variant="primary"
            size="md"
            loading={saving}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
}

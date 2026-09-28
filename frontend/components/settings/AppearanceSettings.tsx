"use client";

import {
  Palette,
  Check,
  Sun,
  Moon,
} from "lucide-react";

import type {
  Settings,
  UpdateSettingsData,
} from "@/services/settingsService";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import useAppearanceSettings from "@/hooks/useAppearanceSettings";

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

export default function AppearanceSettings({
  settings,
  onSave,
  saving,
}: Props) {
  const {
    theme,
    handleThemeChange,
    handleSave,
  } = useAppearanceSettings({
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
        transition-colors
        dark:border-[#2B3A3D]
        dark:bg-[#172326]
      "
    >
      {/* HEADER */}

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
          <Palette
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
            Appearance
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-[#6E7B7D]
              dark:text-[#AAB8BA]
            "
          >
            Customize how Worknest looks and
            feels.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="mt-7 space-y-7"
      >
        {/* THEME */}

        <div>
          <div className="mb-3">
            <p
              className="
                text-sm
                font-medium
                text-[#182124]
                dark:text-[#F1F5F5]
              "
            >
              Theme
            </p>

            <p
              className="
                mt-1
                text-xs
                text-[#6E7B7D]
                dark:text-[#AAB8BA]
              "
            >
              Choose your preferred interface
              theme.
            </p>
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
            "
          >
            {/* LIGHT */}

            <button
              type="button"
              onClick={() =>
                handleThemeChange("light")
              }
              className={`
                flex
                items-center
                gap-3
                rounded-xl
                border
                p-4
                text-left
                transition-colors

                ${
                  theme === "light"
                    ? `
                      border-[#064B52]
                      bg-[#F3F7F7]
                      dark:border-[#6FAEB2]
                      dark:bg-[#203437]
                    `
                    : `
                      border-[#DDE3E3]
                      hover:border-[#AEBBBB]
                      hover:bg-[#FAFBFB]
                      dark:border-[#35484B]
                      dark:hover:border-[#526A6D]
                      dark:hover:bg-[#1D2C2F]
                    `
                }
              `}
            >
              <div
                className={`
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg

                  ${
                    theme === "light"
                      ? `
                        bg-[#DCE9E9]
                        dark:bg-[#315054]
                      `
                      : `
                        bg-[#F0F2F2]
                        dark:bg-[#263639]
                      `
                  }
                `}
              >
                <Sun
                  size={19}
                  className="
                    text-[#064B52]
                    dark:text-[#A5D2D4]
                  "
                />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-sm
                    font-medium
                    text-[#182124]
                    dark:text-[#F1F5F5]
                  "
                >
                  Light
                </p>

                <p
                  className="
                    mt-0.5
                    text-xs
                    text-[#6E7B7D]
                    dark:text-[#AAB8BA]
                  "
                >
                  Clean and bright
                </p>
              </div>

              <span
                className={`
                  flex
                  h-5
                  w-5
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border

                  ${
                    theme === "light"
                      ? `
                        border-[#064B52]
                        bg-[#064B52]
                      `
                      : `
                        border-[#C8D1D1]
                        dark:border-[#536669]
                      `
                  }
                `}
              >
                {theme === "light" && (
                  <Check
                    size={12}
                    className="text-white"
                  />
                )}
              </span>
            </button>

            {/* DARK */}

            <button
              type="button"
              onClick={() =>
                handleThemeChange("dark")
              }
              className={`
                flex
                items-center
                gap-3
                rounded-xl
                border
                p-4
                text-left
                transition-colors

                ${
                  theme === "dark"
                    ? `
                      border-[#6FAEB2]
                      bg-[#203437]
                    `
                    : `
                      border-[#DDE3E3]
                      hover:border-[#AEBBBB]
                      hover:bg-[#FAFBFB]
                      dark:border-[#35484B]
                      dark:hover:border-[#526A6D]
                      dark:hover:bg-[#1D2C2F]
                    `
                }
              `}
            >
              <div
                className={`
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg

                  ${
                    theme === "dark"
                      ? "bg-[#315054]"
                      : `
                        bg-[#F0F2F2]
                        dark:bg-[#263639]
                      `
                  }
                `}
              >
                <Moon
                  size={19}
                  className="
                    text-[#064B52]
                    dark:text-[#A5D2D4]
                  "
                />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="
                    text-sm
                    font-medium
                    text-[#182124]
                    dark:text-[#F1F5F5]
                  "
                >
                  Dark
                </p>

                <p
                  className="
                    mt-0.5
                    text-xs
                    text-[#6E7B7D]
                    dark:text-[#AAB8BA]
                  "
                >
                  Easy on the eyes
                </p>
              </div>

              <span
                className={`
                  flex
                  h-5
                  w-5
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border

                  ${
                    theme === "dark"
                      ? `
                        border-[#6FAEB2]
                        bg-[#064B52]
                      `
                      : `
                        border-[#C8D1D1]
                        dark:border-[#536669]
                      `
                  }
                `}
              >
                {theme === "dark" && (
                  <Check
                    size={12}
                    className="text-white"
                  />
                )}
              </span>
            </button>
          </div>
        </div>

        {/* SAVE */}

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
            variant="primary"
            size="md"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
}
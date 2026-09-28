
"use client";

import { useState } from "react";

import {
  SlidersHorizontal,
  Bell,
  Palette,
  Settings2,
  ChevronRight,
} from "lucide-react";

import GeneralSettings from "@/components/settings/GeneralSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import PreferenceSettings from "@/components/settings/PreferenceSettings";

import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";
import ErrorState from "@/components/ui/ErrorState";
import Toast from "@/components/ui/Toast";

import useSettings from "@/hooks/useSettings";

type SettingsSection =
  | "general"
  | "notifications"
  | "appearance"
  | "preferences";

export default function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("general");

  const {
    settings,
    loading,
    saving,
    error,
    toast,
    loadSettings,
    saveSettings,
    clearToast,
  } = useSettings();

  const menuItems = [
    {
      id: "general" as SettingsSection,
      label: "General",
      description:
        "Language and regional settings",
      icon: SlidersHorizontal,
    },
    {
      id: "notifications" as SettingsSection,
      label: "Notifications",
      description:
        "Manage your notifications",
      icon: Bell,
    },
    {
      id: "appearance" as SettingsSection,
      label: "Appearance",
      description:
        "Customize your workspace",
      icon: Palette,
    },
    {
      id: "preferences" as SettingsSection,
      label: "Preferences",
      description:
        "Manage default behavior",
      icon: Settings2,
    },
  ];

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={clearToast}
        />
      )}

      <div className="w-full">
        {/* Page Header */}
        <div>
          <h1
            className="
              text-2xl
              font-semibold
              text-[#182124]
              dark:text-[#F1F5F5]
            "
          >
            Settings
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-[#6E7B7D]
              dark:text-[#AAB8BA]
            "
          >
            Manage your application preferences
            and workspace experience.
          </p>
        </div>

        {/* Settings Layout */}
        <div
          className="
            mt-6
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-[280px_minmax(0,1fr)]
          "
        >
          {/* Settings Sidebar */}
          <Card
            className="
              h-fit
              border-[#DDE3E3]
              bg-white
              p-4
              shadow-none
              dark:border-[#293638]
              dark:bg-[#172326]
            "
          >
            <nav aria-label="Settings navigation">
              {menuItems.map(
                (item, index) => {
                  const Icon = item.icon;

                  const isActive =
                    activeSection ===
                    item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setActiveSection(
                          item.id
                        )
                      }
                      aria-current={
                        isActive
                          ? "page"
                          : undefined
                      }
                      className={`
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-3
                        text-left
                        transition

                        ${
                          index !== 0
                            ? "mt-1"
                            : ""
                        }

                        ${
                          isActive
                            ? `
                              bg-[#DCE9E9]
                              text-[#064B52]
                              dark:bg-[#244245]
                              dark:text-[#B1D6D8]
                            `
                            : `
                              text-[#536063]
                              hover:bg-[#F5F7F7]
                              dark:text-[#AAB8BA]
                              dark:hover:bg-[#243437]
                            `
                        }
                      `}
                    >
                      <Icon
                        size={18}
                        className="shrink-0"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">
                          {item.label}
                        </p>

                        <p className="mt-0.5 text-xs opacity-70">
                          {item.description}
                        </p>
                      </div>

                      <ChevronRight
                        size={16}
                        className="shrink-0"
                      />
                    </button>
                  );
                }
              )}
            </nav>
          </Card>

          {/* Settings Content */}
          <section className="min-w-0">
            {/* Loading */}
            {loading && (
              <Card
                className="
                  min-h-[400px]
                  border-[#DDE3E3]
                  bg-white
                  p-6
                  shadow-none
                  dark:border-[#293638]
                  dark:bg-[#172326]
                "
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-40" />

                    <Skeleton className="h-4 w-72" />
                  </div>

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-5
                      md:grid-cols-2
                    "
                  >
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>

                  <Skeleton className="h-11 w-32" />
                </div>
              </Card>
            )}

            {/* Error */}
            {!loading && error && (
              <ErrorState
                title="Unable to load settings"
                message={error}
                onRetry={loadSettings}
              />
            )}

            {/* Content */}
            {!loading &&
              !error &&
              settings && (
                <>
                  {activeSection ===
                    "general" && (
                    <GeneralSettings
                      settings={settings}
                      onSave={saveSettings}
                      saving={saving}
                    />
                  )}

                  {activeSection ===
                    "notifications" && (
                    <NotificationSettings
                      settings={settings}
                      onSave={saveSettings}
                      saving={saving}
                    />
                  )}

                  {activeSection ===
                    "appearance" && (
                    <AppearanceSettings
                      settings={settings}
                      onSave={saveSettings}
                      saving={saving}
                    />
                  )}

                  {activeSection ===
                    "preferences" && (
                    <PreferenceSettings
                      settings={settings}
                      onSave={saveSettings}
                      saving={saving}
                    />
                  )}
                </>
              )}
          </section>
        </div>
      </div>
    </>
  );
}
